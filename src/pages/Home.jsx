import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { useScrollReveal } from '../animations/useScrollReveal';

function Home() {
    const projetosRef = useScrollReveal({ y: 30 });
    const projetosCardsRef = useScrollReveal({ y: 40, scale: 0.98, children: true, stagger: 0.06 });
    const ctaRef = useScrollReveal({ y: 20 });

    return (
        <main>
            <Hero />

            <section className="projetos-destaque" ref={projetosRef}>
                <h2 className="titulo">Projetos em Destaque</h2>
                <div className="destaque-grid" ref={projetosCardsRef}>
                    <Link to="/projetos" className="destaque-card">
                        <h3>AMOTIF</h3>
                        <p>Colaboração musical assíncrona — "Git para músicos". Full stack com Bun, Fastify, React 19 e mixer virtual in-browser.</p>
                        <span className="destaque-tag">Full Stack</span>
                    </Link>
                    <Link to="/projetos" className="destaque-card">
                        <h3>br_standards_with_zod</h3>
                        <p>Biblioteca open-source para validação matemática de documentos brasileiros com integração nativa ao Zod.</p>
                        <span className="destaque-tag">Open Source</span>
                    </Link>
                    <Link to="/projetos" className="destaque-card">
                        <h3>TypeMarks</h3>
                        <p>Benchmark científico comparando 15 cenários de validação de schemas — Bun + Hono + AJV = 28.534 req/s.</p>
                        <span className="destaque-tag">Performance</span>
                    </Link>
                </div>
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <Link to="/projetos" className="pagina-boton">Ver Todos os Projetos</Link>
                </div>
            </section>

            <section className="home-cta" ref={ctaRef}>
                <p className="home-cta-texto">Quer conhecer minha trajetória e como penso sistemas?</p>
                <Link to="/sobre" className="hero-cta">Conheça meu perfil</Link>
            </section>
        </main>
    );
}

export { Home };
