import express from "express";
import db from "./src/config/db.js";
import authRouter from "./src/routes/AuthRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import cookieParser from "cookie-parser";
//modelos
import "./src/models/articleModel.js"
import "./src/models/articleTagModel.js"
import "./src/models/profileModel.js"
import "./src/models/tagModel.js"
import "./src/models/userModel.js"
//relaciones
import "./src/models/index.js"


const port = 3000;
const app = express();


app.use(express.json());
app.use(cookieParser());


app.use("/api", userRouter);
app.use("/api", authRouter);

/* app.use('api/profiles', profileRoutes);
app.use('api/articles', articleRoutes);
app.use('api/articletags', articleTagRoutes); */


app.listen(port, async () => {
    await db();
    console.log(`Servidor corriendo en el puerto ${port}`);
});