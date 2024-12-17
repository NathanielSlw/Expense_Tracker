"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Transaction.ts
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const Account_1 = __importDefault(require("./Account")); // Pour la relation avec le compte
const User_1 = __importDefault(require("./User")); // Pour la relation avec l'utilisateur
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    transaction_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    account_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'accounts', // FK vers la table `accounts`
            key: 'account_id',
        },
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'users', // FK vers la table `users`
            key: 'user_id',
        },
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: config_1.default,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
});
// Relations : Un compte peut avoir plusieurs transactions, un utilisateur peut avoir plusieurs transactions
Account_1.default.hasMany(Transaction, { foreignKey: 'account_id' });
Transaction.belongsTo(Account_1.default, { foreignKey: 'account_id' });
User_1.default.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User_1.default, { foreignKey: 'user_id' });
exports.default = Transaction;
