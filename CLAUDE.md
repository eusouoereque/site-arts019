# CLAUDE.md — Pack Designer 019

Documentação de contexto do projeto para uso interno com Claude Code.

---

## Visão Geral

Landing page de vendas da **área de membros "Pack Designer 019"**, produto da agência **ARTS_019**.

**Produto:** Assinatura mensal/anual que dá acesso a templates de Canva e Photoshop, projetos de Premiere e CapCut, aulas práticas, assets de I.A. e suporte. Conteúdo atualizado todo mês (dia 10).

**Objetivo da página:** Converter visitantes em assinantes. Página única (one page), sem navegação — o fluxo é linear até a seção de preços (`#pricing`).

---

## Stack Técnica

- **HTML5** puro — sem framework, sem build tool
- **CSS3** puro — arquivo único `style.css`
- **JavaScript** puro — arquivo único `script.js`
- **Fontes:** Outfit auto-hospedada (`assets/fonts/outfit-latin.woff2`, variável 400–900) + `Outfit Fallback` (local Arial) para evitar CLS
- **Ícones:** Font Awesome 6.4.0 via CDN (carregado de forma assíncrona, com SRI)
- **Hospedagem:** Apache com `.htaccess` na raiz (cache, compressão)
- **Domínio:** `https://arts019.com`

---

## Arquivos do Projeto

```
Arts019/
├── index.html          ← Única página do site
├── style.css           ← Todo o CSS (reset, componentes, responsivo, @font-face)
├── script.js           ← FAQ accordion, smooth scroll, scroll reveal, play/pause de vídeos
├── .htaccess           ← Cache e compressão (Apache)
├── CLAUDE.md           ← Este arquivo
├── assets/
│   ├── fonts/
│   │   └── outfit-latin.woff2          ← Fonte auto-hospedada (preload no <head>)
│   ├── img/
│   │   ├── logo-horizontal.webp        ← Logo do hero
│   │   ├── logo-sem-fundo.webp         ← Logo da marca
│   │   ├── favicon.webp                ← Favicon e apple-touch-icon
│   │   ├── og-cover.webp               ← Imagem Open Graph / Twitter Card
│   │   ├── background-sem-o-mascote.webp / background-mobile.webp  ← Background do hero
│   │   ├── Kallango1.webp / Kallango1-mobile.webp  ← Mascote (LCP, <picture> responsivo)
│   │   ├── poster-*.webp               ← Posters dos 6 vídeos
│   │   ├── carousel/                   ← c1-01…c1-06 e c2-01…c2-06 (12 arquivos)
│   │   ├── gallery/                    ← g01…g12 (12 arquivos)
│   │   └── testimonials/               ← depoimento-01 a 03
│   └── video/
│       ├── eventos-ia.mp4              ← Seção Objeção
│       ├── dj-turin-stories.mp4, ouca-agora.mp4, baile-098.mp4, video-showcase.mp4  ← Showcase
│       └── logo-3d.mp4                 ← Logo animado (seção Autoridade)
└── docs/                               ← Arquivos de referência internos (não publicados)
```

---

## Design System

### Paleta de Cores

| Variável CSS          | Valor hex / rgba              | Uso                        |
|-----------------------|-------------------------------|----------------------------|
| `--bg-main`           | `#05000a`                     | Fundo principal da página  |
| `--bg-card`           | `#12051f`                     | Cards, boxes               |
| `--bg-card-hover`     | `#1c0830`                     | Hover dos cards            |
| `--primary`           | `#7b2cbf`                     | Botões, ícones, bordas     |
| `--primary-hover`     | `#9d4edd`                     | Hover de botões            |
| `--accent-purple`     | `#c77dff`                     | Destaque (`.highlight-yellow`) |
| `--text-light`        | `#ffffff`                     | Texto principal            |
| `--text-muted`        | `#b0b0b0`                     | Texto secundário           |
| `--border-color`      | `rgba(123, 44, 191, 0.3)`     | Bordas dos cards           |

> **Atenção:** A classe `.highlight-yellow` tem nome enganoso — ela aplica `var(--accent-purple)` (#c77dff), não amarelo. É o roxo claro de destaque da marca.

### Tipografia

- Família: **Outfit** (variável 400–900, auto-hospedada), fallback `Outfit Fallback` (Arial local)
- Pesos usados: 400 (normal), 600 (semi-bold), 700, 800 (bold), 900 (black)
- `h1, h2, h3, h4` → `font-weight: 800`, `line-height: 1.3`
- `.section-title` → `font-size: 2.5rem`, `font-weight: 900`, uppercase
- `.mega-title` → `font-size: 4rem` (seção de features)
- `.giant-title` → `font-size: 3.5rem` (overlay do carrossel)
- `.headline` (H1 hero) → `font-size: 3.5rem`

### Botão CTA Principal

Classe `.cta-btn` — roxo gradiente com animação `pulse-glow` infinita e efeito shimmer no hover. Usado em múltiplos pontos da página. Todos apontam para `#pricing` (exceto os dois botões de compra que precisarão de URL real da Kiwify).

### Efeitos Atmosféricos

- `section::before/after` cria "luzes de fundo" com `filter: blur(80px)` roxo difuso
- Seções ímpares: luz roxa à esquerda no topo, suave à direita embaixo
- Seções pares: luz roxa mais clara à direita, roxa escura à esquerda

---

## Seções da Página (em ordem)

### 1. Hero (`<header class="hero">`)
- Background responsivo: `background-sem-o-mascote.webp` (desktop) / `background-mobile.webp` (≤900px)
- Logo: `assets/img/logo-horizontal.webp` (353×79)
- H1: "COMECE A CRIAR ARTES PROFISSIONAIS EM POUCOS DIAS"
- Mascote: `<picture>` com `Kallango1.webp` (desktop) e `Kallango1-mobile.webp` (≤900px) — é o LCP, com `fetchpriority="high"` e preload
- CTA: ancora `#pricing`

### 2. Carrossel (`.carousel-section`)
- Duas linhas de cards animadas: linha 1 vai para esquerda, linha 2 vai para direita
- Animação CSS pura (`scroll-left` / `scroll-right`, linear infinite)
- Cada linha: **3 sets de 6 imagens** = 18 cards (loop perfeito também em telas largas)
  - Linha 1: `c1-01.webp` até `c1-06.webp`
  - Linha 2: `c2-01.webp` até `c2-06.webp`
  - Aplicadas como `background-image` inline nos `.carousel-item-card`
- Título sobreposto centralizado: "Você vai ter acesso a tudo isso nos próximos dias"

### 3. Vantagens (`.benefits-grid-section`)
- Grid de 4 cards (4 colunas desktop, 2 tablet, 1 mobile)
- Ícones Font Awesome: Acesso Imediato, Photoshop/Canva, Premiere/CapCut, I.A.

### 4. Objeção + Vídeo (`.objection-section`)
- Texto de objeção à esquerda ("É isso que você vai conseguir fazer.")
- Vídeo `assets/video/eventos-ia.mp4` à direita (muted, loop, `preload="none"`, poster) — play/pause por `IntersectionObserver`

### 5. Showcase de Vídeos (`.saia-disso-section`)
- Título: "CHEGUE NESSE NIVEL!"
- Grid `.videos-showcase-grid` com 4 `.showcase-video-wrap`, cada um com um `<video>` mudo em loop e poster
- Play/pause conforme visibilidade (script.js), respeitando `prefers-reduced-motion`
- Vídeos: `dj-turin-stories.mp4`, `ouca-agora.mp4`, `baile-098.mp4`, `video-showcase.mp4`

### 6. Galeria (`.gallery-section`)
- Grid 4×3 (12 cards) com imagens locais em `assets/img/gallery/` (`g01.webp` a `g12.webp`)
- Badges PS (azul) e CA (roxo) nos cards
- `loading="lazy"`, `width="400"`, `height="500"` definidos
- Alt texts descritivos e únicos por imagem

### 7. Features / Bento Grid (`.updates-section`)
- Layout Bento com 6 cards:
  - **Featured** (2×2): Atualizações Mensais (badge "TODO DIA 10")
  - **Aulas** (1×1): menciona "pessoas animadas com IA"
  - **IA** (1×1): menciona "Mestre dos Prompts (em breve)"
  - **Suporte Humano** (1×1): "seg. a sex. das 08h às 17h, pessoa real"
  - **EDIT019 — Vídeo** (1×1): presets, efeitos, transições, banco de mídia
  - **Pack de Elementos** (1×1): "produto vitalício incluso na assinatura"
- Responsivo: 3 colunas → 2 colunas → 1 coluna

### 8. Pricing (`#pricing`, `.pricing-section`)
- 2 cards: Plano Mensal (R$35,00/mês) e Plano Anual (12x R$24,51 ou R$237,00 à vista)
- Botões de compra já apontam para o checkout real da Kiwify (mensal `qNPivr8`, anual `8eoAQaG`)
- Plano Anual: badge "Melhor Escolha", background diferenciado, shadow mais pronunciada, 8 itens vs 5 do mensal
- "economize R$ 183,00 (44% de desconto)" destacado no Anual (420,00 riscado − 237,00 à vista)
- Itens bônus em roxo accent com ícone estrela **só no Anual**: "Mestre dos Prompts (em breve)", "Curso de Photoshop (em breve)" e "Curso de After Effects (em breve)"
- Os dois planos dão acesso ao mesmo conteúdo (ambos listam Templates, EDIT019, Aulas — Pessoas Animadas com IA, Suporte e Acesso imediato) — a única diferença real é o **atendimento prioritário** do Anual (mensal tem "Suporte humano" comum) + os itens "em breve" que aparecem só no card Anual como reforço de valor

### 9. Garantia (`.guarantee-section`)
- Garantia incondicional de 7 dias
- Ícone de medalha + texto descritivo

### 10. Depoimentos (`.testimonials-section`)
- 3 prints reais de WhatsApp em `assets/img/testimonials/depoimento-01.webp` a `depoimento-03.webp`
- `<img>` com `alt` descritivo, `loading="lazy"`, `width`/`height` (previne CLS)

### 11. Autoridade (`.authority-section`)
- Bio da ARTS_019: 4+ anos, 1500+ designers ajudados
- Vídeo `.author-video` com o logo animado em 3D (`assets/video/logo-3d.mp4`, poster `poster-logo-3d.webp`)
- Stats: +4 Anos de Mercado, +1500 Designers e Editores

### 12. FAQ (`.faq-section`)
- 7 perguntas com accordion (uma aberta por vez)
- Animação via CSS Grid (`grid-template-rows: 0fr → 1fr`) sem reflow
- `aria-expanded` atualizado dinamicamente no script.js

### 13. Footer
- Texto simples: "© 2026 Pack Designer 019. Todos os direitos reservados." + disclaimer "Este produto é comercializado pela ARTS_019."
- Sem links de Política de Privacidade / Termos (ainda não existem)

### Botão WhatsApp flutuante
- `.whatsapp-float` fixo, aponta para `https://api.whatsapp.com/send?phone=5519971451328`

---

## JavaScript (`script.js`)

Tudo roda dentro de um `DOMContentLoaded`:

1. **Smooth scroll** — todos os `<a href^="#">` usam `scrollIntoView({ behavior: 'smooth' })`.

2. **FAQ accordion** — clique em `.faq-question` alterna `.open` (uma aberta por vez) e atualiza `aria-expanded`.

3. **Scroll reveal** — `IntersectionObserver` adiciona `.active` nos elementos `.reveal` quando entram na viewport (threshold: 15%, rootMargin: -50px bottom). Alvos: benefit-box, objection-text, showcase-video-wrap, pricing-card, guarantee-box, stat, authority-bio, faq-item. Delays escalonados por índice (`delay-1/2/3`).

4. **Play/pause de vídeos por visibilidade** — três `IntersectionObserver` (showcase, vídeo de objeção, vídeo do logo) dão `play()` quando o vídeo entra na tela e `pause()` quando sai; nada toca se `prefers-reduced-motion: reduce`.

---

## SEO

### O que já está implementado
- `lang="pt-BR"` no `<html>`
- `meta description` completa
- `meta robots: index, follow`
- `<link rel="canonical">` apontando para `https://arts019.com/`
- Open Graph completo: title, description, image, url, type, site_name, locale, image:alt
- Twitter Cards: card, title, description, image
- Schema.org JSON-LD: `Organization` + `FAQPage` (7 perguntas) — elegível para FAQ Rich Snippets
- Hierarquia de headings: H1 (hero) → H2 (seções) → H3 (subseções)
- `aria-expanded` no FAQ accordion
- `aria-label` no botão WhatsApp
- `rel="noopener noreferrer"` nos links externos

### O que ainda pode ser feito
- Criar páginas de Política de Privacidade e Termos e linká-las no footer
- Adicionar `sitemap.xml` e `robots.txt`

---

## Performance / Web Vitals

### O que já está implementado
- Todas as imagens locais em `.webp`; nenhuma dependência de CDN de imagem
- Versões mobile separadas do background e do mascote (`<picture>` + preload com `media`)
- `fetchpriority="high"` e `<link rel="preload">` no mascote e no background (LCP)
- Fonte Outfit auto-hospedada + preload do `.woff2` + fallback métrico (`Outfit Fallback`) — sem CLS de fonte
- Font Awesome carregado assincronamente (`media="print" onload`) com SRI e `<noscript>` fallback
- `loading="lazy"` e `width`/`height` explícitos nas imagens de galeria e depoimentos (previne CLS)
- `preload="none"` + `poster` em todos os vídeos; play/pause só quando visíveis
- Vídeos comprimidos (~-52%)
- `.htaccess` com cache e compressão
- `filter: blur(80px)` nas luzes atmosféricas (otimizado de 140px)
- `background-attachment: fixed` removido (causava lentidão de scroll no iOS)
- CSS Grid para animação do FAQ accordion (sem reflow)
- `IntersectionObserver` para scroll reveal (sem scroll listener)
- `prefers-reduced-motion` respeitado nos vídeos

### O que ainda pode melhorar
- Minificação de CSS e JS (via build tool ou plugin da hospedagem)
- Font Awesome ainda vem de CDN externo — poderia ser auto-hospedado (ou trocado por SVGs inline dos ~10 ícones usados)

---

## Regras de Conteúdo

- **NÃO mencionar** o grupo/comunidade WhatsApp na LP — cliente optou por não divulgar esse canal publicamente
- Suporte humano com horário (seg–sex 08h–17h) pode e deve ser mencionado

## Produto — Módulos Existentes (fonte: conteudo-area-membros.md)

1. **Aulas** — Pessoas Animadas com IA
2. **Photoshop** — Tutorial + biblioteca de artes + atualizações + artes temáticas
3. **Canva** — Tutorial + biblioteca de artes + atualizações + artes temáticas
4. **EDIT019** — Presets Premiere, banco de vídeos/imagens, efeitos, transições
5. **Mestre dos Prompts** — EM BREVE (março/2027): tutoriais IA, agentes IA, prompts prontos
6. **Pack Antigos** — Pack_019 (PSD + Canva + arquivos complementares)
7. **Pack de Elementos** — Elementos exclusivos (produto vitalício incluso)

## Pendências

| Seção           | O que falta                                       | Prioridade |
|-----------------|---------------------------------------------------|------------|
| Política/Termos | Criar as páginas e linkar no footer               | Alta       |
| SEO             | `sitemap.xml` e `robots.txt`                      | Média      |
| Performance     | Minificar CSS/JS; auto-hospedar o Font Awesome    | Baixa      |

> Todos os placeholders anteriores (imagens do carrossel, galeria, depoimentos, domínio, links da Kiwify e do WhatsApp) já foram substituídos por conteúdo real.
