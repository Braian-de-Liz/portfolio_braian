import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <p className="hero-ola">Olá, eu sou</p>
                <h1 className="hero-nome">Braian de Liz</h1>
                <h2 className="hero-cargo">Desenvolvedor de Sistemas</h2>
                <p className="hero-desc">
                    Construo aplicações web focadas em performance,
                    arquitetura e escalabilidade.
                </p>
                <div className="hero-tags">
                    <span className="hero-tag">JavaScript</span>
                    <span className="hero-tag">TypeScript</span>
                    <span className="hero-tag">Node.js</span>
                    <span className="hero-tag">Fastify</span>
                </div>
                <Link to="/projetos" className="hero-cta">Ver Projetos</Link>
            </div>
            <div className="hero-foto">
                <img src="ASSETS/imagens/foto_braian.jpg" alt="Braian de Liz" />
            </div>
        </section>
    );
}

export { Hero };
