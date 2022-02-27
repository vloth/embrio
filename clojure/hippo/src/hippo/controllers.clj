(ns hippo.controllers
  (:require [hippo.adapters :as adapters]
            [hippo.db.tasks :as db.tasks]
            [hippo.logics :as logics]
            [hippo.ports.http-out :as http-out]
            [hippo.schemas.db :as schemas.db]
            [hippo.schemas.types :as schemas.types]
            [hippo.schemas.wire-in :as schemas.wire-in]
            [hippo.util.time :as util.time]
            [infra.component.scheduler :refer [schedule]]
            [infra.logs :as logs]))

(defn- schedule-task!
  {:malli/schema [:=> [:cat schemas.types/Components schemas.db/Task] :nil]}
  [{:keys [http scheduler]}
   {:task/keys [id time url]}]
  (schedule scheduler time #(http-out/touch http url))
  (logs/log :info :scheduled-task id :url url :time time))

(defn get-task-time-left
  {:malli/schema [:=> [:cat uuid? schemas.types/Components] [:maybe number?]]}
  [id {:keys [database]}]
  (some-> 
    (db.tasks/get-task database id)
    (logics/get-time-left (util.time/now-ms))))

(defn create-task!
  {:malli/schema [:=> [:cat schemas.wire-in/TimerSpec schemas.types/Components] schemas.db/Task]}
  [{:keys [url] :as timer-spec}
   {:keys [database] :as component}]
  (let [time (logics/add-time (util.time/now-ms) timer-spec)
        id   (logics/uuid-from-time-url time url)
        task (adapters/task->db id time url)]
    (or (db.tasks/get-task database id)
        (do (db.tasks/insert-task database task)
            (schedule-task! component task)
            task))))

(defn schedule-pending-tasks!
  {:malli/schema [:=> [:cat schemas.types/Components] :nil]}
  [{:keys [database] :as component}]
  (->> (db.tasks/get-pending-tasks database (util.time/now-ms))
       (map (fn [task] (schedule-task! component task)))
       dorun))

