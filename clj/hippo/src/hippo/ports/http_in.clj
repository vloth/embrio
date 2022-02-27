(ns hippo.ports.http-in
  (:require [clojure.string :as s]
            [hippo.adapters :as adapters]
            [hippo.controllers :as controllers]))

(defn make-task
  [{{{:keys [url] :as timer-spec} :body} :parameters 
    components :components}]
  (if (not (s/blank? url))
    {:status 200
     :body (-> (controllers/create-task! timer-spec components)
               (adapters/task->wire-out))}
    {:status 400
     :body "url cannot be blank"}))

(defn get-task-status
  [{{{:keys [id]} :path} :parameters
    components :components}]
  (if-let [elapsed-time (controllers/get-task-time-left id components)]
    {:status 200 :body (adapters/query-task->wire-out id elapsed-time)}
    {:status 404 :body "task not found"}))
