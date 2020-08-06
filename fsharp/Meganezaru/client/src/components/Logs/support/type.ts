export type LogType = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'

export type Log = {
  type: LogType
  log: string
}
