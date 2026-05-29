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
            cursor.execute(
                f"INSERT INTO {table} ({columns}) VALUES ({placeholders})",
                tuple(row)
            )
            inserted += 1
    conn.commit()
    print(f"{inserted} ligne(s) insérée(s) dans {table}.")
