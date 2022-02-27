(ns hippo.util.time)

(defn instant-now 
  {:malli/schema [:=> [:cat nil] inst?]}
  []
  (java.util.Date/from (java.time.Instant/now)))

(defn now-ms 
  {:malli/schema [:=> [:cat nil] number?]}
  []
  (inst-ms (instant-now)))
