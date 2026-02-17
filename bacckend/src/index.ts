import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import path from "path";
import { mainRouter } from "./router/main.routes";

const app = express();
const httpServer = http.createServer(app)

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization",]
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Servir uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"), {
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);



//Configuração de rotas
app.use(mainRouter);

const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando em ${BASE_URL}  🚀🚀`);
});
