import { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useScrollReveal } from '../animations/useScrollReveal';
import { usePageEntry } from '../animations/usePageEntry';

const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Habilidades() {
    const [expanded, setExpanded] = useState({});
    const pageRef = usePageEntry();
    const headerRef = useScrollReveal({ y: 20 });
    const atualRef = useScrollReveal({ y: 25 });
    const atualGridRef = useScrollReveal({ y: 30, scale: 0.98, children: true, stagger: 0.05 });
    const proximosRef = useScrollReveal({ y: 25 });
    const proximosGridRef = useScrollReveal({ y: 30, scale: 0.98, children: true, stagger: 0.05 });

    const contentRefs = useRef({});

    const animateAccordion = useCallback((section, category, isExpanding) => {
        if (prefersReducedMotion) return;

        const key = `${section}-${category}`;
        const contentEl = contentRefs.current[key];
        if (!contentEl) return;

        gsap.killTweensOf(contentEl);
        const cards = contentEl.querySelectorAll('.skill-card');
        if (cards.length > 0) gsap.killTweensOf(cards);

        if (isExpanding) {
            gsap.set(contentEl, { height: 0, opacity: 0, overflow: 'hidden' });
            gsap.to(contentEl, {
                height: 'auto',
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.set(contentEl, { overflow: 'visible' });
                },
            });

            if (cards.length > 0) {
                gsap.fromTo(cards, {
                    opacity: 0,
                    y: 10,
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.35,
                    stagger: 0.04,
                    delay: 0.15,
                });
            }
        } else {
            gsap.to(contentEl, {
                height: 0,
                opacity: 0,
                duration: 0.35,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(contentEl, { overflow: 'hidden' });
                },
            });
        }
    }, []);

    const handleEnter = (section, category) => {
        if (expanded[section] === category) return;
        setExpanded(prev => ({ ...prev, [section]: category }));
        animateAccordion(section, category, true);
    };

    const handleLeave = (section) => {
        const category = expanded[section];
        if (!category) return;
        const key = `${section}-${category}`;
        const contentEl = contentRefs.current[key];
        if (contentEl) {
            gsap.delayedCall(0.15, () => {
                setExpanded(prev => ({ ...prev, [section]: null }));
                animateAccordion(section, category, false);
            });
        } else {
            setExpanded(prev => ({ ...prev, [section]: null }));
        }
    };

    const handleClick = (section, category) => {
        const isCurrentlyExpanded = expanded[section] === category;

        if (isCurrentlyExpanded) {
            setExpanded(prev => ({ ...prev, [section]: null }));
            animateAccordion(section, category, false);
        } else {
            const prevCategory = expanded[section];
            if (prevCategory) {
                animateAccordion(section, prevCategory, false);
            }
            setExpanded(prev => ({ ...prev, [section]: category }));
            animateAccordion(section, category, true);
        }
    };

    const descricoes = {
        "TypeScript": "Superset do JavaScript que adiciona tipagem estática, aumentando a segurança e produtividade no desenvolvimento.",
        "Zod": "Biblioteca de validação de schemas TypeScript-first que permite criar validações declarativas e type-safe.",
        "TypeBox": "Biblioteca para criação de tipos TypeScript em runtime, usada com bibliotecas de validação como Fastify.",
        "Drizzle": "ORM TypeScript lightweight e type-safe para SQL databases, com performance próxima do SQL puro.",
        "Fastify": "Framework web backend focado em alta performance e baixo overhead, com suporte nativo a TypeScript.",
        "Node.js": "Runtime JavaScript server-side que permite executar JS fora do navegador, ideal para APIs e microservices.",
        "Bun": "Runtime JavaScript all-in-one (runtime, bundler, package manager) mais rápido que Node.js e Deno.",
        "PostgreSQL": "Banco de dados relacional open-source robusto, com suporte a JSON, full-text search e extensões.",
        "Express": "Framework minimalista para Node.js, widely used para criar APIs RESTful e web applications.",
        "MySQL": "Banco de dados relacional popular, widely used em aplicações web com estrutura SQL.",
        "JavaScript": "Linguagem de programação dinâmica que permite interactivity em páginas web e server-side.",
        "HTML5": "Linguagem de marcação para estruturar conteúdo web, semantic tags e APIs modernas.",
        "CSS3": "Linguagem de estilo para presentation de documentos web, incluindo animations e layouts modernos.",
        "React": "Biblioteca JavaScript para construir interfaces de usuário component-based e single-page applications.",
        "Python": "Linguagem multiparadigma reconhecida por simplicidade, usada em web, data science e AI.",
        "C#": "Linguagem orientada a objetos da Microsoft, usada em aplicações enterprise, games (Unity) e .NET.",
        "Go": "Linguagem do Google compilada, concurrency-native, ideal para microservices e high-performance systems.",
        "Fiber": "Express-like framework Go para web apps, conhecido por performance e baixo footprint de memória em Golang.",
        "MongoDB": "Banco de dados NoSQL orientado a documentos, schema-less com JSON-like documents.",
        "Docker": "Plataforma de containerização que permite empacotar aplicações com suas dependências em containers isolados.",
        "CI/CD": "Integração e entrega contínua — automação de build, teste e deploy com GitHub Actions.",
        "Hono": "Framework web ultrafast para Edge Workers, compatível com múltiplos runtimes (Cloudflare, Deno, Bun, Node.js).",
        "GraphQL": "Linguagem de consultas para APIs que permite ao cliente solicitar exatamente os dados necessários, reduzindo over-fetching.",
        "MCP": "Model Context Protocol — protocolo padronizado para conectar modelos de IA a ferramentas, dados e contextos externos de forma segura.",
        "Agentes de IA": "Sistemas autônomos que utilizam modelos de linguagem para planejar, decidir e executar tarefas com pouca ou nenhuma supervisão humana.",
        "Terraform": "Ferramenta de Infrastructure as Code (IaC) da HashiCorp para provisionar e gerenciar infraestrutura em nuvem de forma declarativa.",
        "AWS": "Plataforma de cloud computing da Amazon com serviços de compute, storage, banco de dados, IA e mais.",
    };

    const stackAtual = [
        { category: "Frontend & Linguagens", items: [
            { name: "HTML5", icon: "html5/html5-plain" },
            { name: "CSS3", icon: "css3/css3-plain" },
            { name: "JavaScript", icon: "javascript/javascript-plain" },
            { name: "TypeScript", icon: "typescript/typescript-plain" },
        ]},
        { category: "Backend & Runtime", items: [
            { name: "Node.js", icon: "nodejs/nodejs-plain" },
            { name: "Bun", icon: "https://bun.com/logo.svg" },
            { name: "Fastify", icon: "fastify/fastify-plain" },
            { name: "Express", icon: "express/express-original" },
        ]},
        { category: "Dados & Validação", items: [
            { name: "PostgreSQL", icon: "postgresql/postgresql-plain" },
            { name: "MySQL", icon: "mysql/mysql-original" },
            { name: "Drizzle", icon: "https://cdn.simpleicons.org/drizzle" },
            { name: "Zod", icon: "https://cdn.simpleicons.org/zod" },
            { name: "TypeBox", icon: "https://raw.githubusercontent.com/sinclairzx81/sinclair-typebox/refs/heads/main/typebox.png" },
        ]},
    ];

    const proximosEstudos = [
        { category: "Frontend", items: [
            { name: "React", icon: "react/react-original" },
        ]},
        { category: "Backend & Arquitetura", items: [
            { name: "Hono", icon: "https://hono.dev/images/logo.svg" },
            { name: "Go", icon: "go/go-original" },
            { name: "Fiber", icon: "fiber/fiber-plain" },
            { name: "C#", icon: "csharp/csharp-plain" },
            { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql" },
        ]},
        { category: "Tipos de Aplicações", items: [
            { name: "MCP", icon: "https://cdn.simpleicons.org/modelcontextprotocol" },
            { name: "Agentes de IA", icon: "https://cdn.simpleicons.org/langchain" },
        ]},
        { category: "Dados & Infraestrutura", items: [
            { name: "MongoDB", icon: "mongodb/mongodb-original" },
            { name: "Docker", icon: "docker/docker-plain" },
            { name: "Python", icon: "python/python-original" },
            { name: "CI/CD", icon: "github/github-original" },
            { name: "Terraform", icon: "https://cdn.simpleicons.org/terraform" },
            { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
        ]},
    ];

    return (
        <main ref={pageRef}>
            <header id="cabelho" ref={headerRef}>
                <h1 className="titulo">Habilidades Técnicas</h1>
                <h3 className="subtitulo">Stack Atual & Direção Técnica</h3>
            </header>

                <section className="cont" ref={atualRef}>
                    <h2 className="titulo">Caixa de Ferramentas (Atual)</h2>
                    <p className="section-subtitle">
                        Tecnologias que utilizo diariamente para construir aplicações robustas, escaláveis e focadas em performance no ecossistema Backend.
                    </p>
                    <div ref={atualGridRef}>
                        {stackAtual.map((group) => (
                            <div
                                key={group.category}
                                className={`skill-category ${expanded.atual === group.category ? 'expanded' : ''}`}
                                onMouseEnter={() => handleEnter('atual', group.category)}
                                onMouseLeave={() => handleLeave('atual')}
                            >
                                <span
                                    className="skill-category-pill"
                                    onClick={() => handleClick('atual', group.category)}
                                >
                                    {group.category}
                                    <span className="skill-category-arrow">{expanded.atual === group.category ? '▾' : '▸'}</span>
                                </span>
                                <div
                                    className="skill-category-grid"
                                    ref={(el) => {
                                        contentRefs.current[`atual-${group.category}`] = el;
                                    }}
                                >
                                    <div className="habilidades-grid">
                                        {group.items.map((skill) => (
                                            <div key={skill.name} className="skill-card" title={descricoes[skill.name] || ''}>
                                                <img
                                                    src={skill.icon.startsWith('http') || skill.icon.startsWith('/')
                                                        ? skill.icon
                                                        : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}.svg`}
                                                    alt={skill.name}
                                                />
                                                <span>{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="cont" ref={proximosRef}>
                    <h2 className="titulo">Próximos Estudos</h2>
                    <p className="section-subtitle">
                        Tecnologias que estou explorando ou pretendo aprofundar, alinhadas à minha direção em backend, performance e arquitetura.
                    </p>
                    <div ref={proximosGridRef}>
                        {proximosEstudos.map((group) => (
                            <div
                                key={group.category}
                                className={`skill-category ${expanded.proximos === group.category ? 'expanded' : ''}`}
                                onMouseEnter={() => handleEnter('proximos', group.category)}
                                onMouseLeave={() => handleLeave('proximos')}
                            >
                                <span
                                    className="skill-category-pill"
                                    onClick={() => handleClick('proximos', group.category)}
                                >
                                    {group.category}
                                    <span className="skill-category-arrow">{expanded.proximos === group.category ? '▾' : '▸'}</span>
                                </span>
                                <div
                                    className="skill-category-grid"
                                    ref={(el) => {
                                        contentRefs.current[`proximos-${group.category}`] = el;
                                    }}
                                >
                                    <div className="habilidades-grid">
                                        {group.items.map((skill) => (
                                            <div key={skill.name} className="skill-card learning" title={descricoes[skill.name] || ''}>
                                                <img
                                                    src={skill.icon.startsWith('http') || skill.icon.startsWith('/')
                                                        ? skill.icon
                                                        : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}.svg`}
                                                    alt={skill.name}
                                                />
                                                <span>{skill.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
    );
}

export { Habilidades };
