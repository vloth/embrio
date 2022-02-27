(ns hippo.logics
  (:require [hippo.schemas.db :as schemas.db]
            [hippo.schemas.wire-in :as schemas.wire-in])
  (:import [java.util UUID]))

(defn uuid-from-string
  {:malli/schema [:=> [:cat string?] uuid?]}
  [seed]
  (-> seed
      .getBytes
      UUID/nameUUIDFromBytes))

(defn uuid-from-time-url
  {:malli/schema [:=> [:cat number? string?] uuid?]}
  [time url]
  (-> (str url time)
      uuid-from-string))

(defn add-time
  {:malli/schema [:=> [:cat number? schemas.wire-in/TimerSpec] number?]}
  [now {:keys [hours minutes seconds]}]
  (+ now (* hours 3600000) (* minutes 60000) (* seconds 1000)))

(defn get-time-left
  "Returns the remaining idle time of a task in seconds. Returns zero if
  task is already due."
  {:malli/schema [:=> [:cat schemas.db/Task number?] number?]}
  [{:task/keys [time]} now]
  (-> (- time now)
      (/ 1000)
      Math/floor
      int
      (max 0)))
