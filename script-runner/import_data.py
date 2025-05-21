import sqlite3
import pandas as pd

DB_PATH = "/data/sales.db"

def insert_if_not_exists(cursor, table, df, unique_fields):
    for _, row in df.iterrows():
        where_clause = " AND ".join([f"{col}=?" for col in unique_fields])
        cursor.execute(f"SELECT 1 FROM {table} WHERE {where_clause}", tuple(row[col] for col in unique_fields))
        if cursor.fetchone() is None:
            placeholders = ", ".join(["?"] * len(row))
            columns = ", ".join(row.index)
            sql = f"INSERT INTO {table} ({columns}) VALUES ({placeholders})"
            cursor.execute(sql, tuple(row))

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Produits.csv
df_produits = pd.read_csv("produits.csv")
df_produits = df_produits.rename(columns={
    "ID Référence produit": "ref",
    "Nom": "nom",
    "Prix": "prix"
})[["ref", "nom", "prix"]]
insert_if_not_exists(cursor, "produits", df_produits, ["ref"])

# Magasin.csv
df_magasins = pd.read_csv("magasin.csv")
df_magasins = df_magasins.rename(columns={
    "ID Magasin": "id",
    "Ville": "ville"
})[["id", "ville"]]
insert_if_not_exists(cursor, "magasins", df_magasins, ["id"])

# Ventes.csv
df_ventes = pd.read_csv("ventes.csv")
df_ventes = df_ventes.rename(columns={
    "Date": "date",
    "ID Référence produit": "produit_ref",
    "Quantité": "quantite",
    "ID Magasin": "magasin_id"
})[["date", "produit_ref", "quantite", "magasin_id"]]
insert_if_not_exists(cursor, "ventes", df_ventes, ["date", "produit_ref", "magasin_id"])

conn.commit()
conn.close()

print("✅ Données importées sans doublons.")