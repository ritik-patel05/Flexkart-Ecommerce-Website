import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * database
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * jwt
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
};
