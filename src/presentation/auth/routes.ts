import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "./middlewares";
export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    /**
     *  DEPENDENCIES INYECTION
     */
    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    /**
     * CONTROLLER METHODS
     */
    const { loginUser, registerUser,getUsers } = new AuthController(authRepository);

    router.post("/login", loginUser);

    router.post("/register", registerUser);

    router.get('/users', [AuthMiddleware.validateJwt] ,getUsers)

    return router;
  }
}
