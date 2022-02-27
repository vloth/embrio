(ns hippo.db.tasks
  (:require [hippo.schemas.db :as schemas.db]
            [hippo.schemas.types :as schemas.types]
            [infra.component.database :as db]))

(defn get-task
  {:malli/schema [:=> [:cat schemas.types/DatabaseComponent uuid?] [:maybe schemas.db/Task]]}
  [database task-id]
  (db/q database
        '[:find (pull ?e [*]) .
          :where [?e :task/id ?id]
          :in $ ?id]
         [task-id]))

(defn get-pending-tasks
  {:malli/schema [:=> [:cat schemas.types/DatabaseComponent number?] [:vector schemas.db/Task]]}
  [database now]
  (db/q database
        '[:find [(pull ?e [*]) ...]
          :where [?e :task/time ?time]
                 [(>= ?time ?now)]
          :in $ ?now] [now]))

(defn insert-task
  {:malli/schema [:=> [:cat schemas.types/DatabaseComponent schemas.db/Task] :any]}
  [database task]
  (db/transact database [task]))
