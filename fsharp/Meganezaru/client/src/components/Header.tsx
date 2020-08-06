import * as React from 'react'
import { Search } from 'baseui/icon'
import { useStyletron } from 'baseui'
import { Input } from 'baseui/input'

export function Header() {
  return (
    <Input overrides={{ Before }} placeholder="Type here to start searching" />
  )
}

function Before() {
  const [css, theme] = useStyletron()
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.sizing.scale500
      })}
    >
      <Search size="1.5rem" />
    </div>
  )
}
