# laurafonseca.psi

Site de apresentação e captação de clientes da psicóloga **Laura Fonseca** — Psicóloga Clínica, CRP 05/65471, Gestalt-terapia, atendimento online e presencial em Resende-RJ.

Página única, rolagem longa, com um objetivo: a pessoa se reconhecer e mandar mensagem no WhatsApp. Não há formulário, agenda nem área logada — o primeiro contato no Brasil é mensagem, então todo botão da página leva ao WhatsApp dela com texto pré-preenchido.

## Stack

| | Escolha | Por quê |
|---|---|---|
| Framework | **Astro 7**, saída estática | Componentes com sintaxe JSX, mas **zero JavaScript no cliente**. O único `<script>` da página é o JSON-LD de SEO |
| CSS | Vanilla, um arquivo (`global.css`) | Pequeno o bastante para não justificar Tailwind |
| Fontes | Self-hosted via `@fontsource` | Velocidade e LGPD — site de saúde não deve vazar IP do visitante para o Google Fonts |
| Interatividade | `<details>` nativo no FAQ | Sem JS, acessível, funciona sem build |
| Deploy | Cloudflare Pages (ou Netlify/Vercel) | Estático, grátis, sem servidor nem adapter |


```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # gera dist/ — é isso que vai para o Cloudflare Pages
npm run preview   # serve o dist/ localmente
```

## Estrutura

```
src/
├── data/site.ts            Fonte única dos dados da Laura (nome, CRP, contatos, cidade)
├── layouts/Base.astro      <head>: title, description, canonical, Open Graph, JSON-LD, fontes, CSS
├── pages/index.astro       A página inteira; textos, FAQ e temas ficam em arrays no topo do arquivo
├── styles/global.css       Paleta, tipografia e layout de todas as seções
└── components/
    ├── Mark.astro          Marca de quatro pétalas do cartão de visitas (SVG, cor via currentColor)
    ├── Petal.astro         Uma pétala só, preenchida — marcador da lista "Você pode estar aqui se…"
    ├── WhatsButton.astro   Botão que gera o link wa.me a partir do site.ts
    └── WhatsIcon.astro
public/favicon.svg          A marca, em coral
```


## TODO — antes de publicar
- [ ] **Domínio definitivo** — registrar no Registro.br **no CPF da Laura** (`.com.br`, R$40/ano) e trocar o placeholder em `astro.config.mjs` **e** `site.ts`. **Não publicar com o placeholder:** o canonical e o JSON-LD apontariam para um domínio que não é dela. Nota: `.psi.br` é de provedor de internet, não de psicólogo — o de psicólogo é `.psc.br` (exige CPF + comprovação de CRP)

## TODO — depois de publicar

- [ ] **Google Business Profile** — "psicóloga Resende" no mapa traz mais gente que o site sozinho. Grátis
- [ ] **Sitemap e robots** — `npx astro add sitemap` depois que o domínio existir
- [ ] **Analytics sem cookie** — Cloudflare Web Analytics (grátis, dispensa banner de LGPD)
- [ ] **Open Graph image** — imagem 1200×630 para o link ficar bonito no WhatsApp, onde ele mais vai circular. Hoje não há `og:image`
- [ ] **Blog** (opcional, mas é a estratégia de SEO do nicho) — `src/content/` com Markdown; textos sobre ansiedade, Gestalt, terapia online, sempre dentro das regras do CFP

## Domínio e hospedagem

São duas coisas separadas. O site é estático (arquivos prontos, sem servidor, sem banco), então a hospedagem é grátis — só o domínio custa.

| Item | Onde | Custo |
|---|---|---|
| Domínio `.com.br` | [Registro.br](https://registro.br) — único registrador oficial de `.br` | R$ 40/ano (ou R$ 174 por 5 anos) |
| Hospedagem + CDN + SSL | Cloudflare Pages, plano gratuito | R$ 0 |

**O domínio deve ser registrado no CPF da Laura**, não no de quem está desenvolvendo. É o ativo dela; se um dia trocar de dev, ela mantém o endereço.

### Ordem de execução

1. Registrar o domínio no Registro.br (CPF dela)
2. Criar conta na Cloudflare e adicionar o domínio como *site* — ela devolve dois nameservers
3. No painel do Registro.br, trocar os servidores DNS pelos da Cloudflare (propaga em minutos a algumas horas)
4. Subir este repositório no GitHub
5. Cloudflare Pages → *Connect to Git* → build command `npm run build`, output directory `dist`, sem adapter e sem variável de ambiente
6. **Antes do build final**, trocar o domínio em `astro.config.mjs` e `src/data/site.ts`
7. Pages → *Custom domains* → adicionar o domínio; o SSL sai automático e grátis