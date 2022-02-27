(ns unit.hippo.logics-test
  (:require [clojure.test :refer [deftest are is testing use-fixtures]]
            ; [malli.core :as m] are 
            [test-utils :as u]
            [hippo.logics :as logics]))

(use-fixtures :once u/with-malli-intrumentation)

(defn timer []
  {:hours 0
   :minutes 0
   :seconds 0
   :url ""})

(deftest deterministic-uuid-generation
  (testing "should generate the same uuid based on the seeded string"
    (is (= #uuid "f2924f1e-908d-32fb-a68e-73a4783c6e82"
           (logics/uuid-from-string "<same>"))))

  (testing "should generate the same uuid based on time and url"
    (is (= #uuid "4c3696e0-1d55-3e14-a2fb-a9e3c12567eb"
           (logics/uuid-from-time-url 12345 "another-seed")))))

(deftest time-fortune-teller
  (testing "checks time add logic"
    (are [x y] (= x (logics/add-time 946684800 (merge (timer) y)))
      946684800 nil
      946685800 {:seconds 1}
      946744800 {:minutes 1}
      950284800 {:hours 1}
      950345800 {:hours 1 :minutes 1 :seconds 1})))

(deftest time-left-calculator
  (testing "checks time left calculation logic"
    (are [x y] (= x #_{:clj-kondo/ignore [:type-mismatch]}
                   (logics/get-time-left {:task/time y} 946684800))
      0 946683800
      0 946684800
      1 946685800
      1 946685899)))
