"""Linha de comando da captação: python -m devstarter_leads <comando>."""
import argparse
import time

from . import config, db, enriquecimento, prototipos, publicacao, relatorio, rfb


def _lista(valor: str) -> list[str]:
    return [v.strip() for v in valor.split(",") if v.strip()]


def main() -> None:
    p = argparse.ArgumentParser(prog="devstarter_leads", description="Captação de leads da DevStarter")
    sub = p.add_subparsers(dest="comando", required=True)

    b = sub.add_parser("baixar", help="baixa a base de CNPJ da Receita (a mais recente por padrão)")
    b.add_argument("--competencia", help="mês da base, ex.: 2026-10")

    i = sub.add_parser("importar", help="filtra a base por nicho e região e grava os leads")
    i.add_argument("--competencia")
    i.add_argument("--nichos", type=_lista, default=["transportadoras"], help=f"opções: {', '.join(config.NICHOS)}")
    i.add_argument("--uf", default=config.UF_PADRAO)
    i.add_argument("--ddd", type=_lista, default=list(config.DDDS_PADRAO), help="ex.: 14 ou 14,18")

    e = sub.add_parser("enriquecer", help="valida e-mails, avalia sites e classifica a oportunidade")
    e.add_argument("--nicho", default="transportadoras")
    e.add_argument("--limite", type=int)
    e.add_argument("--refazer", action="store_true", help="reavalia também os leads já enriquecidos")

    r = sub.add_parser("resumo", help="mostra os números dos leads")
    r.add_argument("--nicho")

    x = sub.add_parser("exportar", help="exporta os leads para CSV (abre no Excel)")
    x.add_argument("--nicho", default="transportadoras")
    x.add_argument("--saida", default=str(config.DATA_DIR / "leads.csv"))
    x.add_argument("--oportunidade", type=_lista, help="ex.: sem_site_provavel,site_fora_do_ar,site_fraco")

    g = sub.add_parser("prototipos", help="gera os dados dos protótipos de site dos leads escolhidos")
    g.add_argument("--nicho", default="transportadoras")
    g.add_argument("--oportunidade", type=_lista, default=["site_fora_do_ar", "site_fraco"])
    g.add_argument("--dias", type=int, default=45, help="por quantos dias o protótipo fica no ar")
    g.add_argument("--limite", type=int)
    g.add_argument("--refazer", action="store_true", help="apaga e gera de novo os protótipos ainda não enviados")

    sub.add_parser("publicar", help="envia os protótipos gerados para o Supabase (lidos pelo site)")

    args = p.parse_args()
    inicio = time.monotonic()
    if args.comando == "baixar":
        print(f"Base {rfb.baixar(args.competencia)} baixada em {config.RFB_DIR}")
    elif args.comando == "publicar":
        print(publicacao.publicar())
    else:
        conn = db.conectar()
        if args.comando == "importar":
            desconhecidos = set(args.nichos) - set(config.NICHOS)
            if desconhecidos:
                p.error(f"nicho desconhecido: {', '.join(desconhecidos)}")
            print(rfb.importar(conn, args.competencia, args.nichos, args.uf, args.ddd))
        elif args.comando == "enriquecer":
            print(enriquecimento.enriquecer(conn, args.nicho, args.limite, args.refazer))
        elif args.comando == "resumo":
            relatorio.resumo(conn, args.nicho)
        elif args.comando == "prototipos":
            if args.refazer:
                print(f"{prototipos.descartar_nao_enviados(conn, args.nicho)} protótipos não enviados descartados")
            print(prototipos.gerar(conn, args.nicho, args.oportunidade, args.dias, args.limite))
        elif args.comando == "exportar":
            n = relatorio.exportar(conn, args.saida, args.nicho, args.oportunidade)
            print(f"{n} leads exportados para {args.saida}")
    print(f"Tempo: {time.monotonic() - inicio:.0f}s")


if __name__ == "__main__":
    main()
