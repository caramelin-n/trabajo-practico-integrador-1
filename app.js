import express from "express";
import db from "./src/config/db.js";
import authRouter from "./src/routes/AuthRoutes.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/userRoutes.js";
//modelos
import "./src/models/articleModel.js"
import "./src/models/articleTagModel.js"
import "./src/models/profileModel.js"
import "./src/models/tagModel.js"
import "./src/models/userModel.js"
//relacioness
import "./src/models/index.js"
import articleRouter from "./src/routes/articleRoutes.js";
import tagRouter from "./src/routes/tagRoutes.js";
import articleTagRoutes from "./src/routes/articleTagRoutes.js";


const port = 3000;
const app = express();


app.use(express.json());
app.use(cookieParser());


app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", articleRouter)
app.use("/api", tagRouter)
app.use('/api', articleTagRoutes);

app.listen(port, async () => {
    await db();
    console.log(`Servidor corriendo en el puerto ${port}`);
});