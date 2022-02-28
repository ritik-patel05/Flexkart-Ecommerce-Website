import { format, createLogger, transports } from "winston";

const { combine, printf, errors, colorize } = format;

const devLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    level: "info",
    format: combine(
      colorize(),
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
};

export default devLogger;
