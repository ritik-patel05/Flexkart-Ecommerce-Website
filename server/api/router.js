import express from "express";

import routeHandler from "./v1/router.js";

const router = express.Router();

router.use(
  "/v1",
  (req, res, next) => {
    next();
  },
  routeHandler
);

export default router;
