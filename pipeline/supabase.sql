-- Aplicado no projeto Supabase "devstarter" (ckxgzlkzvdwbopauerco) como migração "prototipos".
-- Protótipos de site gerados pelo pipeline e exibidos em devstarter.com.br/p/[slug].
create table public.prototipos (
  slug text primary key,
  nicho text not null,
  dados jsonb not null,
  expira_em date not null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

-- Sem políticas: ninguém lista a tabela pela API; o acesso é só pelas funções abaixo
alter table public.prototipos enable row level security;

-- Hash do token do pipeline (PIPELINE_TOKEN no .env do servidor), fora do schema exposto pela API
create schema privado;
revoke all on schema privado from public;
create table privado.chaves (
  nome text primary key,
  hash text not null
);

-- Leitura pelo site: só quem já tem o slug recebe os dados daquele protótipo
create function public.buscar_prototipo(p_slug text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select dados from public.prototipos where slug = p_slug;
$$;
revoke all on function public.buscar_prototipo(text) from public;
grant execute on function public.buscar_prototipo(text) to anon, authenticated;

-- Escrita pelo pipeline, autenticada pelo token guardado no servidor. Com p_sincronizar, apaga
-- os protótipos que o pipeline descartou (migração "prototipos_sincronizar")
create function public.publicar_prototipos(p_token text, p_linhas jsonb, p_sincronizar boolean default false)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  total integer;
begin
  if not exists (
    select 1 from privado.chaves
    where nome = 'pipeline'
      and hash = encode(sha256(convert_to(p_token, 'UTF8')), 'hex')
  ) then
    raise exception 'token inválido' using errcode = '28000';
  end if;

  if p_sincronizar then
    delete from public.prototipos
    where slug not in (select l->>'slug' from jsonb_array_elements(p_linhas) as l);
  end if;

  insert into public.prototipos (slug, nicho, dados, expira_em, atualizado_em)
  select l->>'slug', l->>'nicho', l, (l->>'expiraEm')::date, now()
  from jsonb_array_elements(p_linhas) as l
  on conflict (slug) do update
    set nicho = excluded.nicho,
        dados = excluded.dados,
        expira_em = excluded.expira_em,
        atualizado_em = now();

  get diagnostics total = row_count;
  return total;
end;
$$;
revoke all on function public.publicar_prototipos(text, jsonb, boolean) from public;
grant execute on function public.publicar_prototipos(text, jsonb, boolean) to anon, authenticated;
