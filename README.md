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