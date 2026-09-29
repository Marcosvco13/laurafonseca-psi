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

Não usar: React no cliente, Tailwind, Next.js, CMS. Se um dia precisar de blog (boa estratégia de SEO para psicólogos), Astro resolve com Markdown em `src/content/` sem adicionar nada disso.

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # gera dist/ — é isso que vai para o Cloudflare Pages
npm run preview   # serve o dist/ localmente
```

## Estrutura

```
src/
├── data/site.ts            Fonte única dos dados da Laura (nome, CRP, contatos, endereço, formação)
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

### Onde editar o quê

| Preciso mudar | Arquivo |
|---|---|
| Telefone, e-mail, Instagram, endereço, horários, CRP, formação | `src/data/site.ts` |
| Domínio | `astro.config.mjs` (`site`) **e** `src/data/site.ts` (`url`) |
| Frases de reconhecimento, pilares da Gestalt, temas, passos, FAQ | arrays no topo de `src/pages/index.astro` |
| Texto do "Sobre mim" | `src/pages/index.astro`, seção `#sobre` |
| Cores, fontes, espaçamento | `src/styles/global.css` |
| Title, meta description, dados estruturados | `src/layouts/Base.astro` |

## Identidade visual

Vem do cartão de visitas e da paleta oficial que a Laura enviou (11 cores, todas em `global.css` como tokens).

| Cor | Hex | Papel no site |
|---|---|---|
| Creme | `#F2EAE4` | Fundo da página |
| Rosa claro | `#F8EDEF` | Cards |
| Pêssego | `#F6D6CC` | Faixas de seção, moldura das fotos |
| Coral | `#D45A50` | Assinatura em script, marca, detalhes. **Não é cor de texto** — contraste 3,3:1 sobre creme |
| Vermelho | `#E93636` | **Só os botões de WhatsApp.** É o "destaque" da paleta, e o único destaque da página |
| Vinho | `#8F2E2A` | Links, hover, ênfase no título, fundo do bloco final |
| Oliva | `#6B6A4E` | Rótulos em caixa alta, tags |
| Marrom escuro / quente | `#3E2E28` / `#8B5E48` | Texto principal / secundário |
| Bege | `#C9B6A8` | Linhas e bordas |

**Tipografia:** Great Vibes (assinatura, como no cartão — só para o nome, nunca em títulos), Montserrat Variable (títulos e rótulos), Lato (texto corrido).

**Tema único, claro, de propósito.** Não há dark mode: a marca é creme e não existe versão escura dela. Não reintroduzir.

**As fotos usam recorte de pétala** (`.photo-petal`, `.photo-petal-alt`) — mesma geometria da marca. É o que amarra cartão, logo e site.

## Regras do CFP que o site respeita

Divulgação de serviços psicológicos é regulada (Código de Ética + Resolução CFP 011/2018). Ao mexer em texto, manter:

- **Obrigatório:** nome completo, a palavra "psicóloga" e o CRP com número — estão no topo, no rodapé e no bloco de registro. Atendimento online exige cadastro no e-Psi, mencionado na página.
- **Proibido:** depoimentos de pacientes, tabela de preços, promessa de resultado ou prazo, "antes e depois", sensacionalismo, caso clínico identificável. O site não tem nenhum desses blocos — não adicionar.
- **Evitado por precaução:** "primeira conversa gratuita". O texto diz "nenhum compromisso vem depois dela". Se a Laura quiser assumir o "gratuita", é decisão dela.

## TODO — antes de publicar

Tudo que está com dado de exemplo. Os itens de `site.ts` estão marcados com `// TODO` no próprio arquivo.

- [ ] **Endereço real do consultório** — `site.ts` → `endereco.rua`, `endereco.bairro`, `endereco.cep`
- [ ] **Horários reais** — `site.ts` → `horarios` (texto exibido) e `horariosSchema` (formato `Mo-Th 08:00-19:00`, para o Google)
- [ ] **Formação real** — `site.ts` → `formacao` (anos, cursos, instituições). Conferir se `atendeDesde` está certo
- [ ] **Texto do "Sobre mim"** — `index.astro`, seção `#sobre`. O atual é exemplo; a Laura deve escrever ou aprovar em primeira pessoa
- [ ] **Revisar frases, temas e FAQ com a Laura** — arrays no topo de `index.astro`. Conferir em especial a resposta sobre plano de saúde (recibo/reembolso) e a de sigilo
- [ ] **Confirmar o e-Psi** — a página afirma que o atendimento online está cadastrado. Só pode ficar se for verdade
- [ ] **Domínio definitivo** — registrar no Registro.br **no CPF da Laura** (`.com.br`, R$40/ano) e trocar o placeholder em `astro.config.mjs` **e** `site.ts`. **Não publicar com o placeholder:** o canonical e o JSON-LD apontariam para um domínio que não é dela. Nota: `.psi.br` é de provedor de internet, não de psicólogo — o de psicólogo é `.psc.br` (exige CPF + comprovação de CRP)
- [ ] **Fotos** — duas: retrato em luz natural (4:5, rosto centralizado com respiro nas bordas) e ela no consultório em movimento (5:4). Colocar em `src/assets/` e trocar os dois blocos `.photo` de `index.astro` por `<Image>` do `astro:assets`. Fotografia real, não banco de imagem — é o item que mais pesa na conversão
- [ ] **Remover o `photo-cap`** dos placeholders quando as fotos entrarem

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

### Por que Cloudflare Pages

Banda ilimitada no plano gratuito (assets estáticos não são medidos), 500 builds/mês, SSL e CDN global grátis, uso comercial permitido. Para um site de captação, o cenário a evitar é sair do ar num pico de tráfego — e aqui esse cenário não existe.

- **Netlify** permite uso comercial, mas o plano gratuito novo dá ~15 GB/mês em créditos e **pausa o site** quando acabam.
- **Vercel Hobby não serve:** proíbe uso comercial, e a definição deles inclui tanto "anunciar um produto ou serviço" quanto "um consultor pago para escrever o código". Este projeto se enquadra nas duas. Exigiria o plano Pro (US$ 20/mês).
- **GitHub Pages** funciona, mas exige repositório público no plano gratuito e configurar o build por GitHub Actions à mão.

### Ordem de execução

1. Registrar o domínio no Registro.br (CPF dela)
2. Criar conta na Cloudflare e adicionar o domínio como *site* — ela devolve dois nameservers
3. No painel do Registro.br, trocar os servidores DNS pelos da Cloudflare (propaga em minutos a algumas horas)
4. Subir este repositório no GitHub
5. Cloudflare Pages → *Connect to Git* → build command `npm run build`, output directory `dist`, sem adapter e sem variável de ambiente
6. **Antes do build final**, trocar o domínio em `astro.config.mjs` e `src/data/site.ts`
7. Pages → *Custom domains* → adicionar o domínio; o SSL sai automático e grátis

Depois disso, cada `git push` na branch principal republica o site em cerca de um minuto.

### E-mail

Domínio não inclui e-mail. Hoje o contato é um Gmail. Se quiser `contato@dominio.com.br`:

- **Cloudflare Email Routing** — grátis, encaminha para o Gmail dela. Só recebe, não envia como
- **Zoho Mail** — plano gratuito para 1 usuário, recebe e envia
- **Google Workspace** — ~R$30/mês, se quiser tudo dentro do Gmail dela

## Deploy

Cloudflare Pages: conectar o repositório, build command `npm run build`, output directory `dist`. Sem adapter, sem variável de ambiente.
