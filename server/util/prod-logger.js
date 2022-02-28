import { format, createLogger, transports } from "winston";

const { timestamp, combine, errors, json } = format;

const buildProdLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.File({ filename: "logs/error.log", level: "error" }),
      new transports.File({ filename: "logs/combined.log" }),
    ],
  });
};

export default buildProdLogger;
