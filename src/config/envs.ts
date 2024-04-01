import "dotenv/config";
import { get } from "env-var";

export const envs = {
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DBNAME: get('MONGO_DB_NAME').required().asString(),
  PORT: get("PORT").required().asPortNumber(),
  SECRET_KEY: get('SECRET_KEY').required().asString(),
};
