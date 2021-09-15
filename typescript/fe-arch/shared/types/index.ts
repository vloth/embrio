/* eslint-disable @typescript-eslint/no-namespace */
import { FunctionComponent } from 'react'

export namespace FederatedModules {
  export namespace Candidate {
    export type UserInfo = FunctionComponent<{ onSave?: () => void }>
  }
}

export namespace Domain {
  export type User = {
    picture: string
    name: string
    vacancy: string
    location: string
    phone: string
  }
}
