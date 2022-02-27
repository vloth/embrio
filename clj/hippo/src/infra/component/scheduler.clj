(ns infra.component.scheduler
  (:require [com.stuartsierra.component :as component]
            [overtone.at-at :as atat]))

(defprotocol ScheduleProvider
  (schedule [self tempo action]
    "Low-level API to schedule an action"))

(defrecord Scheduler [pool]
  component/Lifecycle
    (start [this]
      (if pool this
        (assoc this :pool (atat/mk-pool))))

    (stop [this] 
      (if pool 
        (do (atat/stop-and-reset-pool! pool :strategy :kill)
            (assoc this :pool nil))
        this))

  ScheduleProvider
    (schedule [this tempo action] (atat/at tempo action (:pool this))))


(defrecord SchedulerMock [executions]
  component/Lifecycle
    (start [this] this)
    (stop [this] this)

  ScheduleProvider
    (schedule [_this tempo action] 
      (swap! executions conj {:time tempo :result (action)})))

(defn new-scheduler []
   (map->Scheduler {}))

(defn new-scheduler-mock []
   (map->SchedulerMock {:executions (atom [])}))
