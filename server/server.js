import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import router from "./api/router.js";

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

    // Passport
    const Passport = container.resolve("Passport");
    Passport.useJwtStrategy();
    Passport.initialize(app);

    app.use((req, res, next) => {
      req.container = container.createScope();
      next();
    });

    // Initial route
    app.get("/", (req, res) => {
      return res.send(
        `Welcome!!! from Ritik Patel!! ${process.env.NODE_ENV} ${new Date(
          Date.now()
        )}`
      );
    });

    // API routes
    app.use("/api", router);

    // Error handler
    app.use((err, req, res, next) => {
      res.header("Content-Type", "application/json");
      res.status(err.statusCode).send(JSON.stringify(err, null, 4)); // pretty print
    });

    return resolve(app);
  });
};

export default server;
