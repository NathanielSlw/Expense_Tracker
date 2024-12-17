"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
// Initialise Express
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Synchronisation avec la base de données
config_1.default.sync({ force: false }).then(() => {
    console.log('Database synced');
});
// Démarre le serveur Express
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
