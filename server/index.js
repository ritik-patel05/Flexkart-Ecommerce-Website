import container from "./di/index.js";
import server from "./server.js";

process
  .on("uncaughtException", (err) => {
    if (process.env.ACTIVE_ENV !== "PRODUCTION") {
      console.log("Got uncaught exception ", err);
      process.exit(1);
    }
  })
  .on("unhandledRejection", (err) => {
    if (process.env.ACTIVE_ENV !== "PRODUCTION") {
      console.log("Got unhandled rejection ", err);
      process.exit(1);
    }
  });

server(container).then(async (app) => {
  const port = container.resolve("config").port;
  const logger = container.resolve("logger");
  const server = app.listen(port, () => {
    logger.info(
      `Server started successfully, running on port: ${
        container.resolve("config").port
      }.`
    );
  });

  server.keepAliveTimeout = 120000;
  app.on("close", () => {
    // Close DB connections, etc.
  });
});
