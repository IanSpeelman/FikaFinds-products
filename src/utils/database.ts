const user = process.env.DBUSER
const pass = process.env.DBPASS
const database = process.env.DBDB
const dbHost = process.env.DBHOST
const { Sequelize } = require('sequelize');
import { DataTypes } from "sequelize";

const sequelize = new Sequelize(database, user, pass, {
    host: dbHost,
    dialect: 'postgres'
});

(async function verifyDbConnection() {
    try {
        await sequelize.authenticate()
        console.log("database connection succes")
    }
    catch (err) {
        console.log("datbase connection could not be established", err)
    }
})();

export const Product = sequelize.define("product", {
    name: { type: DataTypes.STRING, allowNull: false, },
    image: { type: DataTypes.STRING, allowNull: false, },
    price: { type: DataTypes.INTEGER, allowNull: false, },
    category: { type: DataTypes.STRING, allowNull: false, },
    stock: { type: DataTypes.INTEGER, allowNull: true, },
    amount: { type: DataTypes.INTEGER, allowNull: true, }
});
(async () => {
    await sequelize.sync({ alter: true });
})();

