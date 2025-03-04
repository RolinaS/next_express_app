# Base image
FROM node:20-alpine

# Créer le répertoire de l'application
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (y compris devDependencies)
RUN npm install

# Copier le reste des fichiers
COPY . .

# Créer les dossiers nécessaires
RUN mkdir -p dist public

# Exposer le port
EXPOSE 3000

# Commande de démarrage en développement avec hot reload
CMD ["npm", "run", "dev"]
