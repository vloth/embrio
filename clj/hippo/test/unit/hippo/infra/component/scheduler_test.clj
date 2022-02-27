(ns unit.hippo.infra.component.scheduler-test
  (:require [clojure.test :refer [deftest is testing use-fixtures]]
            [com.stuartsierra.component :as component]
            [matcher-combinators.test :refer [match?]]
            [infra.component.scheduler :as scheduler]
            [test-utils :as u]))

(use-fixtures :once u/with-malli-intrumentation)

(defn- create-and-start-system! [scheduler]
  (component/start-system
   (component/system-map :scheduler scheduler)))

(deftest http-mock-component-test
  (testing "HttpMock should return mocked reponses and log requests in the atom"
    (let [system (create-and-start-system! (scheduler/new-scheduler-mock))
          _ (scheduler/schedule (:scheduler system) 1 (constantly 1))
          _ (scheduler/schedule (:scheduler system) 20 (constantly "20"))]
     (is (match? [1 "20"] 
                 (map :result (deref (get-in system [:scheduler :executions]))))))))
