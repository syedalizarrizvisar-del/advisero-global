import type { Request, Response } from "express";
import { z } from "zod";

const createLeadSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(7).max(32),
  service: z.enum([
    "international",
    "ecommerce",
    "tax",
    "consulting",
    "marketing",
    "training",
  ]),
  message: z.string().min(10).max(4000),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

export function registerLeadRoutes(router: { post: Function; get?: Function }) {
  router.post("/api/leads", (req: Request, res: Response) => {
    const parse = createLeadSchema.safeParse(req.body);

    if (!parse.success) {
      return res.status(400).json({
        ok: false,
        error: "Validation failed",
        issues: parse.error.issues,
      });
    }

    // In-memory for now (MySQL to be added later)
    // TODO: Replace with MySQL repository.
    const lead = parse.data;

    // eslint-disable-next-line no-console
    console.log("[lead] new lead captured", lead);

    return res.status(201).json({
      ok: true,
      lead: {
        ...lead,
        createdAt: new Date().toISOString(),
      },
    });
  });
}
