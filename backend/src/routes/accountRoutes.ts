// src/routes/accountRoutes.ts
import express from 'express';
import Account from '../models/Account';

const router = express.Router();

// Créer un compte
router.post('/accounts', async (req, res) => {
  try {
    const { account_name, account_type, balance, user_id } = req.body;
    const account = await Account.create({ account_name, account_type, balance, user_id });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création du compte.' });
  }
});

// Récupérer tous les comptes
router.get('/accounts', async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des comptes.' });
  }
});

// Récupérer les comptes d'un utilisateur spécifique
router.get('/accounts/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const accounts = await Account.findAll({ where: { user_id } });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des comptes de l\'utilisateur.' });
  }
});

export default router;
