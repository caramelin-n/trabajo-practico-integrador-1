import { Router } from "express";
import validator from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { AddTagArticle, deleteTagArticle } from "../controllers/ArticleTagControllers.js";
import { createRelValidation, deleteRelValidation } from "../middlewares/validators/re.validation.js";

const articleTagRoutes = Router();

articleTagRoutes.post('/articletags', authMiddleware, createRelValidation, validator, AddTagArticle);
articleTagRoutes.delete('/articletags/:id', authMiddleware, deleteRelValidation, validator, deleteTagArticle);

export default articleTagRoutes;