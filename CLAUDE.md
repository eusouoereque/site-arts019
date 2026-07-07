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
- **Fontes:** Inter (Google Fonts, pesos 400/600/800/900) via CDN
- **Ícones:** Font Awesome 6.4.0 via CDN (carregado de forma assíncrona)
- **Hospedagem:** ainda não publicado (ambiente local em `E:\Material Paginas\Arts019`)
- **Domínio:** a definir — placeholder `https://seudominio.com` em uso no código

---

## Arquivos do Projeto

```
Arts019/
├── index.html          ← Única página do site
├── style.css           ← Todo o CSS (reset, componentes, responsivo)
├── script.js           ← Slider antes/após, FAQ accordion, scroll reveal
├── CLAUDE.md           ← Este arquivo
├── assets/
│   ├── img/
│   │   ├── logo-sem-fundo.webp         ← Logo da marca (usado no hero e favicon)
│   │   ├── background-sem-o-mascote.webp ← Background do hero (CSS background-image)
│   │   ├── Masacote.webp               ← Mascote (imagem principal do hero, LCP)
│   │   └── carousel/                   ← Pasta para imagens do carrossel (VAZIA)
│   │       ← Precisa de 12 arquivos .webp (c1-01 a c1-06, c2-01 a c2-06)
│   └── video/
│       └── brabos3.mp4                 ← Vídeo de demonstração (seção Objection)
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

- Família: **Inter**
- Pesos usados: 400 (normal), 600 (semi-bold), 800 (bold), 900 (black)
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
- Background: `assets/img/background-sem-o-mascote.webp` (CSS `background-image`)
- Logo: `assets/img/logo-sem-fundo.webp` (max 130px)
- H1: "COMECE A CRIAR ARTES PROFISSIONAIS EM POUCOS DIAS"
- Mascote: `assets/img/Masacote.webp` — posição absoluta, alinhado ao canto inferior direito, animação `float-mascot` (translateY suave)
- CTA: ancora `#pricing`

### 2. Carrossel (`.carousel-section`)
- Duas linhas de cards animadas: linha 1 vai para esquerda, linha 2 vai para direita
- Animação CSS pura (`scroll-left` / `scroll-right`, 40s linear infinite)
- Cada linha: **2 sets de 6 imagens** = 12 cards (loop perfeito em -1620px)
- **Imagens ainda não adicionadas** — pasta `assets/img/carousel/` está vazia
  - Linha 1: `c1-01.webp` até `c1-06.webp`
  - Linha 2: `c2-01.webp` até `c2-06.webp`
  - Proporção ideal: **4:5** (ex: 600×750px)
- Título sobreposto centralizado: "Você vai ter acesso a tudo isso nos próximos dias"

### 3. Vantagens (`.benefits-grid-section`)
- Grid de 4 cards (4 colunas desktop, 2 tablet, 1 mobile)
- Ícones Font Awesome: Acesso Imediato, Photoshop/Canva, Premiere/CapCut, I.A.

### 4. Objeção + Vídeo (`.objection-section`)
- Texto de objeção à esquerda
- Vídeo `assets/video/brabos3.mp4` à direita (autoplay, muted, loop, preload="none")

### 5. Saia Disso Pra Isso (`.saia-disso-section`)
- 4 sliders "antes/depois" em grid (4 colunas desktop, 2 tablet, 1 mobile)
- Slider controlado por mouse/touch (script.js `sliderHover` / `sliderHoverTouch`)
- **Imagens ainda são placeholders** (`via.placeholder.com`) — precisam ser substituídas por artes reais

### 6. Galeria (`.gallery-section`)
- Grid 4×3 (12 cards) com imagens hospedadas no CDN da Kiwify (`assets.kiwify.com.br`)
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
- 2 cards: Plano Mensal (R$24,99/mês) e Plano Anual (12x R$14,99 ou R$179,88 à vista)
- **Os `href="#"` dos botões de compra precisam ser substituídos pela URL real da Kiwify**
- Plano Anual: badge "Melhor Escolha", background diferenciado, shadow mais pronunciada, 7 itens vs 4 do mensal
- "economize R$ 120,00" destacado no Anual
- "Mestre dos Prompts (em breve)" como item bônus em roxo accent com ícone estrela no Anual
- Os dois planos têm acesso ao mesmo conteúdo — a diferença é só o preço

### 9. Garantia (`.guarantee-section`)
- Garantia incondicional de 7 dias
- Ícone de medalha + texto descritivo

### 10. Depoimentos (`.testimonials-section`)
- 3 prints reais de WhatsApp em `assets/img/testimonials/depoimento-01.webp` a `depoimento-03.webp`
- `<img>` com `alt` descritivo, `loading="lazy"`, `width`/`height` (previne CLS)

### 11. Autoridade (`.authority-section`)
- Bio da ARTS_019: 4+ anos, 1500+ designers ajudados
- **Placeholder de imagem**: div "FOTO DA EQUIPE / LOGO" — precisa de imagem real
- Stats: +4 Anos de Mercado, +1500 Designers e Editores

### 12. FAQ (`.faq-section`)
- 7 perguntas com accordion (uma aberta por vez)
- Animação via CSS Grid (`grid-template-rows: 0fr → 1fr`) sem reflow
- `aria-expanded` atualizado dinamicamente no script.js

### 13. Footer
- Texto simples: "© 2026 Pack Designer 019. Todos os direitos reservados."

---

## JavaScript (`script.js`)

Três funcionalidades:

1. **`sliderHover(event, element)` / `sliderHoverTouch`** — controla os sliders antes/depois por posição do cursor/toque. Atualiza `clip-path` da `.image-after` e posição da `.slider-line-visual`.

2. **Smooth scroll** — todos os `<a href^="#">` usam `scrollIntoView({ behavior: 'smooth' })`.

3. **Scroll reveal** — `IntersectionObserver` adiciona classe `.active` nos elementos `.reveal` quando entram na viewport (threshold: 15%, rootMargin: -50px bottom). Elementos alvos: benefit-box, pricing-card, guarantee-box, stat, authority-bio, faq-item, etc.

---

## SEO

### O que já está implementado
- `lang="pt-BR"` no `<html>`
- `meta description` completa
- `meta robots: index, follow`
- `<link rel="canonical">` — **placeholder, atualizar com domínio real**
- Open Graph completo: title, description, image, url, type, site_name, locale, image:alt
- Twitter Cards: card, title, description, image
- Schema.org JSON-LD: `Organization` + `FAQPage` (7 perguntas) — elegível para FAQ Rich Snippets
- Hierarquia de headings: H1 (hero) → H2 (seções) → H3 (subseções)
- `aria-expanded` no FAQ accordion
- `aria-label` no botão WhatsApp
- `rel="noopener noreferrer"` nos links externos

### O que precisa ser feito ao publicar
- Substituir `https://seudominio.com` pelo domínio real em 8 lugares no `<head>`
- Adicionar URL real da Kiwify nos botões de compra (atualmente `href="#"`)
- Adicionar URL real do WhatsApp no botão flutuante (atualmente `href="#"`)

---

## Performance / Web Vitals

### O que já está implementado
- Imagens locais em `.webp` (logo, background, mascote)
- `<link rel="preload">` para `background-sem-o-mascote.webp` e `Masacote.webp`
- `fetchpriority="high"` no `<img>` do mascote (LCP)
- Font Awesome carregado assincronamente (`media="print" onload`) com `<noscript>` fallback
- Google Fonts com `display=swap` e `preconnect` para fonts.googleapis.com e fonts.gstatic.com
- `loading="lazy"` nas imagens da galeria
- `width` e `height` explícitos nas imagens da galeria (previne CLS)
- `preload="none"` no vídeo autoplay
- Carrossel com 24 cards (2 sets × 6 por linha) em vez de 72 — 66% menos elementos no DOM
- `filter: blur(80px)` nas luzes atmosféricas (otimizado de 140px)
- `background-attachment: fixed` removido (causava lentidão de scroll no iOS)
- CSS Grid para animação do FAQ accordion (sem reflow)
- `IntersectionObserver` para scroll reveal (sem scroll listener)

### O que ainda pode melhorar
- Self-hosting das fontes Inter (elimina dependência do Google Fonts)
- Minificação de CSS e JS (via build tool ou plugin da hospedagem)
- Imagens dos sliders "antes/depois" ainda são `via.placeholder.com` (dependência externa)
- Carrossel ainda sem imagens reais (pasta `assets/img/carousel/` vazia)

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

## Pendências de Conteúdo (Placeholders)

| Seção              | O que falta                                      | Prioridade |
|--------------------|--------------------------------------------------|------------|
| Carrossel          | 12 imagens `.webp` (amostras de templates)       | Alta       |
| Sliders Antes/Após | 4 pares de imagens reais (arte amadora vs pro)   | Alta       |
| Autoridade         | Foto real da equipe ou logo em alta resolução    | Média      |
| Botões de compra   | URL real da Kiwify (mensal e anual)              | Alta       |
| WhatsApp flutuante | Link real `https://wa.me/55XXXXXXXXXXX`          | Alta       |
| Domínio            | Substituir `seudominio.com` no `<head>` (8x)    | Alta       |
| Política/Termos    | Criar páginas reais e substituir `href="#"`      | Alta       |
