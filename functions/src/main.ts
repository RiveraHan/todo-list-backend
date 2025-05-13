import "reflect-metadata";
import "./container";
import * as functions from "firebase-functions/v2";
import express from "express";
import cors from "cors";
import {registerRoutes} from "./interfaces/routes";
import helmet from "helmet";
import rateLimitLib from "express-rate-limit"; // Renamed the default import

const app = express();

app.use(cors({origin: true}));

app.use(helmet());

app.use(express.json());

// Enable rate limit
const limiter = rateLimitLib({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
  handler: (_: express.Request, res: express.Response) => {
    res.status(429).json({
      statusCode: 429,
      body: {
        error: "TooManyRequests",
        errorCode: "TOO_MANY_REQUESTS",
        errorMessage: "Too many requests, please try again later.",
      },
    });
  },
});

app.use(limiter);
registerRoutes(app);

export {app};
export const api = functions.https.onRequest(app);
