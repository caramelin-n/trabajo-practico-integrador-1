import articleModel from "../models/articleModel.js";

export const authOwnerMiddleware = async (req, res, next) => {
    try {
        const user = req.userLogged;
        const article = await articleModel.findByPk(req.params.id);
        if (article.dataValues.id !== user.id) {
            return res.status(401).json({ message: "Permiso denegado" })
        }
        next();
    } catch (error) {
        return res.status(500).json("Error interno en el servidor.");
    }
};