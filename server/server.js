import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";

const server = async (container) => {
  // Start Express App server
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(express.json()); // Parse JSON
    app.use(morgan("dev")); // Log HTTP Requests
    app.use(cors());
    app.use(compression()); // decrease the size of the response body
    app.use(
      helmet({
        contentSecurityPolicy: false,
      })
    ); // For security
    app.use(cookieParser()); // Populate req.cookies with cookies

    // MongoDb Connection
    container.resolve("mongoDb").connectDb();

    // Add initial route
    app.use("/", (req, res) => {
      return res.send(
        `Welcome!!! from Ritik Patel!! ${process.env.NODE_ENV} ${new Date(
          Date.now()
        )}`
      );
    });

    // Add routes

    // Error handler
    app.use((err, req, res, next) => {
      res.header("Content-Type", "application/json");
      res.status(err.statusCode).send(JSON.stringify(err, null, 4)); // pretty print
    });

    return resolve(app);
  });
};

export default server;
