const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'postgres',
    'postgres',
    'elias1540',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max: 10,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
)

module.exports = {
    sequelize
}