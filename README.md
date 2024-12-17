# Expense_Tracker

### Sommaire
1. Télécharger le projet
2. Commandes pour lancer le projet
    - Frontend
    - Backend
3. Commandes Git de base
4. Tables
5. Plan étape par étape
    - Phase 1 : Préparation
    - Phase 2 : Backend
    - Phase 3 : Frontend 
    - Phase 4 : Fonctionnalités Avancées

### Télécharger et lancer le projet

**Télécharger le projet :**
```
https://github.com/NathanielSlw/Expense_Tracker.git
cd Expense_Tracker
```

Modifier le fichier `config.ts` dans le dossier `/backend/src/config/config.ts` et changer le Nom de la database et les identifiants (username et mot de passe)

**Commandes pour lancer le projet :**
```
# Frontend
cd frontend
ng serve

# Backend
cd backend
npx tsc && node dist/index.js
```

---
## Commandes Git de base

**1. Récupérer les dernières modifications (avant de commencer à travailler) :**
```
git checkout develop       # Assure-toi d'être sur la branche 'develop'
git pull origin develop     # Récupérer les dernières modifications de la branche 'develop'
```

2. **Faire tes changements (éditer le code)** : : Tu fais tes modifications dans les fichiers nécessaires (par exemple, dans `frontend/` ou `backend/`).
3. **Ajouter les fichiers modifiés pour le commit :**
```
git add .   # Ajoute tous les fichiers modifiés
# OU
git add <nom-du-fichier>  # Pour ajouter un fichier spécifique
```
4. **Valider les modifications avec un commit :**
```
git commit -m "Description des changements effectués"
```
5. **Pousser tes changements sur GitHub :** Une fois ton commit effectué, tu pousses les changements sur la branche `develop` :
```
git push origin develop
```

---

## Tables 

### 1. Table `users`

**Champs :**
- `user_id` (PK) : Identifiant unique de l'utilisateur.
- `username` : Nom d'utilisateur ou email.
- `password` : Mot de passe hashé.

---

### 2. Table `accounts`
- Représente les comptes financiers (par ex. "Vacances", "Compte courant", "Épargne").

**Champs :**
- `account_id` (PK) : Identifiant unique du compte.
- `account_name` : Nom du compte.
- `account_type` : Type de compte (`courant`, `épargne`, etc.).
- `balance` : Solde du compte
- `user_id` (FK vers `users`) : Utilisateur propriétaire du compte.

----
### 3. Table `transactions`
- Représente chaque dépense ou revenu.

**Champs :**
- `transaction_id` (PK) : Identifiant unique de la transaction.
- `amount` : Montant (positif pour un revenu, négatif pour une dépense).
- `description` : Description courte (ex. "Restaurant").
- `category` : Catégorie de la transaction (`Alimentation`, `Transport`, `Shopping`, etc.).
- `account_id` (FK vers `accounts`) : Compte associé à la transaction.
- `user_id` (FK vers `users`) : Propriétaire de la transaction (utile si plusieurs utilisateurs gèrent des comptes différents).
- `date` : Date et heure de la transaction.

---

# Plan étape par étape 

## Phase 1 : Préparation (2h à 3h) ✅

#### 1. Initialisation du projet ✅

- Crée un repository GitHub avec deux dossiers :
    - `frontend/` (pour Angular).
    - `backend/` (pour NodeJS).
- Ajoute un fichier `.gitignore` pour exclure :
    - `node_modules/` pour le frontend et backend.

#### 2. Choix des outils ✅

- **Frontend : Angular**
- **Backend : NodeJS avec Express et Sequelize**
	- Crée une structure simple :
		- `src/`: Pour le code TypeScript.
		- `src/config`: Pour les fichiers de configuration.
		- `src/models`: Pour les modèles Sequelize.
		- `src/routes`: Pour les routes REST.
* **Base de données : PostgreSQL**
	- Prépare une base PostgreSQL locale nommée `expense_trackerdb` avec un utilisateur et un mot de passe simple.
	- Crée les tables de base dans la base de données avec Sequelize.


## Phase 2 : Back-end 

### 1. Configuration de Sequelize ✅
- Créer un fichier de configuration `src/config/config.ts` pour connecter Sequelize à PostgreSQL.
### 2. Créer les modèles Sequelize ✅
- Créer les modèles **User**, **Account** et **Transaction** dans `src/models/` pour définir les tables et leurs relations.
### 3. Créer les Routes REST avec Express ✅

**API CRUD pour `users`, `accounts`, et `transactions`** :
- Crée des routes simples pour chaque ressource :
	- `/users` : POST pour créer un utilisateur, GET pour récupérer les utilisateurs.
	- `/accounts` : POST pour créer un compte, GET pour lister les comptes.
	- `/transactions` : POST pour créer une transaction, GET pour récupérer les transactions.
Utiliser Express pour définir les routes et Sequelize pour interagir avec la base de données.

Pour lancer : 
```
cd backend
npx tsc && node dist/index.js
```

### 4. Swagger (OpenAPI) - Documentation de l'API 🛑

- **Installer Swagger** pour la documentation automatique de l'API :
    - Installe `swagger-ui-express` et `swagger-jsdoc` :
```
npm install swagger-ui-express swagger-jsdoc
```

- Crée un fichier de configuration Swagger (`swagger.ts` ou `swagger.json`) pour définir les informations de base de l'API (titre, description, version).
- Ajoute les annotations Swagger dans tes routes Express pour générer la documentation automatiquement.
- Configure Swagger dans ton application Express pour qu'il génère et serve la documentation de l'API via un endpoint comme `/api-docs`.
- Exemple d'intégration avec une route Express :
```
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Expenses Tracker API',
            description: 'API for managing user expenses',
            version: '1.0.0'
        }
    },
    apis: ['./src/routes/*.ts'], // Spécifie le dossier des routes
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

Tu pourras maintenant accéder à la documentation de ton API via l'URL `/api-docs` dans ton application Express.

## Phase 3 : Frontend Minimal (4h à 5h)

### 1. Configuration du projet Angular

- **Création du projet** Angular dans le dossier `frontend/` avec Angular CLI.
- **Installation des dépendances** nécessaires :
    - `ag-grid-angular` pour afficher les transactions.
    - `highcharts` pour afficher les graphiques.

### 2. Composants principaux

- **`LoginComponent`** : Créer un composant pour le formulaire de connexion (pas de logique de session pour l'instant, juste un formulaire).
- **`DashboardComponent`** : Créer un composant pour afficher le tableau des transactions avec Ag-Grid et un graphique avec HighCharts.
- **`TransactionFormComponent`** : Créer un formulaire pour ajouter des transactions.

### 3. Communication avec le Backend

- **Services Angular** : Créer un service Angular pour gérer la communication avec l'API REST du backend.
    - Utiliser `HttpClient` pour envoyer des requêtes GET/POST vers les routes backend (`/transactions`, `/accounts`).
    - Gérer la logique de récupération des transactions et d'affichage des données dans le tableau.

### 4. Affichage des données

- **Ag-Grid** : Utiliser Ag-Grid pour afficher les transactions sous forme de tableau.
    - Afficher les champs principaux comme `amount`, `description`, `category`, `account_name`.
- **HighCharts** : Utiliser HighCharts pour afficher un graphique circulaire ou à barres représentant la répartition des dépenses par catégorie.

---

## Phase 4 : Fonctionnalités Avancées (3h à 4h)

### 1. WebSocket pour Mises à Jour en Temps Réel

- **Mise à jour en temps réel des graphiques et du tableau** : Utilise WebSocket pour notifier le frontend dès qu'une nouvelle transaction est ajoutée.
    - Installe et configure un serveur WebSocket dans le backend.
    - Envoie une notification au frontend lorsqu'une transaction est créée afin de mettre à jour les données en temps réel.

### 2. Auto-complétion pour les catégories

- **Implémentation de l'auto-complétion** dans le formulaire d'ajout de transaction pour les catégories (par exemple, afficher les catégories déjà existantes lors de la saisie).
    - Utiliser un champ de recherche ou un composant comme **Angular Material Autocomplete** pour implémenter cette fonctionnalité.

---

