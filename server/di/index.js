import {
  createContainer,
  asValue,
  asClass,
  InjectionMode,
  Lifetime,
} from "awilix";
import config from "../config/index.js";
import { UserModel } from "../models/index.js";
import utility from "../util/index.js";
import mongoDb from "../driver/MongoDb.js";
import Passport from "../driver/Passport.js";
import { UserRepo } from "../repository/data/index.js";
import LoginApi from "../api/v1/Login.js";
import SignUpApi from "../api/v1/Signup.js";

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
  UserModel: asValue(UserModel),
});

// ------------------ MIDDLEWARE ------------------
container.register("mongoDb", asClass(mongoDb, getScope()));
container.register("Passport", asClass(Passport, getScope()));

// ------------------ REPOSITORY ------------------
container.register("UserRepo", asClass(UserRepo, getScope()));

// ------------------ LOGIC ------------------

// ------------------ API ------------------
container.register("loginApi", asClass(LoginApi, getScope()));
container.register("signupApi", asClass(SignUpApi, getScope()));

export default container;
