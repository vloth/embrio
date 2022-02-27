(ns user
  (:require [clojure.tools.namespace.repl :refer (refresh-all)]
            [hippo.server :as server]
            [malli.dev :as dev]
            [malli.dev.pretty :as pretty]))

(defn start []
  (dev/start! {:report (pretty/thrower)})
  (server/start-system!))

(defn stop []
  (dev/stop!)
  (server/stop-system!))

(defn reset []
  (stop)
  (refresh-all :after 'user/start))

(comment
  (reset))
