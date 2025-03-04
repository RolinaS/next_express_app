import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, '../public')));

// Routes API
app.use('/api', routes);

// Route par défaut pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
