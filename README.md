# Expense_Tracker

**Télécharger le projet :**
```
https://github.com/NathanielSlw/Expense_Tracker.git
cd Expense_Tracker
```

Commandes pour lancer le projet :
```
# Frontend
cd frontend
ng serve

# Backend
cd backend
npm run start
```

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

## Langages utilisées 

- **Frontend :** Angular avec une page listant les dépenses dans un tableau (ag-grid) et un graphique montrant la répartition des dépenses par catégorie (HighCharts).
- **Backend :** NodeJS avec PostgreSQL pour gérer les dépenses et les catégories.
- **Features avancées :**
    - **WebSocket :** Mise à jour en temps réel des graphiques si une nouvelle dépense est ajoutée.
- **Atouts :**
    - Concept simple avec des fonctionnalités réutilisables.
    - Parfait pour illustrer une application de gestion.

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

# Plan étape par étape 

## Phase 1 : Préparation (2h à 3h)

### 1. Initialisation du projet

- Crée un repository GitHub avec deux dossiers :
    - `frontend/` (pour Angular).
    - `backend/` (pour NodeJS ou Spring Boot).
- Ajoute un fichier `.gitignore` pour exclure :
    - `node_modules/` pour le frontend et backend.
    - `target/` si tu choisis Spring Boot.

### 2. Choix des outils

- **Frontend : Angular**
    - Installe Angular CLI (`npm install -g @angular/cli`).
    - Crée le projet Angular dans le dossier `frontend`.
        `ng new frontend`
- **Backend : NodeJS avec Express et TypeORM**
    - Initialise le backend avec TypeScript :
        `mkdir backend && cd backend npm init -y npm install express typeorm reflect-metadata pg typescript @types/express npx tsc --init`
    - Crée une structure simple avec :
        - `src/` : Pour le code TypeScript.
        - `ormconfig.json` : Configuration TypeORM.
- **Base de données : PostgreSQL**
    - Prépare une base PostgreSQL locale nommée `expenses_tracker` avec un utilisateur et un mot de passe simple.
    - Crée les tables de base dans la DB (cf. modèle des tables précédemment discuté).

---

## Phase 2 : Backend Minimal (4h à 5h)

### 1. Configuration

- Configure TypeORM avec `ormconfig.json` :

### 2. Créer les entités
- **`users`**, **`accounts`**, et **`transactions`** sous `src/entity/`.

### 3. Créer les routes REST
- Mets en place des routes CRUD simples avec Express :
    - **`/users`** : Créer un utilisateur, récupérer la liste.
    - **`/accounts`** : Ajouter des comptes, lister les comptes.
    - **`/transactions`** :
        - Ajouter une transaction.
        - Lister les transactions par utilisateur.

### 4. Swagger (OpenAPI)

- Installe `swagger-ui-express` pour documenter les API.
    `npm install swagger-ui-express`
- Ajoute une documentation simple pour chaque endpoint.

---

## Phase 3 : Frontend Minimal (4h à 5h)

### 1. Configuration et structure

- Configure Angular dans le dossier `frontend/`.
- Ajoute les bibliothèques nécessaires :
    - `ag-grid-angular` pour le tableau des transactions.
    - `highcharts` pour les graphiques.

### 2. Composants Angular

- Crée les composants principaux :
    - **`LoginComponent` :** Formulaire de connexion simple.
    - **`DashboardComponent` :** Tableau de bord avec le tableau des dépenses et le graphique.
    - **`TransactionFormComponent` :** Formulaire pour ajouter une transaction.

### 3. Communication avec le Backend

- Installe `@angular/common/http` et configure un service Angular pour appeler les endpoints REST (`/transactions`, `/accounts`).

### 4. Affichage minimal
- Utilise **Ag-Grid** pour afficher la liste des transactions.
- Utilise **HighCharts** pour afficher la répartition des transactions par catégorie (requête SQL `GROUP BY`).

---

## Phase 4 : Fonctionnalités avancées (3h à 4h)

### 1. WebSocket pour mises à jour en temps réel

- Installe `ws` côté backend :
    `npm install ws`
- Configure un WebSocket pour notifier le frontend en cas de nouvelle transaction.

### 2. Auto-complétion pour les catégories

- Implémente une recherche avec auto-complétion sur les catégories dans le formulaire d’ajout de transaction.
