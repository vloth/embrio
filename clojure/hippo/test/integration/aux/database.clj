(ns integration.aux.database
  (:require [infra.component.database :as db]
            [state-flow.api :as state-flow.api]
            [state-flow.core :as state-flow :refer [flow]]))

(defn transact!
  [datoms]
  (flow "add datoms to the database"
    [database (state-flow.api/get-state :database)]
    (-> database
        (db/transact datoms)
        state-flow.api/return)))

(defn q
  [query args]
  (flow "queries datoms from the database"
    [database (state-flow.api/get-state :database)]
    (-> database
        (db/q query args)
        state-flow.api/return)))

