import express from 'express';
import User from '../models/User';

const router = express.Router();

// Créer un utilisateur
router.post('/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
  }
});

// Récupérer tous les utilisateurs
router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

export default router;
