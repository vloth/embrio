(ns hippo.schemas.wire-out)

(def Task
  [:map 
   [:id uuid?]])

(def QueryTask
  [:map 
   [:id uuid?]
   [:time_left number?]])
