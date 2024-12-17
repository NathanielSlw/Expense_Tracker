import express from 'express';
import Transaction from '../models/Transaction';

const router = express.Router();

// Créer une transaction
router.post('/transactions', async (req, res) => {
  const { amount, description, category, account_id, user_id, date } = req.body;
  try {
    const transaction = await Transaction.create({
      amount, description, category, account_id, user_id, date
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de la transaction.' });
  }
});

// Récupérer toutes les transactions
router.get('/transactions', async (req, res) => {
  const transactions = await Transaction.findAll();
  res.status(200).json(transactions);
});

export default router;
