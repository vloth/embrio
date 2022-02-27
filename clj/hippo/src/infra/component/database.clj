(ns infra.component.database
  (:require [com.stuartsierra.component :as component]
            [datahike-leveldb.core]
            [datahike.api :as d]))

(defprotocol DatabaseProvider
  (transact [self datoms]
    "Executes a tarnsaction in the database")
  (q [self query] [self query args]
    "Queries transactions from the database"))

(defrecord Database [conn schema config]
  component/Lifecycle
    (start [this]
      (let [{:database/keys [id backend path]} (:config config)
            db-config {:id id :backend backend :path path}]
        (if conn
          this
          (do (when (not (d/database-exists? db-config))
                (d/create-database db-config :initial-tx schema))
              (assoc this :conn (d/connect db-config))))))

    (stop [this]
      (if conn
        (do (d/release (:conn this))
            (assoc this :conn nil)) this))

  DatabaseProvider
    (transact [this datoms] (d/transact (:conn this) datoms))
    (q [this query args]
      (apply d/q (concat [query (deref (:conn this))] args)))
    (q [this query]
      (d/q query (deref (:conn this)))))

(defn new-database [schema]
   (map->Database {:schema schema}))
