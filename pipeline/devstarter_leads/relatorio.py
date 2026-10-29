"""Resumo e exportação dos leads."""
import csv

COLUNAS_EXPORTACAO = (
    "cnpj", "razao_social", "nome_fantasia", "municipio", "bairro", "telefone1", "email",
    "email_tipo", "oportunidade", "motivos", "site_url", "site_ano", "site_plataforma",
    "site_instagram", "porte", "capital_social", "data_inicio", "cnae_descricao",
)


def resumo(conn, nicho: str | None = None) -> None:
    filtro, params = ("WHERE nicho = ?", (nicho,)) if nicho else ("", ())
    total = conn.execute(f"SELECT COUNT(*) FROM leads {filtro}", params).fetchone()[0]
    print(f"Leads{f' ({nicho})' if nicho else ''}: {total}")
    for coluna in ("oportunidade", "email_tipo", "porte", "municipio"):
        print(f"\nPor {coluna}:")
        linhas = conn.execute(
            f"SELECT COALESCE({coluna}, '(sem)'), COUNT(*) FROM leads {filtro}"
            " GROUP BY 1 ORDER BY 2 DESC LIMIT 15",
            params,
        )
        for valor, n in linhas:
            print(f"  {valor:<28} {n:>6}")


def exportar(conn, caminho: str, nicho: str, oportunidades: list[str] | None = None) -> int:
    sql = f"SELECT {', '.join(COLUNAS_EXPORTACAO)} FROM leads WHERE nicho = ?"
    params = [nicho]
    if oportunidades:
        sql += f" AND oportunidade IN ({', '.join('?' * len(oportunidades))})"
        params += oportunidades
    linhas = conn.execute(sql + " ORDER BY oportunidade, municipio, razao_social", params).fetchall()
    # utf-8 com BOM e ';' para abrir direto no Excel em português
    with open(caminho, "w", newline="", encoding="utf-8-sig") as f:
        escritor = csv.writer(f, delimiter=";")
        escritor.writerow(COLUNAS_EXPORTACAO)
        escritor.writerows(linhas)
    return len(linhas)
