import { KIND } from 'baseui/tag'
import { LogType } from './type'

export function toTag(type: undefined | LogType): KIND[keyof KIND] {
  switch (type) {
    case 'TRACE':
    case 'DEBUG':
      return KIND.neutral
    case 'INFO':
      return KIND.accent
    case 'WARN':
      return KIND.warning
    case 'ERROR':
    case 'FATAL':
      return KIND.negative
    default:
      return KIND.neutral
  }
}
