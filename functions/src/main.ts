import "reflect-metadata";
import "./container";
import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {registerRoutes} from "./interfaces/routes";

const app = express();
app.use(cors());
app.use(express.json());

registerRoutes(app);

export {app};
export const api = functions.https.onRequest(app);

