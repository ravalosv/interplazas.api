import { Router } from "express";
import { readdirSync } from "fs";

/**
 * 
  Este módulo utiliza Express.js para manejar rutas dinámicamente. Lee todos los archivos en el directorio actual, 
  los importa como módulos de enrutamiento y los añade al enrutador principal de Express.js. 
  Cada módulo de enrutamiento se asocia con una ruta basada en su nombre de archivo.
 */

// Define la ruta del directorio actual
const PATH_ROUTER = `${__dirname}/`;

// Crea una nueva instancia de Router
const router = Router();

/**
 * Función para limpiar el nombre del archivo, eliminando la extensión
 * @param {string} fileName - El nombre del archivo a limpiar
 * @returns {string} El nombre del archivo sin la extensión
 */
const cleanFileName = (fileName: string) => {
  var ret = fileName.split(".").shift();
  return ret;
};

// Lee todos los archivos en el directorio actual
readdirSync(PATH_ROUTER)
  // Filtra el archivo actual (index.ts) para no importarlo
  .filter((fileName) => fileName !== "index.ts")
  .filter((fileName) => fileName !== "index.js")
  .filter((fileName) => fileName !== "index.js.map")
  .filter((fileName) => !fileName.endsWith(".map"))
  // Para cada archivo restante
  .forEach((file) => {
    console.log("Loading route file: ", file);
    // Limpia el nombre del archivo
    const cleanName = cleanFileName(file);

    // Importa el archivo como un módulo
    import(`./${cleanName}.route`).then((moduleRouter) => {
      // Imprime un mensaje en la consola indicando que se está añadiendo la ruta
      console.log(`... Adding router for [/api/${cleanName}]`);

      // Añade la ruta del módulo al router principal
      router.use(`/api/${cleanName}`, moduleRouter.router);
    });
  });

// Exporta el router principal
export { router };
