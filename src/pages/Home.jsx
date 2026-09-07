import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';

function Home() {
    return (
        <main>
            <Hero />

            <section className="especialidades">
                <h2 className="titulo">Especialidades</h2>
                <div className="especialidades-grid">
                    <div className="especialidade-card">
                        <h3>Backend</h3>
                        <p> APIs robustas com Fastify, validação de schemas e arquitetura orientada a plugins.</p>
                    </div>
                    <div className="especialidade-card">
                        <h3>Performance</h3>
                        <p>Benchmarks reais, runtimes alternativos e validação JIT para máxima throughput.</p>
                    </div>
                    <div className="especialidade-card">
                        <h3>Arquitetura</h3>
                        <p>Sistemas modulares, versionamento de dados, autenticação em camadas e microsserviços.</p>
                    </div>
                </div>
            </section>

            <section className="projetos-destaque">
                <h2 className="titulo">Projetos em Destaque</h2>
                <div className="destaque-grid">
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
        </main>
    );
}

export { Home };
