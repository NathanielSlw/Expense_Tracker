// src/models/Account.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';
import User from './User';  // Pour la relation avec l'utilisateur

class Account extends Model {
  public account_id!: number;
  public account_name!: string;
  public account_type!: string;
  public balance!: number;
  public user_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Account.init(
  {
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,  // Le solde commence à 0
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',  // FK vers la table `users`
        key: 'user_id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: true,
  }
);

// Relation : Un utilisateur peut avoir plusieurs comptes
User.hasMany(Account, { foreignKey: 'user_id' });
Account.belongsTo(User, { foreignKey: 'user_id' });

export default Account;
