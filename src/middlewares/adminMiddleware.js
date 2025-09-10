import { verifyToken } from "../helpers/jwt.helper.js";

const authAdminMiddleware = (req, res, next) => {
    try {
        const userisLogged = req.user;
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({ message: "Usuario no autenticado" });
        }
        const decoded = verifyToken(token);
        req.user = decoded;
        if(decoded.role !== "admin"){
            return res.status(403).json({ message: "Permiso denegado." });
        }
    next();
    } catch (error) {
        return res.status(500).json("Error interno en el servidor.")
    }
}

export default authAdminMiddleware;