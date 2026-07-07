import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Allow all HTTP methods for health check
  return res.status(200).json({
    status: "ok",
    time: new Date().toISOString()
  });
}
