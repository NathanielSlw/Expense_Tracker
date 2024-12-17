// src/routes/transactionRoutes.ts
import express from 'express';
import Transaction from '../models/Transaction';

const router = express.Router();

// Créer une transaction
router.post('/transactions', async (req, res) => {
  try {
    const { amount, description, category, account_id, user_id, date } = req.body;
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
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des transactions.' });
  }
});

// Récupérer les transactions d'un compte spécifique
router.get('/transactions/account/:account_id', async (req, res) => {
  const { account_id } = req.params;
  try {
    const transactions = await Transaction.findAll({ where: { account_id } });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des transactions du compte.' });
  }
});

// Récupérer les transactions d'un utilisateur spécifique
router.get('/transactions/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const transactions = await Transaction.findAll({ where: { user_id } });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des transactions de l\'utilisateur.' });
  }
});

export default router;
