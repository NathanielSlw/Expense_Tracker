"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('expense_trackerdb', 'nathanielsalewyn', 'password123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // Désactive les logs de requêtes (facultatif)
});
exports.default = sequelize;
