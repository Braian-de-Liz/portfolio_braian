import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { useScrollReveal } from '../animations/useScrollReveal';
import { usePageEntry } from '../animations/usePageEntry';
import { useRevealTitle } from '../animations/useRevealTitle';

function Home() {
    const pageRef = usePageEntry();
    const projetosRef = useScrollReveal({ y: 30 });
    const projetosCardsRef = useScrollReveal({ y: 40, scale: 0.98, children: true, stagger: 0.06 });
    const ctaRef = useScrollReveal({ y: 20 });
    const projetosTitleRef = useRevealTitle();

    return (
        <main ref={pageRef}>
            <Hero />

            <section className="projetos-destaque" ref={projetosRef}>
                <h2 className="titulo" ref={projetosTitleRef}>Projetos em Destaque</h2>
                <div className="destaque-grid" ref={projetosCardsRef}>
                    <Link to="/projetos" className="destaque-card">
                        <h3>AMOTIF</h3>
                        <p>Plataforma de colaboração musical assíncrona com mixer virtual in-browser.</p>
                        <span className="destaque-tag">Full Stack</span>
                    </Link>
                    <Link to="/projetos" className="destaque-card">
                        <h3>br_standards_with_zod</h3>
                        <p>Biblioteca open-source de validação de documentos brasileiros.</p>
                        <span className="destaque-tag">Open Source</span>
                    </Link>
                    <Link to="/projetos" className="destaque-card">
                        <h3>TypeMarks</h3>
                        <p>Benchmark científico de validação de schemas com 15 cenários comparativos.</p>
                        <span className="destaque-tag">Performance</span>
                    </Link>
                </div>
                <div className="sobre-cta-wrap">
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
