import React from 'react'
import { useStyletron } from 'baseui'

export function Center({ children }: { children: JSX.Element }) {
  const [css] = useStyletron()

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      {children}
    </div>
  )
}
