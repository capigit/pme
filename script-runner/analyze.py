import sqlite3
import json
from config import DB_PATH
from queries import get_report_data

data = get_report_data()

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute(
    "INSERT INTO analyses (type_analyse, resultat) VALUES (?, ?)",
    ("chiffre_affaires_total", json.dumps({"total": data["chiffre_affaires_total"]}))
)
cursor.execute(
    "INSERT INTO analyses (type_analyse, resultat) VALUES (?, ?)",
    ("chiffre_affaires_par_produit", json.dumps(data["par_produit"]))
)
cursor.execute(
    "INSERT INTO analyses (type_analyse, resultat) VALUES (?, ?)",
    ("chiffre_affaires_par_ville", json.dumps(data["par_ville"]))
)

conn.commit()
conn.close()
print("Analyses enregistrées avec succès.")
