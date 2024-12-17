import express from 'express';
import sequelize from './config/config';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import transactionRoutes from './routes/transactionRoutes';

const app = express();
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', accountRoutes);
app.use('/api', transactionRoutes);

// Synchroniser la base de données
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
