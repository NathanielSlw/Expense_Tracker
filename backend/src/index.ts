// src/index.ts
import express from 'express';
import sequelize from './config/config';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';

// Initialise Express
const app = express();
app.use(express.json());

// Utilise les routes
app.use('/api', userRoutes);
app.use('/api', accountRoutes);
app.use('/api', transactionRoutes);

// Synchronisation avec la base de données
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

// Démarre le serveur Express
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
