@AGENTS.md

## Só para o Claude

O `AGENTS.md` foi escrito para o Codex. O Claude segue as mesmas regras, com estas diferenças:

- **Pode mexer em `pipeline/` e `app/(dev)/`** quando for pedido. O pipeline está em produção: use a skill `devstarter-operacao` antes de tocar no servidor e a `devstarter-email` antes de mudar um e-mail.
- **Não precisa da branch `codex/`.** Commit e push só com pedido explícito, e nunca inclua `app/(dev)/components/SignatureElement.tsx` nem `.claude/`.
- **Ao revisar um PR do Codex**, use `devstarter-qa-visual` e `devstarter-revisar-nicho` antes de aprovar.

As skills de `.agents/skills/` chegam ao Claude por atalhos em `.claude/skills/`, que ficam fora do Git. Se não aparecerem, recrie-os com `powershell -File scripts/ligar-skills-claude.ps1`.
