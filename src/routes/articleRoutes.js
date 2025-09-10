import { Router } from "express";
import { createArticle, deleteArticle, getAllArticles, getArticleById, getUserArticles, getUserArticlesById, updateArticle } from "../controllers/articleControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import validator from "../middlewares/validator.js";
import ownerMiddleware from "../middlewares/ownerMiddleware.js"
import adminMiddleware from "../middlewares/adminMiddleware.js"
import { createArticleValidation, deleteArticleValidator, getArticleByIdValidator, getArticleUserByIdValidator, updateArticleValidator } from "../middlewares/validators/articleValidator.js";

const articleRouter = Router();
/* 
● POST /api/articles → Crear artículo. (usuario autenticado)
● GET /api/articles → Listar artículos publicados. (usuario autenticado)
● GET /api/articles/:id → Obtener artículo por su id. (usuario autenticado)
● GET /api/articles/user → Listar artículos publicados del usuario logueado. (usuario
autenticado)
● GET /api/articles/user/:id → Obtener artículo del usuario logueado por su id. (usuario
autenticado)
● PUT /api/articles/:id → Actualizar artículo (solo autor o admin).
● DELETE /api/articles/:id → Eliminación lógica (solo autor o admin). */

articleRouter.post('/articles', authMiddleware, createArticleValidation, validator, createArticle)
articleRouter.get('/articles', authMiddleware, getAllArticles)
articleRouter.get('/articles/:id', authMiddleware, getArticleByIdValidator, validator, getArticleById)
articleRouter.get('articles/user', authMiddleware, getUserArticles)
articleRouter.get('/articles/user/:id', authMiddleware, getArticleUserByIdValidator, validator, getUserArticlesById)
articleRouter.put('/articles/:id', adminMiddleware, ownerMiddleware, updateArticleValidator, validator, updateArticle)
articleRouter.delete('/articles/:id', adminMiddleware, ownerMiddleware, deleteArticleValidator, validator, deleteArticle)
