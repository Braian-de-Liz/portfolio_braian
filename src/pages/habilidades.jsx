function Habilidades() {
    const stackAtual = [
        { name: "TypeScript", icon: "typescript-plain" },
        { name: "Fastify", icon: "fastify-plain" },
        { name: "Node.js", icon: "nodejs-plain" },
        { name: "PostgreSQL", icon: "postgresql-plain" },
        { name: "Express", icon: "express-original" },
        { name: "MySQL", icon: "mysql-plain" },
        { name: "JavaScript", icon: "javascript-plain" },
        { name: "HTML5", icon: "html5-plain" },
        { name: "CSS3", icon: "css3-plain" },
    ];

    const proximosEstudos = [
        { name: "Bun", icon: "bun-plain" },
        { name: "React", icon: "react-original" },
        { name: "Nest.js", icon: "nestjs-plain" },
        { name: "Python", icon: "python-plain" },
        { name: "C#", icon: "csharp-plain" },
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
                    </div>
                    <div className="habilidades-grid">
                        {stackAtual.map((skill) => (
                            <div key={skill.name} className="skill-card">
                                <img 
                                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon.split('-')[0]}/${skill.icon}.svg`} 
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
                    </div>
                    <div className="habilidades-grid">
                        {proximosEstudos.map((skill) => (
                            <div key={skill.name} className="skill-card learning">
                                <img 
                                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon.split('-')[0]}/${skill.icon}.svg`} 
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