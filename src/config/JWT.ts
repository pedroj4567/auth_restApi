import jwt from "jsonwebtoken";
import { envs } from "./envs";

// semilla secreta 
const SEED_JWT:string = envs.SECRET_KEY;

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
        jwt.sign(payload, SEED_JWT, { expiresIn: duration }, (err, token) => {
            if (err) return resolve(null)
            
            return resolve(token!)
      });
    });
  }


  static validateToken<T>(token: string): Promise<T | null>{
    return new Promise((resolve) => {

      jwt.verify(token, SEED_JWT, (err, decoded) => { 
        if (err) return resolve(null);

        resolve(decoded as T);
      } )
     })
  }
}
