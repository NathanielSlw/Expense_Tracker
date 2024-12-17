// src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';

class User extends Model {}

User.init({
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
});

export default User;
