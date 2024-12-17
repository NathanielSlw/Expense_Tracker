import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('expense_trackerdb', 'nathanielsalewyn', 'password123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,  // Désactive les logs de requêtes (facultatif)
});

export default sequelize;
