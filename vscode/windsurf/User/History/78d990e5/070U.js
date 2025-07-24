import "./services/loadenv.js";
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { log } from "./vite.js";
import { setupVite, serveStatic } from "./vite.js";
import { registerRoutes } from "./routes.js";
import { WebSocketServer } from "ws";
import { setupWebSocketHandlers } from "./services/websocket.js";
import cors from "cors";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Start the application server
 */
async function startServer() {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:5000", // Can be string instead of array
      credentials: true,
    })
  );

  app.use(express.json());

  app.use((req, res, next) => {
    // Middleware to log incoming requests
    log(`Received ${req.method} request for ${req.url}`);
    next();
  });

  const server = http.createServer(app);

  // Register application routes
  await registerRoutes(app, server);

  // Setup WebSocket server AFTER all routes are registered
  const wss = new WebSocketServer({ server, path: "/ws" });
  setupWebSocketHandlers(wss);

  // Setup Socket.IO server
  const socketio = new Server(server);

  // Set up static file serving based on environment
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    log("Starting server in development mode");
    await setupVite(app, server);
  } else {
    log("Starting server in production mode.");
    serveStatic(app);
  }

  // Start the server
  const PORT = process.env.PORT || 3001; // Using a different port to avoid conflicts with Vite
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
