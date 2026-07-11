import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { registerHealthRoutes } from "./routes/health";
import { registerLeadRoutes } from "./routes/leads";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(morgan("combined"));
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  registerHealthRoutes(app);
  registerLeadRoutes(app);

  app.get("/", (_req, res) => {
    res.status(200).json({
      ok: true,
      service: "advisero-global-server",
      routes: ["/api/health"],
    });
  });

  app.use((_req, res) => {
    res.status(404).json({ ok: false, error: "Not found" });
  });

  return app;
}
