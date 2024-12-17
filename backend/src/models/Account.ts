// src/models/Account.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';
import User from './User';

class Account extends Model {}

Account.init({
  account_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  account_name: { type: DataTypes.STRING, allowNull: false },
  account_type: { type: DataTypes.STRING, allowNull: false },
  balance: { type: DataTypes.FLOAT, allowNull: false },
  user_id: { type: DataTypes.INTEGER, references: { model: 'users', key: 'user_id' } },
}, {
  sequelize,
  modelName: 'Account',
  tableName: 'accounts',
  timestamps: true,
});

Account.belongsTo(User, { foreignKey: 'user_id' });

export default Account;
