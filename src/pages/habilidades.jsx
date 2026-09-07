import { useScrollReveal } from '../animations/useScrollReveal';

function Habilidades() {
    const headerRef = useScrollReveal({ y: 20 });
    const atualRef = useScrollReveal({ y: 25 });
    const atualGridRef = useScrollReveal({ y: 30, scale: 0.98, children: true, stagger: 0.05 });
    const proximosRef = useScrollReveal({ y: 25 });
    const proximosGridRef = useScrollReveal({ y: 30, scale: 0.98, children: true, stagger: 0.05 });

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
        "Nest.js": "Framework Node.js progressivo que usa TypeScript, inspirado em Angular para criar aplicações enterprise.",
        "Python": "Linguagem multiparadigma reconhecida por simplicidade, usada em web, data science e AI.",
        "FastAPI": "Framework Python moderno e rápido para criar APIs com validação automática e async native.",
        "C#": "Linguagem orientada a objetos da Microsoft, usada em aplicações enterprise, games (Unity) e .NET.",
        "Elysia": "Framework Bun TypeScript-first com ergonomia excelente e performance exceptional.",
        "Go": "Linguagem do Google compilada, concurrency-native, ideal para microservices e high-performance systems.",
        "Fiber": "Express-like framework Go para web apps, conhecido por performance e baixo footprint de memória em Golang.",
        "MongoDB": "Banco de dados NoSQL orientado a documentos, schema-less com JSON-like documents.",
        "Docker": "Plataforma de containerização que permite empacotar aplicações com suas dependências em containers isolados.",
        "Hono": "Framework web ultrafast para Edge Workers, compatível com múltiplos runtimes (Cloudflare, Deno, Bun, Node.js).",
    };

    const stackAtual = [
        { name: "TypeScript", icon: "typescript/typescript-plain" },
        { name: "Zod", icon: "https://cdn.simpleicons.org/zod" },
        { name: "TypeBox", icon: "https://raw.githubusercontent.com/sinclairzx81/sinclair-typebox/refs/heads/main/typebox.png" },
        { name: "Drizzle", icon: "https://cdn.simpleicons.org/drizzle" },
        { name: "Fastify", icon: "fastify/fastify-plain" },
        { name: "Node.js", icon: "nodejs/nodejs-plain" },
        { name: "Bun", icon: "https://bun.com/logo.svg" },
        { name: "PostgreSQL", icon: "postgresql/postgresql-plain" },
        { name: "Express", icon: "express/express-original" },
        { name: "MySQL", icon: "mysql/mysql-original" },
        { name: "JavaScript", icon: "javascript/javascript-plain" },
        { name: "HTML5", icon: "html5/html5-plain" },
        { name: "CSS3", icon: "css3/css3-plain" },
    ];

    const proximosEstudos = [
        { name: "React", icon: "react/react-original" },
        { name: "Nest.js", icon: "nestjs/nestjs-original" },
        { name: "Python", icon: "/ASSETS/imagens/python.png" },
        { name: "FastAPI", icon: "fastapi/fastapi-original" },
        { name: "C#", icon: "csharp/csharp-plain" },
        { name: "Elysia", icon: "https://avatars.githubusercontent.com/u/119793569?s=200&v=4" },
        { name: "Go", icon: "go/go-original" },
        { name: "Fiber", icon: "fiber/fiber-plain" },
        { name: "MongoDB", icon: "mongodb/mongodb-original" },
        { name: "Docker", icon: "docker/docker-plain" },
        { name: "Hono", icon: "https://hono.dev/images/logo.svg" },
    ];

    return (
        <>
            <header id="cabelho" ref={headerRef}>
                <h1 className="titulo">Habilidades Técnicas</h1>
                <h3 className="subtitulo">Minha Stack de Desenvolvimento</h3>
            </header>

            <main>
                <section className="cont" ref={atualRef}>
                    <div className="titulo">
                        <h2>Caixa de Ferramentas (Atual)</h2>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '10px' }}>
                            Tecnologias que utilizo diariamente para construir aplicações robustas, escaláveis e focadas em performance no ecossistema Backend.
                        </p>
                    </div>
                    <div className="habilidades-grid" ref={atualGridRef}>
                        {stackAtual.map((skill) => (
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
                </section>

                <section className="cont" ref={proximosRef}>
                    <div className="titulo">
                        <h2>Próximos Estudos</h2>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '10px' }}>
                            Minha jornada de aprendizado contínuo. Atualmente focado em expandir meu conhecimento para o Frontend moderno e arquiteturas de alto nível.
                        </p>
                    </div>
                    <div className="habilidades-grid" ref={proximosGridRef}>
                        {proximosEstudos.map((skill) => (
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
                </section>
            </main>
        </>
    );
}

export { Habilidades };
