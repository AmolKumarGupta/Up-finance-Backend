import { createLogger, format, transports } from 'winston'

interface TransformableInfo {
  level: string
  timestamp: string
  message: string
}
export default createLogger({
  transports: new transports.File({
    filename: 'storage/logs/error.log',
    format: format.combine(
      format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
      format.align(),
      format.printf(
        (info: TransformableInfo) => `${info.timestamp}| ${info.level}: ${info.message}`
      )
    )
  })
})
