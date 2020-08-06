import * as React from 'react'
import { HubContext } from '../../hook/useHub'
import { Log } from './Log'
import { Detail } from './Detail'
import { Log as LogType } from './support/type'

export function LogsList() {
  const { connection, error } = HubContext.useConnection()
  const [focusedLog, focus] = React.useState<LogType | null>(null)

  React.useEffect(() => {
    connection?.on('ReceiveEvent', console.log)
  })

  return (
    <React.Fragment>
      <ul>
        <Log type="INFO" onClick={() => focus({ type: 'INFO', log: 'bar' })}>
          aksdjs
        </Log>
        <Log type="FATAL">aksdjs</Log>
        <Log type="TRACE">aksdjs</Log>
        <Log>aksdjs</Log>
      </ul>
      <Detail log={focusedLog} />
    </React.Fragment>
  )
}
