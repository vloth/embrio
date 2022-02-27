(ns hippo.routes
  (:require [hippo.ports.http-in :as http-in]
            [hippo.schemas.wire-in :as wire-in]
            [hippo.schemas.wire-out :as wire-out]
            [reitit.swagger :as swagger]))

(def routes
  [["/swagger.json"
    {:get {:no-doc  true
           :swagger {:info {:title       "Timers api"
                            :description "⏰ schedules http call for later."}}
           :handler (swagger/create-swagger-handler)}}]

   ["/timers"
    {:swagger {:tags ["timers"]}}

    [""
     {:post {:summary    "Creates a timed task, after the provided timer the application will fire a POST to the url."
             :parameters {:body wire-in/TimerSpec}
             :responses  {200 {:body wire-out/Task} 
                          400 {:body :string}
                          500 {:body :string}}
             :handler    http-in/make-task}}]

    ["/:id"
     {:get {:summary    "Gets the elapsed time of a task"
            :parameters {:path wire-in/TimerQuery}
            :responses  {200 {:body wire-out/QueryTask}
                         400 {:body :string}}
            :handler    http-in/get-task-status}}]]])
