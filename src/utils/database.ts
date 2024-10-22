const user = process.env.DBUSER
const pass = process.env.DBPASS
const database = process.env.DBDB
const dbHost = process.env.DBHOST
const { Sequelize } = require('sequelize');

export const sequelize = new Sequelize(database, user, pass, {
    host: dbHost,
    dialect: 'postgres'
});


