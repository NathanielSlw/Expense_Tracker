// src/models/Transaction.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';
import Account from './Account';
import User from './User';

class Transaction extends Model {}

Transaction.init({
  transaction_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  category: { type: DataTypes.STRING, allowNull: true },
  account_id: { type: DataTypes.INTEGER, references: { model: 'accounts', key: 'account_id' } },
  user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' } },
  date: { type: DataTypes.DATE, allowNull: false },
}, {
  sequelize,
  modelName: 'Transaction',
  tableName: 'transactions',
  timestamps: true,
});

Transaction.belongsTo(Account, { foreignKey: 'account_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

export default Transaction;
