const Sequelize = require('sequelize');
const connection = new Sequelize('app_perguntas','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = connection;