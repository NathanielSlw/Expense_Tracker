"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Account.ts
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const User_1 = __importDefault(require("./User")); // Pour la relation avec l'utilisateur
class Account extends sequelize_1.Model {
}
Account.init({
    account_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    account_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00, // Le solde commence à 0
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'users', // FK vers la table `users`
            key: 'user_id',
        },
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: true,
});
// Relation : Un utilisateur peut avoir plusieurs comptes
User_1.default.hasMany(Account, { foreignKey: 'user_id' });
Account.belongsTo(User_1.default, { foreignKey: 'user_id' });
exports.default = Account;
