"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/User.ts
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class User extends sequelize_1.Model {
}
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Le nom d'utilisateur doit être unique
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // active les champs createdAt et updatedAt
});
exports.default = User;
