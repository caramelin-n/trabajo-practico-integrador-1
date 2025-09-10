
import { Router } from "express";
import { authRegister, authLogin , getProfile, authLogout , updateProfile} from "../controllers/authControllers.js";
import { registerAuthValidator, loginAuthValidator, updateProfileValidator } from "../middlewares/validators/authValidator.js";
import validator from "../middlewares/validator.js"
import { authMiddleware } from "../middlewares/authMiddleware.js";
const authRouter = Router();

//si se quiere verificar que un usuario está autenticado se llama a la funcion authMiddleware
//si se quiere verificar si el usuario es admin para acceder a peticiones se llama a adminMiddleware


authRouter.post('/auth/register', registerAuthValidator, validator , authRegister );
authRouter.post("/auth/login",loginAuthValidator, validator, authLogin );
authRouter.get("/auth/profile", authMiddleware , getProfile);
authRouter.put("/auth/profile", authMiddleware, updateProfileValidator , validator , updateProfile);
authRouter.post("/auth/logout", authMiddleware , authLogout);


export default authRouter;
