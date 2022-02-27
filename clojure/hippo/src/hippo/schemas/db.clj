(ns hippo.schemas.db)

(def Task
  [:map 
   [:task/id uuid?]
   [:task/url string?]
   [:task/time number?]])
