import { envs } from "./config";
import { Server } from "./presentation/Server";
import { AppRoutes } from "./presentation/routes";

(() => {
  main();
})();

async function main() {
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,

  }).start();
}

//todo: crear servidor: LISTO
//todo: conectar a la bd de mongoDB
