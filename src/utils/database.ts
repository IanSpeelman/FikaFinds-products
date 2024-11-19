const user = process.env.DBUSER
const pass = process.env.DBPASS
const database = process.env.DBPRODUCTS
const dbHost = process.env.PRODUCTSDBHOST
const port = process.env.PRODUCTSDBPORT
const { Sequelize } = require('sequelize');
import { DataTypes } from "sequelize";

const sequelize = new Sequelize(database, user, pass, {
    dialect: 'postgres',
    host: dbHost,
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
    image: { type: DataTypes.TEXT, allowNull: false, },
    price: { type: DataTypes.INTEGER, allowNull: false, },
    category: { type: DataTypes.STRING, allowNull: false, },
    stock: { type: DataTypes.INTEGER, allowNull: true, },
    amount: { type: DataTypes.INTEGER, allowNull: true, },
    description: { type: DataTypes.STRING, allowNull: false, },
    specifications: { type: DataTypes.STRING, allowNull: false, },
});
(async () => {
    await sequelize.sync({ alter: true });
})();
