(ns integration.system
  (:require [com.stuartsierra.component :as component]
            [hippo.db.model :as db.model]
            [hippo.routes :as routes]
            [infra.component.config :as config]
            [infra.component.database :as database]
            [infra.component.http :as http]
            [infra.component.router :as router]
            [infra.component.scheduler :as scheduler]
            [infra.component.webserver :as webserver]
            [infra.logs :as logs]))

(defn- build-system-map [routes]
  (component/system-map :config    (config/new-config {:database/backend :mem :databse/id "test-default"})
                        :router    (router/new-router routes)
                        :http      (http/new-http-mock {})
                        :scheduler (scheduler/new-scheduler-mock)
                        :database  (component/using (database/new-database db.model/model)
                                                    [:config])
                        :webserver (component/using (webserver/new-webserver)
                                                    [:config :database :router :scheduler :http])))

(defn start-system!
  ([routes]
   (logs/setup [["*" :debug]] :auto)
   (->> (build-system-map routes)
        component/start))
  ([] (start-system! routes/routes)))

(defn stop-system!
  [system]
  (component/stop-system system))
