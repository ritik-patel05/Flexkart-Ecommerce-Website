import mongoose from "mongoose";
const { connect } = mongoose;

/** Class handling methods for MongoDB */
class MongoDb {
  /**
   * Create a MongoDb instance
   * @param {function} logger - logger instance
   */
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * Connect to mongoose
   * @returns {Promise} If successfully connected to mongoDB database.
   */
  async connectDb() {
    try {
      await connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      this.logger.info("Connected To Database!");
    } catch (err) {
      this.logger.error("Connection To Database failed.", err);
      process.exit(1);
    }
  }
}

export default MongoDb;
