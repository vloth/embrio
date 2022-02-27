(ns hippo.schemas.types
  (:require [com.stuartsierra.component :as component]
            [infra.component.database :as component.database]
            [infra.component.http :as component.http]
            [infra.component.scheduler :as component.scheduler]
            [malli.core :as m]
            [malli.generator :as mg]
            [malli.transform :as mt]))

(def NonNegative
  (m/-simple-schema
    {:type :types/non-neg
     :pred #(not (neg? %))
     :type-properties {:error/message "should not be negative"
                       :decode/string mt/-string->long
                       :json-schema/type "integer"
                       :json-schema/format "int64"
                       :json-schema/minimum 0
                       :gen/gen (mg/generate [:double {:gen/infinite? true
                                                       :gen/NaN? false}]
                                              {:seed 0})}}))
(def GenericComponent
  (m/-simple-schema
   {:type :types/generic-component
    :pred #(satisfies? component/Lifecycle %)
    :type-properties {:error/message "should satisfy com.stuartsierra.component/Lifecycle protocol."}}))

(def SchedulerComponent
  (m/-simple-schema
   {:type :types/scheduler-component
    :pred #(satisfies? component.scheduler/ScheduleProvider %)
    :type-properties {:error/message "should satisfy SchedulerProvider protocol."}}))

(def DatabaseComponent
  (m/-simple-schema
   {:type :types/database-component
    :pred #(satisfies? component.database/DatabaseProvider %)
    :type-properties {:error/message "should satisfy DatabaseProvider protocol."}}))

(def HttpComponent
  (m/-simple-schema
   {:type :http-component
    :pred #(satisfies? component.http/HttpProvider %)
    :type-properties {:error/message "should satisfy HttpProvider protocol."}}))

(def Components
  [:map
   [:config GenericComponent]
   [:router GenericComponent]
   [:http HttpComponent]
   [:database DatabaseComponent]
   [:scheduler SchedulerComponent]])
