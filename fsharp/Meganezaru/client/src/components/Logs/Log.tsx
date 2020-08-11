import * as React from 'react'
import { useStyletron } from 'baseui'
import { ChevronRight } from 'baseui/icon'
import { ListItem } from 'baseui/list'
import { LogType } from './support/type'
import { toTag } from './support/log-to-tag'
import { Tag } from 'baseui/tag'
import { Paragraph4 } from 'baseui/typography'

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
        <Label>
          <Tag kind={toTag(type)} closeable={false}>
            {type || '???'}
          </Tag>
          <Paragraph4 display="inline">{children}</Paragraph4>
        </Label>
      </ListItem>
    </div>
  )
}

function Label({ children }: { children: Array<JSX.Element> }) {
  const [css] = useStyletron()

  return (
    <div
      className={css({
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'inline-block',
        width: 'calc(100vw - 10rem);'
      })}
    >
      {children}
    </div>
  )
}
