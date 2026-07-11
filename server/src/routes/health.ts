import type { Request, Response } from "express";

export function registerHealthRoutes(router: { get: Function }) {
  router.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
      ok: true,
      service: "advisero-global-server",
      timestamp: new Date().toISOString(),
    });
  });
}
