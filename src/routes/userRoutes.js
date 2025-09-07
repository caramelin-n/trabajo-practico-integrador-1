import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";
import { createUserValidator, deleteUserValidator, findUserByIdValidator, updateUserValidator } from "../middlewares/validators/userValidator.js";
import validator from "../middlewares/validator.js";

const router = Router();

router.get('/:id', createUserValidator, validator, getUserById);
router.get('/', updateUserValidator, validator, getAllUsers);
router.put('/:id', findUserByIdValidator, validator, updateUser);
router.delete('/:id', deleteUserValidator, validator, deleteUser);

export default router;