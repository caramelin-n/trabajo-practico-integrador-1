
import { Router } from "express";
import { authRegister } from "../controllers/authControllers.js";
import { registerAuthValidator } from "../middlewares/validators/authValidator.js";
import validator from "../middlewares/validator.js"
const authRouter = Router();

/* ● POST /api/auth/register: Registro de usuario con creación automática de perfil.
(público)
● POST /api/auth/login: Login con JWT enviado como cookie segura. (público)
● GET /api/auth/profile: Obtener perfil del usuario autenticado. (usuario autenticado)
● PUT /api/auth/profile: Actualizar perfil del usuario autenticado. (usuario autenticado)
● POST /api/auth/logout: Logout limpiando cookie de autenticación. (usuario
autenticado) */

authRouter.post('/auth/register', registerAuthValidator, validator , authRegister );


// authRouter.post('/auth/login');
// authRouter.get('/auth/profile');
// authRouter.put('/auth/profile');
// authRouter.post('/auth/logout');

export default authRouter;
