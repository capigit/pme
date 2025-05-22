import sqlite3
import json

DB_PATH = "/data/sales.db"
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# 1. Chiffre d'affaires total
cursor.execute("""
SELECT SUM(p.prix * v.quantite) AS chiffre_affaires
FROM ventes v
JOIN produits p ON v.produit_ref = p.ref;
""")
total_ca = cursor.fetchone()[0] or 0

# 2. Chiffre d'affaires par produit
cursor.execute("""
SELECT p.nom, SUM(p.prix * v.quantite) AS ca
FROM ventes v
JOIN produits p ON v.produit_ref = p.ref
GROUP BY p.nom;
""")
ca_par_produit = dict(cursor.fetchall())

# 3. Chiffre d'affaires par ville
cursor.execute("""
SELECT m.ville, SUM(p.prix * v.quantite) AS ca
FROM ventes v
JOIN produits p ON v.produit_ref = p.ref
JOIN magasins m ON v.magasin_id = m.id
GROUP BY m.ville;
""")
ca_par_ville = dict(cursor.fetchall())

# 4. Stockage des résultats dans la table analyses
cursor.execute("""
INSERT INTO analyses (type_analyse, resultat) VALUES (?, ?)
""", ("chiffre_affaires_total", json.dumps({"total": total_ca})))

cursor.execute("""
INSERT INTO analyses (type_analyse, resultat) VALUES (?, ?)
""", ("chiffre_affaires_par_produit", json.dumps(ca_par_produit)))

cursor.execute("""
INSERT INTO analyses (type_analyse, resultat) VALUES (?, ?)
""", ("chiffre_affaires_par_ville", json.dumps(ca_par_ville)))

conn.commit()
conn.close()

print("Analyses enregistrées avec succès.")