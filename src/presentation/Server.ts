import express, { Router } from "express";
import { morganConfig } from "../config/morganConfig";
interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;
    this.port = port;
    this.routes = routes;
    this.app.use(morganConfig)

  }

  // run server
  async start() {
    //routes
    this.app.use(this.routes)

    // server
    this.app.listen(this.port, () => {
      console.log(`Server runnint on port ${this.port}`);
    });
  }
}
