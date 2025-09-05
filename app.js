import express from "express";
import dotenv from "dotenv";
import db from "./src/config/db.js";
import tagRoutes from "./src/routes/tagRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

const port = 3000;
const app = express();
app.use(express.json());

app.use('api/tags', tagRoutes);
app.use('api/users', userRoutes);
/* app.use('api/profiles', profileRoutes);
app.use('api/articles', articleRoutes);
app.use('api/articletags', articleTagRoutes); */

app.listen(port, async () => {
    await db();
    console.log(`Servidor corriendo en el puerto ${port}`);
});