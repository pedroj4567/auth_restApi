import { Router } from "express";

export class AuthRoutes {
    static get routes(): Router {
      
        const router = Router();

        router.post('/login', (req, res) => {
            res.json('desde login')
         })

         router.post('/register', (req, res) => {
            res.json('desde register')
         })
        
        
        return router;
  }
}