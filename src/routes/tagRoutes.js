import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tagControllers.js";
import validator from "../middlewares/validator.js";
import { findTagByIdValidator, createTagValidator, deleteTagValidator, updateTagValidator } from "../middlewares/validators/tagValidator.js";

const tagRouter = Router();

tagRouter.get('/', getAllTags);
tagRouter.get('/:id', findTagByIdValidator, validator, getTagById);
tagRouter.post('/', createTagValidator, validator, createTag);
tagRouter.put('/:id', updateTagValidator, validator, updateTag);
tagRouter.delete('/:id', deleteTagValidator, validator, deleteTag);

export default tagRouter;