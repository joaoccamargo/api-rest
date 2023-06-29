import { Sequelize } from "sequelize";
import connection from "../database/database.js";

export const Game = connection.define("games", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Game.sync({force: false})

export default Game;