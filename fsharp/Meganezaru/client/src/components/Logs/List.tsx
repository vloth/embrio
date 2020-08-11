import * as React from 'react'
import { useStyletron } from 'baseui'
import { Notification, KIND } from 'baseui/notification'
/* import { StyledSpinnerNext } from 'baseui/spinner' */
import { useLogsHub } from '../../hook/useLogsHub'
import { Log } from './Log'
import { Detail } from './Detail'
import { Log as LogType } from './support/type'

export function LogsList() {
  const [error, logs] = useLogsHub()
  const [focusedLog, focus] = React.useState<LogType | null>(null)

  if (error)
    return (
      <Notification kind={KIND.negative}>
        {() => 'This is a notification.'}
      </Notification>
    )

  console.log(logs)

  /* if (!connection) return <StyledSpinnerNext /> */

  return (
    <React.Fragment>
      <Ul>
        {logs.map((log) => (
          <Log
            key={log}
            type="INFO"
            onClick={() => focus({ type: 'INFO', log })}
          >
            {log}
          </Log>
        ))}
      </Ul>
      <Detail log={focusedLog} />
    </React.Fragment>
  )
}

function Ul({ children }: { children: Array<JSX.Element> }) {
  const [css] = useStyletron()

  return (
    <ul
      className={css({
        paddingLeft: '0'
      })}
    >
      {children}
    </ul>
  )
}
