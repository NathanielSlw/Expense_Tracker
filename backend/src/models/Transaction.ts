// src/models/Transaction.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/config';
import Account from './Account';  // Pour la relation avec le compte
import User from './User';  // Pour la relation avec l'utilisateur

class Transaction extends Model {
  public transaction_id!: number;
  public amount!: number;
  public description!: string;
  public category!: string;
  public account_id!: number;
  public user_id!: number;
  public date!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Transaction.init(
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'accounts',  // FK vers la table `accounts`
        key: 'account_id',
      },
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',  // FK vers la table `users`
        key: 'user_id',
      },
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
  }
);

// Relations : Un compte peut avoir plusieurs transactions, un utilisateur peut avoir plusieurs transactions
Account.hasMany(Transaction, { foreignKey: 'account_id' });
Transaction.belongsTo(Account, { foreignKey: 'account_id' });

User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

export default Transaction;
