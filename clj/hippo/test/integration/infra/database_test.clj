(ns integration.infra.database-test
  (:require [clojure.test :as clojure.test]
            [integration.aux.database :as aux.db]
            [integration.system :as sys]
            [state-flow.api :refer [defflow]]
            [state-flow.assertions.matcher-combinators :refer [match?]]
            [state-flow.core :as state-flow :refer [flow]]
            [test-utils :as u]))

(clojure.test/use-fixtures :once u/with-malli-intrumentation)

(defflow
  flow-integration-database-test
  {:init (partial sys/start-system!)
   :cleanup sys/stop-system!
   :fail-fast? true}
  (flow "adds a task and queries it back"
    [id #uuid "6dc14c16-9e46-4949-b5a9-fef98e5b20e5"
     task #:task{:id id :time 0 :url "http://url.com"}]
    (aux.db/transact! [task])
    (match? task
            (aux.db/q '[:find (pull ?e [*]) .
                 :where [?e :task/id ?id]
                 :in $ ?id]
               [id]))))
