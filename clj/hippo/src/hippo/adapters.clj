(ns hippo.adapters
  (:require [hippo.schemas.db :as schemas.db]
            [hippo.schemas.wire-out :as schemas.wire-out]))

(defn task->db 
  {:malli/schema [:=> [:cat uuid? number? string?] schemas.db/Task]}
  [id date-time url]
  #:task{:id id :time date-time :url url})

(defn task->wire-out
  {:malli/schema [:=> [:cat schemas.db/Task] schemas.wire-out/Task]}
  [{:task/keys [id]}]
  {:id id})

(defn query-task->wire-out
  {:malli/schema [:=> [:cat uuid? number?] schemas.wire-out/QueryTask]}
  [task-id time-left]
  {:id task-id
   :time_left time-left})
