import sqlite3
import json

DB_PATH = "/data/sales.db"
OUTPUT_JSON = "/data/resultats.json"
OUTPUT_TXT = "/data/resultats.txt"

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

report = {}

# Requête 1 : chiffre d'affaires total
cursor.execute("""
SELECT SUM(p.prix * v.quantite) FROM ventes v
JOIN produits p ON v.produit_ref = p.ref
""")
report["chiffre_affaires_total"] = round(cursor.fetchone()[0], 2)

# Requête 2 : par produit
cursor.execute("""
SELECT p.nom, SUM(p.prix * v.quantite)
FROM ventes v
JOIN produits p ON v.produit_ref = p.ref
GROUP BY p.nom
""")
report["par_produit"] = {nom: round(ca, 2) for nom, ca in cursor.fetchall()}

# Requête 3 : par ville
cursor.execute("""
SELECT m.ville, SUM(p.prix * v.quantite)
FROM ventes v
JOIN produits p ON v.produit_ref = p.ref
JOIN magasins m ON v.magasin_id = m.id
GROUP BY m.ville
""")
report["par_ville"] = {ville: round(ca, 2) for ville, ca in cursor.fetchall()}

conn.close()

# Écriture en JSON
with open(OUTPUT_JSON, "w") as f_json:
    json.dump(report, f_json, indent=4)

# Écriture en texte lisible
with open(OUTPUT_TXT, "w") as f_txt:
    f_txt.write("Rapport d'analyse des ventes\n")
    f_txt.write(f"Chiffre d'affaires total : {report['chiffre_affaires_total']} €\n\n")

    f_txt.write("Chiffre d'affaires par produit :\n")
    for produit, ca in report["par_produit"].items():
        f_txt.write(f"  - {produit} : {ca} €\n")
    
    f_txt.write("\nChiffre d'affaires par ville :\n")
    for ville, ca in report["par_ville"].items():
        f_txt.write(f"  - {ville} : {ca} €\n")

print("Rapport généré : /data/resultats.json et /data/resultats.txt")