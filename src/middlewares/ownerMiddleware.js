import { verifyToken } from "../helpers/jwt.helper.js";
import articleModel from "../models/articleModel.js";

const authOwnerMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = verifyToken(token)
        const user = decoded
        const article = await articleModel.findByPk(req.params.id);
        if (article.user_id !== user.id) {
            return res.status(401).json({ message: "Permiso denegado" })
        }
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json("Error interno en el servidor.");
    }
};

export default authOwnerMiddleware;