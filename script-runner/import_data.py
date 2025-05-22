import sqlite3
import pandas as pd
import os

DB_PATH = "/data/sales.db"

def insert_if_not_exists(conn, table, df, unique_fields):
    cursor = conn.cursor()
    inserted = 0
    for _, row in df.iterrows():
        where_clause = " AND ".join([f"{col}=?" for col in unique_fields])
        values = tuple(row[col] for col in unique_fields)
        cursor.execute(f"SELECT 1 FROM {table} WHERE {where_clause}", values)
        if cursor.fetchone() is None:
            placeholders = ", ".join(["?"] * len(row))
            columns = ", ".join(row.index)
            sql = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
            cursor.execute(sql, tuple(row))
            inserted += 1
    conn.commit()
    print(f"{inserted} ligne(s) insérée(s) dans {table}.")

conn = sqlite3.connect(DB_PATH)

# Liste des fichiers pour vérification
print("Fichiers présents dans le conteneur :")
print(os.listdir("."))

# PRODUITS
try:
    df_produits = pd.read_csv("produits.csv")
    df_produits = df_produits.rename(columns={
        "ID Référence produit": "ref",
        "Nom": "nom",
        "Prix": "prix"
    })[["ref", "nom", "prix"]]
    df_produits["ref"] = df_produits["ref"].str.strip().str.upper()
    insert_if_not_exists(conn, "produits", df_produits, ["ref"])
except Exception as e:
    print(f"Erreur import produits.csv : {e}")

# MAGASINS
try:
    df_magasins = pd.read_csv("magasins.csv")
    df_magasins = df_magasins.rename(columns={
        "ID Magasin": "id",
        "Ville": "ville"
    })[["id", "ville"]]
    df_magasins["id"] = df_magasins["id"].astype(int)
    insert_if_not_exists(conn, "magasins", df_magasins, ["id"])
except Exception as e:
    print(f"Erreur import magasins.csv : {e}")

# VENTES
try:
    df_ventes = pd.read_csv("ventes.csv")
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