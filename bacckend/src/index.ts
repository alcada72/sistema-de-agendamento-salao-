import cors from "cors";
import express, { Response } from "express";
import helmet from "helmet";
import http from "http";
import path from "path";
import { mainRouter } from "./router/main.routes";
import { requestInterceptor } from "./utils/requestInterceptor";

const app = express();
const httpServer = http.createServer(app);

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

/**
 * Uploads públicos
 */
app.use(
  "/uploads",
  express.static(path.resolve("uploads"), {
    setHeaders: (res: Response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    }
  })
);

app.use(requestInterceptor);

// Rotas
app.use(mainRouter);

const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

httpServer.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║    JMC-cachiungo - v1.0.0              ║
  ║  Agendamento de serviços               ║
  ╠════════════════════════════════════════╣
  ║  🚀 Porta: ${PORT}
  ║  🌐 URL: ${BASE_URL}
  ║  📦 Ambiente: ${process.env.NODE_ENV || "development"}
  ╚════════════════════════════════════════╝
  `);
});