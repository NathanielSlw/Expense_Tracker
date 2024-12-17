// src/models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';

class User extends Model {
  public user_id!: number;
  public username!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Le nom d'utilisateur doit être unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,  // active les champs createdAt et updatedAt
  }
);

export default User;
