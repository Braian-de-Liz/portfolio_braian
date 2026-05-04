function Habilidades() {
    const stackAtual = [
        { name: "TypeScript", icon: "typescript/typescript-plain" },
        { name: "Zod", icon: "https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" },
        { name: "Fastify", icon: "fastify/fastify-plain" },
        { name: "Node.js", icon: "nodejs/nodejs-plain" },
        { name: "Bun", icon: "bun/bun-plain" },
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
        { name: "Python", icon: "python/python-plain" },
        { name: "FastAPI", icon: "fastapi/fastapi-original" },
        { name: "C#", icon: "csharp/csharp-plain" },
    ];

    return (
        <>
            <header id="cabelho">
                <h1 className="titulo">Habilidades Técnicas</h1>
                <h3 className="subtitulo">Minha Stack de Desenvolvimento</h3>
            </header>

            <main>
                <section className="cont">
                    <div className="titulo">
                        <h2>Caixa de Ferramentas (Atual)</h2>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '10px' }}>
                            Tecnologias que utilizo diariamente para construir aplicações robustas, escaláveis e focadas em performance no ecossistema Backend.
                        </p>
                    </div>
                    <div className="habilidades-grid">
                        {stackAtual.map((skill) => (
                            <div key={skill.name} className="skill-card">
                                <img
                                    src={skill.icon.startsWith('http')
                                        ? skill.icon
                                        : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}.svg`}
                                    alt={skill.name}
                                />
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="cont">
                    <div className="titulo">
                        <h2>Próximos Estudos</h2>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '10px' }}>
                            Minha jornada de aprendizado contínuo. Atualmente focado em expandir meu conhecimento para o Frontend moderno e arquiteturas de alto nível.
                        </p>
                    </div>
                    <div className="habilidades-grid">
                        {proximosEstudos.map((skill) => (
                            <div key={skill.name} className="skill-card learning">
                                <img
                                    src={skill.icon.startsWith('http')
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