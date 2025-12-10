
export const configureCronJob = () => {
  const cron = require("node-cron");
  const moment = require("moment-timezone");

  const minuto = process.env.CRON_MINUTO;
  const hora = process.env.CRON_HORA;
  const diaDelMes = process.env.CRON_DIA_DEL_MES;
  const mes = process.env.CRON_MES;
  const diaDeLaSemana = process.env.CRON_DIA_DE_LA_SEMANA;

  const tiempoCron = `${minuto} ${hora} ${diaDelMes} ${mes} ${diaDeLaSemana}`;

  console.log("************ Configurando tarea ************");
  console.log("Tiempo cron: ", tiempoCron);

  // Programa la tarea para que se ejecute a la 1 a.m. CT
  cron.schedule(
    tiempoCron,
    () => {
      console.log("\x1b[33m%s\x1b[0m", "************ Ejecutando tarea ************");

      // imprimir hora actual
      console.log("\x1b[33m%s\x1b[0m", moment().tz("America/Chicago").format());

      //eventoController.cerrarEventosPorFechaLimite();
    },
    {
      scheduled: true,
      timezone: "America/Chicago",
    }
  );
};
