(ns hippo.schemas.wire-in
  (:require [hippo.schemas.types :as types]))

(def TimerSpec
  [:map 
   [:hours types/NonNegative]
   [:minutes types/NonNegative]
   [:seconds types/NonNegative]
   [:url string?]])

(def TimerQuery
  [:map 
   [:id uuid?]])
