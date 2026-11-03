import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Contato } from '../components/Contato';
import { useScrollReveal } from '../animations/useScrollReveal';
import { useTiltHover } from '../animations/useTiltHover';

/**
 * Previews de case: cada destaque responde "qual problema",
 * "o que eu construí" e "qual evidência" — na ordem de força técnica.
 * Os números vêm do conteúdo já documentado em cada projeto.
 */
/* Barras do TypeMarks: os três melhores cenários e o baseline em Node.js (mesmos números da página de projetos). */
const BARRAS_TYPEMARKS = [
    { rotulo: 'Bun · Hono · AJV', reqs: 28534 },
    { rotulo: 'Bun · Elysia · TypeBox', reqs: 25915 },
    { rotulo: 'Node · Fastify · AJV', reqs: 14998 },
];

function PreviaVisual({ tipo }) {
    if (tipo === 'amotif') {
        return (
            <img
                className="destaque-previa-img"
                src="/ASSETS/imagens/amotif_home.webp"
                alt=""
                width="1400"
                height="637"
                loading="lazy"
                decoding="async"
            />
        );
    }
    if (tipo === 'typemarks') {
        const maximo = BARRAS_TYPEMARKS[0].reqs;
        return (
            <div className="destaque-previa-barras" aria-hidden="true">
                {BARRAS_TYPEMARKS.map((b) => (
                    <div className="destaque-barra" key={b.rotulo}>
                        <span>{b.rotulo}</span>
                        <i style={{ width: `${(b.reqs / maximo) * 100}%` }} />
                    </div>
                ))}
            </div>
        );
    }
    return (
        <pre className="destaque-previa-codigo" aria-hidden="true">
            <code>{`cpf: zbr.cpf(),\n"111.111.111-11"  // rejeitado`}</code>
        </pre>
    );
}

const DESTAQUES = [
    {
        titulo: 'AMOTIF',
        previa: 'amotif',
        categoria: 'Plataforma full stack',
        problema: 'Músicos em locais diferentes não conseguem compor juntos sem sobrescrever o trabalho um do outro.',
        contribuicao: 'API Fastify sobre Bun com camadas de áudio versionadas, fluxo de aprovação e upload por streaming.',
        evidencia: '40+ endpoints · 14 modelos · 15 migrações',
    },
    {
        titulo: 'TypeMarks',
        previa: 'typemarks',
        categoria: 'Pesquisa de performance',
        problema: 'Escolher validador e runtime por intuição custa throughput em produção.',
        contribuicao: 'Benchmark de 15 cenários combinando runtimes, frameworks e validadores sob carga controlada.',
        evidencia: '28.534 req/s no melhor cenário · 2,94 ms de latência média',
    },
    {
        titulo: 'br_standards_with_zod',
        previa: 'zbr',
        categoria: 'Biblioteca open source',
        problema: 'Validação de documentos brasileiros costuma parar em regex e aceita dados inválidos.',
        contribuicao: 'Validação por dígito verificador integrada ao Zod, publicada no NPM com build ESM e CJS.',
        evidencia: 'Zero dependências em runtime',
    },
];

/** Permite quebrar nomes longos depois de "_" em vez de no meio de uma palavra. */
function comQuebras(titulo) {
    return titulo.split('_').map((parte, i, todas) => (
        <span key={i}>{parte}{i < todas.length - 1 && <>_<wbr /></>}</span>
    ));
}

function Home() {
    const projetosRef = useScrollReveal({ y: 20 });
    const cardsRef = useScrollReveal({ y: 24, children: true, stagger: 0.06 });
    const tiltRef = useTiltHover({ max: 6, scale: 1.015 });

    const setGridRefs = (node) => {
        cardsRef.current = node;
        tiltRef.current = node;
    };

    return (
        <main>
            <Hero />
            <Marquee />

            <section className="secao-aberta projetos-destaque" ref={projetosRef}>
                <span className="eyebrow">Trabalho selecionado</span>
                <h2 className="titulo">Projetos em destaque</h2>
                <p className="section-subtitle">
                    Três projetos que mostram como penso API, dados e performance.
                </p>

                <div className="destaque-grid" ref={setGridRefs}>
                    {DESTAQUES.map((projeto, indice) => (
                        <Link
                            to="/projetos"
                            className="destaque-card"
                            key={projeto.titulo}
                            data-testid="preview-card"
                        >
                            <span className="destaque-num" aria-hidden="true">0{indice + 1}</span>
                            <span className="destaque-categoria">{projeto.categoria}</span>
                            <h3 data-testid="preview-titulo" aria-label={projeto.titulo}>{comQuebras(projeto.titulo)}</h3>
                            <span className="destaque-previa" aria-hidden="true">
                                <PreviaVisual tipo={projeto.previa} />
                            </span>
                            <p className="destaque-problema" data-testid="preview-problema">
                                {projeto.problema}
                            </p>
                            <p className="destaque-contribuicao">{projeto.contribuicao}</p>
                            <span className="destaque-evidencia" data-testid="preview-evidencia">
                                {projeto.evidencia}
                            </span>
                            <span className="destaque-seta" aria-hidden="true">↗</span>
                        </Link>
                    ))}
                </div>

                <div className="sobre-cta-wrap">
                    <Link to="/projetos" className="pagina-boton primario">
                        Ver todos os projetos
                    </Link>
                    <Link to="/sobre" className="pagina-boton">Ver perfil completo</Link>
                </div>
            </section>

            <Contato />
        </main>
    );
}

export { Home };
