import express from "express";
import db from "./src/config/db.js";
import authRouter from "./src/routes/AuthRoutes.js";
import cookieParser from "cookie-parser";


const port = 3000;
const app = express();


app.use(express.json());
app.use(cookieParser());



app.use("/api", authRouter);

/* app.use('api/profiles', profileRoutes);
app.use('api/articles', articleRoutes);
app.use('api/articletags', articleTagRoutes); */


app.listen(port, async () => {
    await db();
    console.log(`Servidor corriendo en el puerto ${port}`);
});