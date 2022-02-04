import { createLogger, format, transports } from "winston";
import "reflect-metadata";
import ConsoleFormat from "../models/ConsoleFormatter";
const uuid = require("node-uuid");

export default class LoggerClass {
  static setTraceId = () => {
    const traceID = uuid.v4();
    Reflect.defineMetadata(
      "traceIDcron",
      traceID,
      String.prototype,
      "toString"
    );
  };

  static createLogger() {
    let consoleFormatter = new ConsoleFormat();
    return createLogger({
      transports: [
        new transports.Console({
          level: "debug",
          format: format.combine(
            format.colorize(),
            format.json(),
            format.timestamp({format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'}),
            format.printf(consoleFormatter.formatMessageConsole)
          ),
        }),
      ],
    });
  }
}
