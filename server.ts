/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Import Vercel handlers for local development and local routing
import healthHandler from "./api/health";
import waitlistHandler from "./api/waitlist";
import savePatientHandler from "./api/save-patient";
import searchDoctorHandler from "./api/search-doctor";
import matchSpecialistHandler from "./api/match-specialist";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Mount our Vercel Serverless Function handlers as Express route handlers
app.get("/api/health", healthHandler as any);
app.post("/api/waitlist", waitlistHandler as any);
app.post("/api/save-patient", savePatientHandler as any);
app.post("/api/search-doctor", searchDoctorHandler as any);
app.post("/api/match-specialist", matchSpecialistHandler as any);

// Configure Vite middleware or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring Vite dev server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Configuring production static directories...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tinder Health Server running on http://localhost:${PORT}`);
  });
}

startServer();
