(ns hippo.ports.http-out
  (:require [hippo.schemas.types :as schemas.types]
            [infra.component.http :as component.http]
            [infra.logs :as logs]))

(defn touch
  "Makes a http POST call to any given URL. This function will never throw an
  exception. When url is not valid or an error code is returned from the remote
  url this function will just log/info and return nothing. Otherwise when successfull,
  it returns the http status code."
  {:malli/schema [:=> [:cat schemas.types/HttpComponent string?] any?]}
  [http url]
  (try (->> {:url url :method :post}
            (component.http/request http)
            :status)
       (catch Exception e
         (logs/log :info :http-out-ex (.getMessage e) :url url))))
