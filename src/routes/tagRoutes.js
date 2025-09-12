import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tagControllers.js";
import validator from "../middlewares/validator.js";
import { findTagByIdValidator, createTagValidator, deleteTagValidator, updateTagValidator } from "../middlewares/validators/tagValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js"

const tagRouter = Router();

tagRouter.get('/tags', authMiddleware, getAllTags);
tagRouter.get('/tags/:id', adminMiddleware, authMiddleware, findTagByIdValidator, validator, getTagById);
tagRouter.post('/tags', adminMiddleware, authMiddleware, createTagValidator, validator, createTag);
tagRouter.put('/tags/:id', adminMiddleware, authMiddleware, updateTagValidator, validator, updateTag);
tagRouter.delete('/tags/:id', adminMiddleware, authMiddleware, deleteTagValidator, validator, deleteTag);

export default tagRouter;