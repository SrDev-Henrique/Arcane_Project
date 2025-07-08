# Arcane: Universo Interativo

## Descrição

Um website imersivo e responsivo que apresenta o universo da série animada **Arcane** (Riot Games/Netflix), explorando suas regiões, personagens, temporadas, trilhas sonoras e conteúdos promocionais. Desenvolvido para fãs, curiosos e profissionais de entretenimento, o projeto entrega uma experiência visual marcante, navegação fluida e informações ricas sobre o mundo de Runeterra, Piltover e Zaun.

O site valoriza a estética, a interatividade e a performance, sendo ideal para portfólios, apresentação a recrutadores ou demonstração de habilidades em frontend moderno.

## Tecnologias Utilizadas

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **SCSS (Sass Modules)**
- **Framer Motion** (animações)
- **Lenis** (scroll suave)
- **React Icons**
- **React Device Detect**
- **Lodash.debounce**
- **ESLint**

## Principais Funcionalidades

- **Design 100% responsivo** e mobile-first
- **Animações de entrada, transição e texto** com Framer Motion
- **Navegação fluida** com menu animado e rolagem suave (Lenis)
- **Componentização avançada** (seções, cards, botões, títulos animados)
- **Apresentação detalhada de personagens** (história, habilidades, playlists)
- **Exploração de temporadas e episódios** com imagens e links para Netflix
- **Conteúdos extras:** trailers, trilhas sonoras, destaques e materiais promocionais
- **Modo tela cheia** (FullscreenSwitcher)
- **Carregamento animado** e feedback visual
- **Acessibilidade** (uso de ARIA, navegação por teclado)

## Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SrDev-Henrique/Arcane_Project
   cd arcane_project
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
4. **Acesse:**
   [http://localhost:3000](http://localhost:3000)

## Estrutura de Pastas (resumida)

```
arcane_project/
├── public/
│   ├── images/           # Imagens de personagens, regiões, temporadas, etc.
│   ├── audio/            # Trilhas sonoras e áudios de personagens
│   └── fonts/            # Fontes customizadas
├── src/
│   ├── app/              # Páginas e seções principais (Hero, About, Piltover, Zaun, Temporadas, Extras, Outro)
│   ├── components/       # Componentes reutilizáveis (Header, Button, AnimatedText, FullscreenSwitcher...)
│   ├── contexts/         # Contextos globais (menu, scroll, etc.)
│   ├── hooks/            # Hooks customizados (ex: useFullscreen)
│   ├── data/             # Dados estruturados (personagens, temporadas)
│   ├── styles/           # Variáveis e temas SCSS
│   └── utils/            # Utilitários e helpers
└── ...
```

## Diferenciais Técnicos

- **Organização modular:** separação clara por seções, componentes e dados
- **Hooks customizados:** manipulação de fullscreen, viewport, scroll lock
- **Context API:** gerenciamento global de menu, loading, áudio e temporadas
- **Design system próprio:** SCSS modular, variáveis de cor, tipografia e breakpoints
- **Animações avançadas:** transições de vídeo, textos animados, loaders customizados
- **Acessibilidade e UX:** navegação por teclado, feedback visual, responsividade real
- **Integração com plataformas externas:** links diretos para Netflix, YouTube e playlists

## Contato / Autor

Desenvolvido por **SrDev Henrique**

- [GitHub](https://github.com/SrDev-Henrique)
- [Instagram](https://www.instagram.com/hick.slv/)
- [E-mail](mailto:halbuquerque2850@gmail.com?subject=Gostaria%20de%20montar%20um%20orçamento%20para%20um%20projeto)

---

> Projeto para fins de portfólio, estudo e demonstração de habilidades em frontend moderno. Não oficial, sem fins comerciais.
