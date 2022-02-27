(ns hippo.db.model)

(def model
  [{:db/cardinality :db.cardinality/one
    :db/ident       :task/id
    :db/unique      :db.unique/identity
    :db/valueType   :db.type/uuid}

   {:db/cardinality :db.cardinality/one
    :db/ident       :task/time 
    :db/valueType   :db.type/bigint}

   {:db/cardinality :db.cardinality/one
    :db/ident       :task/url
    :db/valueType   :db.type/string}])
