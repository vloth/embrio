(ns hippo.server
  (:require [com.stuartsierra.component :as component]
            [hippo.controllers :as controllers]
            [hippo.db.model :as db.model]
            [hippo.routes :as routes]
            [infra.component.config :as config]
            [infra.component.database :as database]
            [infra.component.http :as http]
            [infra.component.router :as router]
            [infra.component.scheduler :as scheduler]
            [infra.component.webserver :as webserver]
            [infra.logs :as logs])
  (:gen-class))

(def system-atom (atom nil))

(defn- build-system-map []
  (component/system-map :config    (config/new-config)
                        :router    (router/new-router routes/routes)
                        :http      (http/new-http)
                        :scheduler (scheduler/new-scheduler)
                        :database  (component/using (database/new-database db.model/model)
                                                    [:config])
                        :webserver (component/using (webserver/new-webserver)
                                                    [:config :router :scheduler :database :http])))

(defn start-system! []
  (logs/setup [["*" :info]] :auto)
  (->> (build-system-map)
       component/start
       (reset! system-atom))
  (controllers/schedule-pending-tasks! @system-atom)
  @system-atom)

#_{:clj-kondo/ignore [:clojure-lsp/unused-public-var]}
(defn stop-system! []
  (swap!
   system-atom
   (fn [s] (when s (component/stop s)))))

(defn -main
  "The entry-point for 'gen-class'"
  [& _args]
  (start-system!))
