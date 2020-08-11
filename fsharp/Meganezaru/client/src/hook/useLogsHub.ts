import * as React from 'react'
import { HubContext } from './useHub'

export function useLogsHub(): [Error | null, Array<any>] {
  const [error, setError] = React.useState<Error | null>(null)
  const [logs, setLogs] = React.useState([])
  const hub = HubContext.useConnection()

  function logHandler(event: any) {
    console.log(event)
    setLogs(logs.concat(event))
  }

  function dispose() {
    hub.connection?.off(logHandler.name)
  }

  React.useEffect(() => {
    if (hub.error) {
      setError(hub.error)
      return dispose
    }

    hub.connection?.on('EventBroadcast', logHandler)
    return dispose
  })

  // state connecting ?
  return [error, logs]
}
