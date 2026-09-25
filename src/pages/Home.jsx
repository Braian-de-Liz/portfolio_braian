import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { useScrollReveal } from '../animations/useScrollReveal';

/**
 * Previews de case: cada destaque responde "qual problema",
 * "o que eu construí" e "qual evidência" — na ordem de força técnica.
 * Os números vêm do conteúdo já documentado em cada projeto.
 */
const DESTAQUES = [
    {
        titulo: 'AMOTIF',
        categoria: 'Plataforma full stack',
        problema: 'Músicos em locais diferentes não conseguem compor juntos sem sobrescrever o trabalho um do outro.',
        contribuicao: 'API Fastify sobre Bun com camadas de áudio versionadas, fluxo de aprovação e upload por streaming.',
        evidencia: '40+ endpoints · 14 modelos · 15 migrações',
    },
    {
        titulo: 'TypeMarks',
        categoria: 'Pesquisa de performance',
        problema: 'Escolher validador e runtime por intuição custa throughput em produção.',
        contribuicao: 'Benchmark de 15 cenários combinando runtimes, frameworks e validadores sob carga controlada.',
        evidencia: '28.534 req/s no melhor cenário · 2,94 ms de latência média',
    },
    {
        titulo: 'br_standards_with_zod',
        categoria: 'Biblioteca open source',
        problema: 'Validação de documentos brasileiros costuma parar em regex e aceita dados inválidos.',
        contribuicao: 'Validação por dígito verificador integrada ao Zod, publicada no NPM com build ESM e CJS.',
        evidencia: 'Zero dependências em runtime',
    },
];

function Home() {
    const projetosRef = useScrollReveal({ y: 20 });
    const cardsRef = useScrollReveal({ y: 24, children: true, stagger: 0.06 });
    const ctaRef = useScrollReveal({ y: 16 });

    return (
        <main>
            <Hero />

            <section className="secao-aberta projetos-destaque" ref={projetosRef}>
                <span className="eyebrow">Trabalho selecionado</span>
                <h2 className="titulo">Projetos em destaque</h2>
                <p className="section-subtitle">
                    Três projetos que mostram como penso API, dados e performance.
                </p>

                <div className="destaque-grid" ref={cardsRef}>
                    {DESTAQUES.map((projeto) => (
                        <Link
                            to="/projetos"
                            className="destaque-card"
                            key={projeto.titulo}
                            data-testid="preview-card"
                        >
                            <span className="destaque-categoria">{projeto.categoria}</span>
                            <h3 data-testid="preview-titulo">{projeto.titulo}</h3>
                            <p className="destaque-problema" data-testid="preview-problema">
                                {projeto.problema}
                            </p>
                            <p className="destaque-contribuicao">{projeto.contribuicao}</p>
                            <span className="destaque-evidencia" data-testid="preview-evidencia">
                                {projeto.evidencia}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="sobre-cta-wrap">
                    <Link to="/projetos" className="pagina-boton primario">
                        Ver todos os projetos
                    </Link>
                </div>
            </section>

            <section className="secao-aberta home-cta" ref={ctaRef}>
                <p className="home-cta-texto">
                    Quer entender como eu decido arquitetura e meço resultado?
                </p>
                <Link to="/sobre" className="pagina-boton">Ver perfil completo</Link>
            </section>
        </main>
    );
}

export { Home };
