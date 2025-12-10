import { Sequelize } from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

const db_name = process.env.DB_NAME;
const db_user_name = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

const enable_db_log = process.env.ENABLE_DB_LOG === "true";
const db_sync = process.env.ENABLE_DB_SYNC === "true";

const interDB = new Sequelize(db_name!, db_user_name!, db_password!, {
  host: db_host,
  port: parseInt(db_port!),
  dialect: "mariadb",
  logging: (msg) => {
    if (!enable_db_log) return;
    console.log(msg);
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 60000, // 60 segundos para adquirir una conexión
    idle: 10000, // 10 segundos de tiempo de inactividad
  },
  dialectOptions: {
    allowPublicKeyRetrieval: true,
    connectTimeout: 60000,
    options: {
      requestTimeout: 60000,
    },
  },
});

async function dbConnection() {
  let sincronizando = false;
  try {
    console.log("Connecting to Interplazas database...");
    await interDB.authenticate();

    // UNCOMMENT NEXT LINE TO SYNC MODELS WITH DATABASE
    if (db_sync) {
      sincronizando = true;
      console.log("\x1b[31m%s\x1b[0m", "Synchronizing database.....");
      console.log("\x1b[31m%s\x1b[0m", "Please Wait.....");

      try {
        await interDB.sync({ force: false, alter: true });
        console.log("\x1b[32m%s\x1b[0m", "All models were synchronized successfully.");
        console.log("\x1b[32m%s\x1b[0m", "Interplazas Database online.");
      } catch (err) {
        console.error("\x1b[31m%s\x1b[0m", "Error syncing models:", err);
        throw err;
      }
    }

    if (!sincronizando) {
      console.log("\x1b[32m%s\x1b[0m", "Interplazas Database online.");
    }
  } catch (error) {
    console.error("Unable to connect to Interplazas database:", error);
    throw error;
  }
}

export default interDB;
export { dbConnection };
