
# Typescript - Node.js (Auth Rest-Api)
 
Esta API de autenticación de usuarios, desarrollada con TypeScript y Express, se centra en la gestión del registro e inicio de sesión de usuarios en aplicaciones web. Utiliza la arquitectura limpia para asegurar un código organizado y mantenible, facilitando la expansión y adaptación a nuevas funcionalidades. La API se basa en la generación y validación de JSON Web Tokens (JWT) para autenticar a los usuarios, sin la necesidad de manejar sesiones persistentes ni utilizar HTTPS.



## Funcionalidades Principales:


- Registro de Usuarios: Permite la creación de cuentas de usuario.
- Inicio de Sesión: Autentica a los usuarios y genera un JWT para la sesión.
- Validación de JWT: Utiliza middleware para validar el JWT en cada solicitud,    asegurando el acceso a rutas protegidas.
- Hashing de Contraseñas: Las contraseñas se almacenan de manera segura mediante hashing.


## Variables de entorno

Para iniciarlizar este servicio, necesitas inyectar las siguientes variables de entorno en tu archivo .env:

`PORT : 3200`

`MONGO_URI : Tu conexion a MongoDB`


## Correr entorno local

Clona el proyecto

```bash
  git clone https://github.com/pedroj4567/auth_restapi_cleanCode.git
```

Ir al directorio del proyecto

```bash
  cd auth_restApi
```

Correr el docker compose para inicar la bd de mongo en local.
Abrir una terminal y colocar el siguiente comando:

```bash
  docker compose up
```

En otra terminal 
Instalamos nuestras dependencias

```bash
  npm install
```

Arrancar el servidor

```bash
  npm run dev
```
