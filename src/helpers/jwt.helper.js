import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const generateToken = (user) => {
    try {
        const payload = { 
            id: user.id,
            username: user.username,
            role: user.role
         };
         return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    } catch (error) {
        throw new error("Error al generar el token" + error.message);
    }
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Error al verificar el token" + error.message);
    }
};