import * as React from 'react'
import { Log } from './Log'
import { Detail } from './Detail'
import { Log as LogType } from './support/type'

export function LogsList() {
  const [focusedLog, focus] = React.useState<LogType | null>(null)

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
