import buildDevLogger from "./dev-logger.js";
import buildProdLogger from "./prod-logger.js";

let logger = null;
if (process.env.NODE_ENV === "development") {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

export default logger;
