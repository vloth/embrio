(ns integration.timer-system
  (:require [integration.aux.http :as aux.http]
            [integration.aux.webserver :as aux.webserver]
            [integration.system :as sys]
            [state-flow.api :refer [defflow flow]]
            [state-flow.assertions.matcher-combinators :refer [match?]]))

(defn scheduled-executions []
  (flow "returns scheduled execution"
    [scheduler (state-flow.api/get-state :scheduler)]
    (-> scheduler
        :executions
        deref
        state-flow.api/return)))

(defn create-task-flow [timer-spec]
  (flow "should create a timer"
    [res (aux.webserver/request! {:method :post :uri "/timers" :body timer-spec})
     :let [id  (-> res :body :id)]]
      (match? {:status 200 :body {:id string?}} res)
      (match? [{:result 200}] (scheduled-executions))
      (state-flow.api/return id)))

(defflow timer-api-flow
  {:init  sys/start-system!
   :cleanup sys/stop-system!
   :fail-fast? true}
  (flow "prepare outgoing calls"
    (aux.http/set-http-out-responses! {"http://a.com" {:status 200}})
    [:let [timer-spec {:url "http://a.com" :hours 0 :minutes 0 :seconds 1}]]

    (flow "should return pending task"
      [id (create-task-flow timer-spec)]
      (match? {:status 200 :body {:id string? :time_left #(and (<= % 20) (>= % 0))}}
              (aux.webserver/request! {:method :get
                                       :uri    (str  "/timers/" id)})))))
