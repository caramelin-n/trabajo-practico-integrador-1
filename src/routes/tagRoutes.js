import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tagControllers.js";
import validator from "../middlewares/validator.js";
import { findTagByIdValidator, createTagValidator, deleteTagValidator, updateTagValidator } from "../middlewares/validators/tagValidator.js";

const router = Router();

router.get('/', getAllTags);
router.get('/:id', findTagByIdValidator, validator, getTagById);
router.post('/', createTagValidator, validator, createTag);
router.put('/:id', updateTagValidator, validator, updateTag);
router.delete('/:id', deleteTagValidator, validator, deleteTag);

export default router;