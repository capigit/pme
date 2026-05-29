-- Requête 1 : Chiffre d'affaires total
SELECT 
    SUM(p.prix * v.quantite) AS chiffre_affaires_total
FROM 
    ventes v
JOIN 
    produits p ON v.produit_ref = p.ref;

-- Requête 2 : Chiffre d'affaires par produit
SELECT 
    p.nom AS produit,
    SUM(p.prix * v.quantite) AS chiffre_affaires
FROM 
    ventes v
JOIN 
    produits p ON v.produit_ref = p.ref
GROUP BY 
    p.nom;

-- Requête 3 : Chiffre d'affaires par ville
SELECT 
    m.ville,
    SUM(p.prix * v.quantite) AS chiffre_affaires
FROM 
    ventes v
JOIN 
    produits p ON v.produit_ref = p.ref
JOIN 
    magasins m ON v.magasin_id = m.id
GROUP BY 
    m.ville;