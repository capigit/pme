import sqlite3
import pandas as pd
import os
from config import DB_PATH
from db_utils import insert_if_not_exists

conn = sqlite3.connect(DB_PATH)

print("Fichiers présents dans le conteneur :")
print(os.listdir("."))

try:
    df_produits = pd.read_csv("data/produits.csv")
    df_produits = df_produits.rename(columns={
        "ID Référence produit": "ref",
        "Nom": "nom",
        "Prix": "prix"
    })[["ref", "nom", "prix"]]
    df_produits["ref"] = df_produits["ref"].str.strip().str.upper()
    insert_if_not_exists(conn, "produits", df_produits, ["ref"])
except Exception as e:
    print(f"Erreur import produits.csv : {e}")

try:
    df_magasins = pd.read_csv("data/magasins.csv")
    df_magasins = df_magasins.rename(columns={
        "ID Magasin": "id",
        "Ville": "ville"
    })[["id", "ville"]]
    df_magasins["id"] = df_magasins["id"].astype(int)
    insert_if_not_exists(conn, "magasins", df_magasins, ["id"])
except Exception as e:
    print(f"Erreur import magasins.csv : {e}")

try:
    df_ventes = pd.read_csv("data/ventes.csv")
    df_ventes = df_ventes.rename(columns={
        "Date": "date",
        "ID Référence produit": "produit_ref",
        "Quantité": "quantite",
        "ID Magasin": "magasin_id"
    })[["date", "produit_ref", "quantite", "magasin_id"]]
    df_ventes["produit_ref"] = df_ventes["produit_ref"].str.strip().str.upper()
    df_ventes["magasin_id"] = df_ventes["magasin_id"].astype(int)
    insert_if_not_exists(conn, "ventes", df_ventes, ["date", "produit_ref", "magasin_id"])
except Exception as e:
    print(f"Erreur import ventes.csv : {e}")

conn.close()
print("Importation terminée.")
