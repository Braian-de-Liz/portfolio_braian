# portfolio_braian

Portfólio de Braian de Liz da Silva: projetos, formação e habilidades de um desenvolvedor de sistemas focado em backend.

## O que tem no site

- **Hero com cena 3D** (Three.js): esfera de partículas, malha e anel orbital em volta da foto. Não aparece com `prefers-reduced-motion` nem com economia de dados.
- **Página única** com navegação por scroll: hero, **Projetos**, **Habilidades**, **Sobre** e **Contato**, nessa ordem. O menu destaca a seção em leitura e leva a cada uma por âncora (`/#projetos`). Os links antigos `/projetos`, `/habilidades` e `/sobre` redirecionam para a seção equivalente. Tudo abaixo do hero vem em um bloco carregado sob demanda.
- **Cases de projeto** (AMOTIF, TypeMarks, br_standards_with_zod, Tchuu-Tchuu) com arquitetura, métricas e detalhes recolhidos. O case da biblioteca traz um **playground** que roda a lib real do NPM no navegador.
- **Cenas 3D por seção**, cada uma explicando o conteúdo: camadas de áudio do AMOTIF, colunas de throughput do TypeMarks (com um explorador dos 15 cenários do relatório, filtrável por runtime), trilho com telemetria do Tchuu-Tchuu, constelação da stack em Habilidades e o globo que se desfaz na 404. Só existe uma cena montada por vez perto da tela, e todas somem sem WebGL, com "reduzir movimento" ou economia de dados.
- **Animações de scroll** (GSAP + ScrollTrigger) coreografadas em um só hook: cabeçalhos entram em sequência com o título em máscara, mídia dos cases abre de dentro para fora, grupos entram em cascata e os números sobem até o valor final. Nada que já está visível ao carregar é escondido, e tudo é desligado com "reduzir movimento".
- **Hero** com esfera 3D (Three.js): partículas, malha e anéis orbitais. A foto fica na seção Sobre.

## Stack

React 19, Vite 7, React Router 7, GSAP, Lenis, Three.js. Fontes hospedadas no próprio site (`@fontsource`). Testes com Vitest e Testing Library.

## Desenvolvimento

```bash
bun install
bun run dev      # servidor local
bun run lint
bun run test
bun run build
```

## Deploy

Defina `VITE_SITE_URL` (ex.: `https://seudominio.com`) no ambiente de build. Sem ela, a imagem Open Graph fica com URL relativa e a prévia de link em redes sociais não aparece; o build avisa quando ela falta.

Um workflow em `.github/workflows/ci.yml` roda lint, testes e build a cada push na `main` e em pull requests.

## Pastas

- `public/`: só o que o site serve (currículo, histórico, imagens usadas, `og.png`, `robots.txt`).
- `arquivo-pessoal/`: documentos, certificados e anotações guardados fora do site. Não são publicados.
