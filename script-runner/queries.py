import sqlite3
from config import DB_PATH


def get_report_data():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT SUM(p.prix * v.quantite)
        FROM ventes v JOIN produits p ON v.produit_ref = p.ref
    """)
    total = round(cursor.fetchone()[0], 2)

    cursor.execute("""
        SELECT p.nom, SUM(p.prix * v.quantite)
        FROM ventes v JOIN produits p ON v.produit_ref = p.ref
        GROUP BY p.nom
    """)
    par_produit = {nom: round(ca, 2) for nom, ca in cursor.fetchall()}

    cursor.execute("""
        SELECT m.ville, SUM(p.prix * v.quantite)
        FROM ventes v
        JOIN produits p ON v.produit_ref = p.ref
        JOIN magasins m ON v.magasin_id = m.id
        GROUP BY m.ville
    """)
    par_ville = {ville: round(ca, 2) for ville, ca in cursor.fetchall()}

    conn.close()
    return {
        "chiffre_affaires_total": total,
        "par_produit": par_produit,
        "par_ville": par_ville,
    }
