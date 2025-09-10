import sequelize from "./database.js";
import chalk from "chalk";

const db = async () => {
    try {
        await sequelize.authenticate();
        console.log(chalk.greenBright("La conexión a la base de datos ha sido exitosa."));
        await sequelize.sync({force: true});
    } catch (error) {
        console.log(chalk.red("No se ha podido conectar a la base de datos."));
        console.error(chalk.redBright(error));
    };
};

export default db;