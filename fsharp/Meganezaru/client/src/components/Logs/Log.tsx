import * as React from 'react'
import { ChevronRight } from 'baseui/icon'
import { ListItem, ListItemLabel } from 'baseui/list'
import { LogType } from './support/type'
import { toTag } from './support/log-to-tag'
import { Tag } from 'baseui/tag'

type LogProps = {
  type?: LogType
  children: React.ReactText
  onClick?: React.MouseEventHandler
}

export function Log({ type, children, onClick }: LogProps) {
  return (
    <div onClick={onClick}>
      <ListItem
        endEnhancer={() => <ChevronRight />}
        overrides={{ Content: { style: () => ({ cursor: 'pointer' }) } }}
      >
        <ListItemLabel>
          <Tag kind={toTag(type)} closeable={false}>
            {type || '???'}
          </Tag>
          {children}
        </ListItemLabel>
      </ListItem>
    </div>
  )
}
