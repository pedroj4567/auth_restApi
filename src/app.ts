import { envs } from "./config";
import { Server } from "./presentation/Server";

(() => {
  main();
})();

async function main() {
  new Server({
    port: envs.PORT,
  }).start();
}

//todo: crear servidor: LISTO
//todo: conectar a la bd de mongoDB
