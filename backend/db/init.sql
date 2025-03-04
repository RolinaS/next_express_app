-- Création de la base de données
CREATE DATABASE app_db;

-- Création de la table users (utilisateurs)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL
);

-- Création de la table aliments (table des aliments avec leurs valeurs nutritionnelles)
CREATE TABLE aliments (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) UNIQUE NOT NULL,
    glucide FLOAT NOT NULL DEFAULT 0,
    proteine FLOAT NOT NULL DEFAULT 0,
    lipide FLOAT NOT NULL DEFAULT 0,
    kcal FLOAT NOT NULL DEFAULT 0
);

-- Création de la table recettes (table des recettes associées aux utilisateurs)
CREATE TABLE recettes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Création de la table pivot recettes_aliments (association entre les recettes et les aliments)
CREATE TABLE recettes_aliments (
    id SERIAL PRIMARY KEY,
    recette_id INT NOT NULL,
    aliment_id INT NOT NULL,
    poids FLOAT NOT NULL CHECK (poids > 0),
    FOREIGN KEY (recette_id) REFERENCES recettes(id) ON DELETE CASCADE,
    FOREIGN KEY (aliment_id) REFERENCES aliments(id) ON DELETE CASCADE,
    UNIQUE (recette_id, aliment_id) -- Empêche la duplication des aliments dans une même recette
);

-- Insertion de quelques données de test
INSERT INTO users (nom, prenom, mail) VALUES 
('Doe', 'John', 'john.doe@example.com'),
('Dupont', 'Marie', 'marie.dupont@example.com');

INSERT INTO aliments (nom, glucide, proteine, lipide, kcal) VALUES 
('Pomme', 12, 0.3, 0.2, 52),
('Poulet', 0, 27, 3.6, 165),
('Riz', 28, 2.7, 0.3, 130);

INSERT INTO recettes (user_id) VALUES 
(1), (2);

INSERT INTO recettes_aliments (recette_id, aliment_id, poids) VALUES 
(1, 1, 150), -- Recette 1 : 150g de Pomme
(1, 2, 200), -- Recette 1 : 200g de Poulet
(2, 3, 100); -- Recette 2 : 100g de Riz

-- Vérification des données insérées
SELECT * FROM users;
SELECT * FROM aliments;
SELECT * FROM recettes;
SELECT * FROM recettes_aliments;
