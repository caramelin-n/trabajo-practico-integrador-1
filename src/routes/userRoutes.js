import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";
import { createUserValidator, deleteUserValidator, findUserByIdValidator, updateUserValidator } from "../middlewares/validators/userValidator.js";
import validator from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"

/* ● GET /api/users → Listar todos los usuarios con sus perfiles. (solo admin)
● GET /api/users/:id → Obtener usuario específico con perfil y artículos. (solo admin)
● PUT /api/users/:id → Actualizar usuario (solo admin).
● DELETE /api/users/:id → Eliminación lógica de usuario (solo admin). */

const userRouter = Router();

userRouter.get('/:id', authMiddleware, adminMiddleware, createUserValidator, validator, getUserById);
userRouter.get('/', authMiddleware, adminMiddleware, updateUserValidator, validator, getAllUsers);
userRouter.put('/:id', authMiddleware, adminMiddleware, findUserByIdValidator, validator, updateUser);
userRouter.delete('/:id', authMiddleware, adminMiddleware, deleteUserValidator, validator, deleteUser);

export default userRouter;