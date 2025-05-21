# init_db.py

import sqlite3
from pathlib import Path

DB_PATH = "/data/sales.db"

# Assure que le dossier existe
Path("/data").mkdir(parents=True, exist_ok=True)

# Connexion à la base de données
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Création des tables
cursor.executescript("""
CREATE TABLE IF NOT EXISTS produits (
    ref TEXT PRIMARY KEY,
    nom TEXT,
    prix REAL
);

CREATE TABLE IF NOT EXISTS magasins (
    id INTEGER PRIMARY KEY,
    ville TEXT
);

CREATE TABLE IF NOT EXISTS ventes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    produit_ref TEXT,
    quantite INTEGER,
    magasin_id INTEGER,
    FOREIGN KEY (produit_ref) REFERENCES produits(ref),
    FOREIGN KEY (magasin_id) REFERENCES magasins(id)
);

CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_analyse TEXT,
    resultat TEXT,
    date_execution TEXT DEFAULT CURRENT_TIMESTAMP
);
""")

conn.commit()
conn.close()

print("✅ Base de données initialisée avec succès.")