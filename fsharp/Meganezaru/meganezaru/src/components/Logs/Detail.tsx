import * as React from 'react'
import { Drawer, SIZE } from 'baseui/drawer'
import { Log as LogType } from './support/type'

type DetailProps = { log: null | LogType }

export function Detail({ log }: DetailProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => setIsOpen(log != null), [log])

  return (
    <Drawer
      isOpen={isOpen}
      autoFocus
      onClose={() => setIsOpen(false)}
      size={SIZE.auto}
    >
      <pre>
        <code>{log?.log}</code>
      </pre>
    </Drawer>
  )
}
