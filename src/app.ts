import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { Server } from "./presentation/Server";
import { AppRoutes } from "./presentation/routes";

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoURL: envs.MONGO_URL,
    dbName: envs.MONGO_DBNAME
  })
  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,

  }).start();
}
