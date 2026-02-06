import "dotenv/config";
import express from "express";
import cors from "cors";

import { router } from "./routes";
import { dbConnection } from "./core/dbconfig/mariadb";
import { logMiddleware } from "./core/middleware/log.middleware";
import { configureCronJob } from "./core/cronjob/daemon";
import { errorHandlerMiddleware } from "./core/middleware/error-handler.middleware";

const PORT = process.env.SERVER_PORT || 3001;

const app = express();
const path = require("path");

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
//["http://54.70.207.245:3166", "http://54.70.207.245:3179", "http://localhost:4200"];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    // Permitir solicitudes sin origen (como las de herramientas como Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logMiddleware);
app.use(router);

// Rutas de la API
//app.use("/api", router);

// Sirviendo archivos estáticos desde 'storage'
app.use("/api/storage", express.static(path.join(__dirname, "..", "storage")));

// Servir la aplicación Angular
app.use(express.static(path.join(__dirname, "..", "public")));

// Todas las demás rutas sirven la app de Angular
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

dbConnection().then(() => {
  console.log("Conexión a la base de datos exitosa");
});

// Middleware de manejo de errores
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

configureCronJob();

// manejo de errores no capturados
process.on("uncaughtException", (error) => {
  console.error("Excepción no capturada:", error);
  // Manejo del error: registrar, limpiar recursos, reiniciar la aplicación si es necesario, etc.

  process.exit(1);

  //pm2 start app.ts --name="mi-aplicacion"
});
