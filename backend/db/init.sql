-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL
);

-- Création de la table aliments
CREATE TABLE IF NOT EXISTS aliments (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) UNIQUE NOT NULL,
    glucide FLOAT NOT NULL,
    proteine FLOAT NOT NULL,
    lipide FLOAT NOT NULL,
    kcal FLOAT NOT NULL
);

-- Création de la table recettes
CREATE TABLE IF NOT EXISTS recettes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Création de la table pivot recettes_aliments
CREATE TABLE IF NOT EXISTS recettes_aliments (
    id SERIAL PRIMARY KEY,
    recette_id INTEGER NOT NULL,
    aliment_id INTEGER NOT NULL,
    poids FLOAT NOT NULL,
    FOREIGN KEY (recette_id) REFERENCES recettes(id) ON DELETE CASCADE,
    FOREIGN KEY (aliment_id) REFERENCES aliments(id) ON DELETE CASCADE
);

-- Insertion de données de test
INSERT INTO users (nom, prenom, mail) VALUES
    ('Doe', 'John', 'john.doe@example.com'),
    ('Doe', 'Jane', 'jane.doe@example.com')
ON CONFLICT (mail) DO NOTHING;

INSERT INTO aliments (nom, glucide, proteine, lipide, kcal) VALUES
    ('Riz blanc cuit', 28.2, 2.7, 0.3, 130),
    ('Poulet (blanc)', 0, 31, 3.6, 165),
    ('Oeuf', 0.7, 13, 11, 155)
ON CONFLICT (nom) DO NOTHING;
