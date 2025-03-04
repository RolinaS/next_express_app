import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { initDatabase } from './config/database';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(helmet({
  contentSecurityPolicy: false // Désactiver pour le développement
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Routes API
app.use('/api', routes);

// Route par défaut pour servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route de test API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement' });
});

// Gestion des erreurs
app.use(errorHandler);

// Initialisation de la base de données et démarrage du serveur
const startServer = async () => {
  try {
    await initDatabase();
    
    app.listen(port, () => {
      console.log(`🚀 Serveur démarré sur le port ${port}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 Routes disponibles:`);
      console.log(`   - GET /api/test`);
      console.log(`   - GET /api/health`);
      console.log(`   - GET /api/users`);
      console.log(`   - GET /api/aliments`);
      console.log(`   - GET /api/recettes`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();
