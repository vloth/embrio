import * as React from 'react'
import { ChevronRight } from 'baseui/icon'
import { ListItem, ListItemLabel } from 'baseui/list'
import { useStyletron } from 'baseui'
import { Tag, KIND } from 'baseui/tag'

export function LogsList() {
  const [css] = useStyletron()
  return (
    <ul
      className={css({
        paddingLeft: 0,
        paddingRight: 0
      })}
    >
      <ListItem
        endEnhancer={() => <ChevronRight />}
        overrides={{
          Content: {
            style: () => ({
              cursor: 'pointer'
            })
          }
        }}
      >
        <ListItemLabel>
          <Tag kind={KIND.accent} closeable={false}>
            INFO
          </Tag>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </ListItemLabel>
      </ListItem>
      <ListItem endEnhancer={() => <ChevronRight />}>
        <ListItemLabel>
          <Tag kind={KIND.warning} closeable={false}>
            WARNING
          </Tag>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </ListItemLabel>
      </ListItem>
      <ListItem endEnhancer={() => <ChevronRight />}>
        <ListItemLabel>
          <Tag kind={KIND.negative} closeable={false}>
            ERROR
          </Tag>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </ListItemLabel>
      </ListItem>
      <ListItem endEnhancer={() => <ChevronRight />}>
        <ListItemLabel>
          <Tag kind={KIND.neutral} closeable={false}>
            DEBUG
          </Tag>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </ListItemLabel>
      </ListItem>
    </ul>
  )
}
