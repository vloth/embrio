(ns unit.hippo.infra.component.http-test
  (:require [clojure.test :refer [deftest is testing use-fixtures]]
            [com.stuartsierra.component :as component]
            [matcher-combinators.test :refer [match?]]
            [infra.component.http :as component.http]
            [test-utils :as u]))

(use-fixtures :once u/with-malli-intrumentation)

(defn- create-and-start-system!
  [{:keys [http]}]
  (component/start-system
   (component/system-map :http http)))

(deftest http-mock-component-test
  (testing "HttpMock should return mocked reponses and log requests in the atom"
    (let [system (create-and-start-system!
                  {:http (component.http/new-http-mock
                          {"https://duckduckgo.com" {:status 200}})})]

      (is (match? {:status 200}
                  (component.http/request (:http system) {:url "https://duckduckgo.com"})))

      (is (match? {:status 500}
                  (component.http/request (:http system) {:url "https://google.com"})))

      (is (match? ["https://duckduckgo.com"
                   "https://google.com"]
                  (map :url (deref (get-in system [:http :requests]))))))))
