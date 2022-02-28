import {
  createContainer,
  asValue,
  asClass,
  InjectionMode,
  Lifetime,
} from "awilix";
import config from "../config/index.js";
import models from "../models/index.js";
import utility from "../util/index.js";
import mongoDb from "../driver/mongo.js";

/**
 * We can save memory by registering all dependency instance as singleton
 * @returns {Object}
 */
function getScope() {
  // eslint-disable-next-line no-process-env
  if (process.env.ACTIVE_ENV === "PRODUCTION") {
    return { lifetime: Lifetime.SINGLETON };
  }
  return { lifetime: Lifetime.TRANSIENT };
}

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
  // ------------------ CONFIG ------------------
  config: asValue(config),

  // ------------------ UTILITY ------------------
  logger: asValue(utility.logger),
  constants: asValue(utility.constants),

  // ------------------ MODEL ------------------
});

// ------------------ MIDDLEWARE ------------------
container.register("mongoDb", asClass(mongoDb, getScope()));

// ------------------ LOGIC ------------------

// ------------------ API ------------------

export default container;
