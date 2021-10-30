import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
    format: format.json(),
    level: 'debug',
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        //  new transports.File({ filename: `${logDir}/error.log`, level: "error" }),
        //  new transports.File({ filename: `${logDir}/combined.log` }),
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.simple()
            ),
        }),
    ],
})
