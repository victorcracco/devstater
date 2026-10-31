"""Linha de comando da captação: python -m devstarter_leads <comando>."""
import argparse
import time

from . import config, db, enriquecimento, envio, prototipos, publicacao, relatorio, respostas, rfb


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

    a = sub.add_parser("aprovar", help="libera protótipos para envio (nada sai sem aprovação)")
    a.add_argument("--slugs", type=_lista)
    a.add_argument("--oportunidade", type=_lista)
    a.add_argument("--todos", action="store_true", help="aprova todos os protótipos ainda não aprovados")

    v = sub.add_parser("previa", help="mostra o e-mail que seria enviado para um protótipo")
    v.add_argument("--slug", required=True)
    v.add_argument("--etapa", type=int, default=1, choices=(1, 2, 3))
    v.add_argument("--html", action="store_true", help="mostra a versão HTML em vez do texto puro")

    c = sub.add_parser("ciclo", help="lê respostas, envia no máximo um e-mail e publica (roda pelo cron)")
    c.add_argument("--simular", action="store_true", help="mostra o que faria, sem enviar nem publicar")

    t = sub.add_parser("testar", help="confere as credenciais do Zoho e pode mandar um e-mail de teste")
    t.add_argument("--para", help="endereço que recebe o e-mail de teste; sem ele, só confere o login")

    sub.add_parser("respostas", help="lê agora as respostas novas da caixa de entrada")
    sub.add_parser("situacao", help="fila, envios, respostas e pausa")
    pa = sub.add_parser("pausar", help="para todos os envios até 'retomar'")
    pa.add_argument("--motivo", default="pausado manualmente")
    sub.add_parser("retomar", help="libera os envios depois de uma pausa")
    d = sub.add_parser("descadastrar", help="bloqueia um e-mail para sempre")
    d.add_argument("--email", required=True)

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
        elif args.comando == "aprovar":
            if not (args.slugs or args.oportunidade or args.todos):
                p.error("diga o que aprovar: --slugs, --oportunidade ou --todos")
            print(f"{envio.aprovar(conn, args.slugs, args.oportunidade)} protótipos aprovados para envio")
        elif args.comando == "previa":
            print(envio.previa(conn, args.slug, args.etapa, args.html))
        elif args.comando == "ciclo":
            print(envio.ciclo(conn, args.simular))
        elif args.comando == "testar":
            print(envio.testar(conn, args.para))
        elif args.comando == "respostas":
            print(respostas.processar(conn))
        elif args.comando == "situacao":
            print(envio.situacao(conn))
        elif args.comando == "pausar":
            db.gravar_controle(conn, "pausado", args.motivo)
            print("Envios pausados")
        elif args.comando == "retomar":
            db.gravar_controle(conn, "pausado", None)
            print("Envios liberados")
        elif args.comando == "descadastrar":
            with conn:
                conn.execute(
                    "INSERT OR IGNORE INTO descadastros (email, motivo) VALUES (?, 'manual')", (args.email.lower(),)
                )
                conn.execute(
                    "UPDATE leads SET status = 'descadastrado', atualizado_em = datetime('now') WHERE email = ?",
                    (args.email.lower(),),
                )
            print(f"{args.email} bloqueado")
    print(f"Tempo: {time.monotonic() - inicio:.0f}s")


if __name__ == "__main__":
    main()
