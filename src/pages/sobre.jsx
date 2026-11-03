import { Link } from 'react-router-dom';
import { Contato } from '../components/Contato';
import { RetratoSobre } from '../components/RetratoSobre';
import { useScrollReveal } from '../animations/useScrollReveal';

const NUMEROS = [
    { valor: '73', rotulo: 'endpoints no AMOTIF' },
    { valor: '881', rotulo: 'commits no Tchuu-Tchuu' },
    { valor: '15', rotulo: 'cenários medidos no TypeMarks' },
    { valor: '1', rotulo: 'biblioteca publicada no NPM' },
];

const TRAJETORIA = [
    { ano: '2023', titulo: 'Fundamentos', desc: 'Lógica, algoritmos e primeiros projetos.' },
    { ano: '2024', titulo: 'Desenvolvimento de sistemas', desc: 'Web, banco de dados e aplicações práticas.' },
    { ano: '2025', titulo: 'Aplicações completas', desc: 'Projetos com deploy real e integração entre serviços.' },
    { ano: '2026', titulo: 'Engenharia de backend', desc: 'Performance, arquitetura e medição de resultados.' },
];

const EXPERIENCIA = [
    {
        tag: 'Desenvolvimento',
        titulo: 'Desenvolvedor full stack freelancer',
        periodo: 'Projetos pontuais',
        desc: 'Aplicações web para clientes reais, do planejamento ao deploy.',
    },
    {
        tag: 'Indústria',
        titulo: 'Tupy',
        periodo: 'Jovem aprendiz · Controle da qualidade',
        desc: 'Auditei fluxos de produção e acompanhei conformidade, padronização e o tratamento de desvios.',
    },
    {
        tag: 'Voluntariado',
        titulo: 'Torneios de robótica',
        periodo: '2023 — 2024',
        desc: 'Apoio técnico às equipes competidoras, resolvendo problemas durante as competições.',
    },
];

const FORMACAO = [
    {
        curso: 'Análise e Desenvolvimento de Sistemas',
        instituicao: 'UniSenai · 2026 — atual',
        desc: 'Engenharia de software, programação aplicada e desenvolvimento backend.',
    },
    {
        curso: 'Técnico em Desenvolvimento de Sistemas',
        instituicao: 'SESI/SENAI · 2023 — 2025',
        desc: 'Lógica, estruturas de dados, banco de dados, web e projetos colaborativos.',
        documento: {
            href: '/ASSETS/documentos/histórico escolar braian de liz (2).pdf',
            download: 'Historico_Braian_de_Liz.pdf',
            label: 'Histórico escolar',
        },
    },
    {
        curso: 'Técnico em Fundição',
        instituicao: 'SENAI · 2026 — atual',
        desc: 'Processos metalúrgicos, materiais e otimização de processos industriais.',
    },
];

const PRINCIPIOS = [
    {
        titulo: 'Medir antes de decidir',
        desc: 'Comparo alternativas sob carga antes de decidir. Foi assim que o TypeMarks nasceu: para saber quanto a validação de contratos realmente custa em throughput.',
    },
    {
        titulo: 'Arquitetura proporcional ao problema',
        desc: 'No AMOTIF abri mão de camadas MVC porque elas não pagavam seu custo naquele contexto. Cada rota é um plugin que acessa os dados diretamente, com hooks cuidando de autenticação e autorização.',
    },
    {
        titulo: 'Consistência de dados na fronteira',
        desc: 'Valido na entrada, não no meio da regra de negócio. Schemas executáveis garantem que dado inválido não chega à lógica nem ao banco.',
    },
];

function Sobre() {
    const perfilRef = useScrollReveal({ y: 20 });
    const trajetoriaRef = useScrollReveal({ y: 20 });
    const expRef = useScrollReveal({ y: 20 });
    const formacaoRef = useScrollReveal({ y: 20 });
    const principiosRef = useScrollReveal({ y: 20 });
    const numerosRef = useScrollReveal({ y: 16 });
    const estudoRef = useScrollReveal({ y: 16 });

    return (
        <main>
            <header className="secao-aberta pagina-cabecalho">
                <span className="eyebrow">Sobre</span>
                <h1 className="titulo">Por trás do código</h1>
                <p className="section-subtitle">
                    Construo sistemas pensando no que acontece por baixo deles.
                </p>
            </header>

            <section className="secao-aberta sobre-perfil-secao" ref={perfilRef}>
                <RetratoSobre />
                <div className="sobre-perfil-texto">
                <div className="sobre-prosa">
                    <p>
                        Sou desenvolvedor de sistemas com foco em <strong>backend</strong>, com
                        formação técnica em Desenvolvimento de Sistemas e graduação em Análise
                        e Desenvolvimento de Sistemas em andamento.
                    </p>
                    <p>
                        Trabalho principalmente com JavaScript e TypeScript, construindo
                        APIs e serviços. Me importo com a arquitetura, com a integração
                        entre serviços e com a consistência dos dados, e gosto de sistemas
                        que continuam fáceis de manter depois de prontos.
                    </p>
                    <p>
                        Já levei projetos do zero até o deploy e prefiro decidir com
                        medição, não com preferência.
                    </p>
                </div>

                <div className="sobre-links">
                    <a
                        href="https://github.com/Braian-de-Liz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pagina-boton"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/braian-de-liz-da-silva-47385038b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pagina-boton"
                    >
                        LinkedIn
                    </a>
                </div>
                </div>
            </section>

            <section className="secao-aberta" ref={numerosRef} aria-label="Números do trabalho">
                <ul className="sobre-numeros" data-testid="sobre-numeros">
                    {NUMEROS.map((n) => (
                        <li className="sobre-numero" key={n.rotulo}>
                            <span className="sobre-numero-valor">{n.valor}</span>
                            <span className="sobre-numero-rotulo">{n.rotulo}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="secao-aberta" ref={trajetoriaRef}>
                <h2 className="titulo">Evolução técnica</h2>
                <ol className="timeline">
                    {TRAJETORIA.map((etapa) => (
                        <li className="timeline-item" key={etapa.ano}>
                            <span className="timeline-ano">{etapa.ano}</span>
                            <div className="timeline-conteudo">
                                <h3>{etapa.titulo}</h3>
                                <p>{etapa.desc}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="secao-aberta" ref={expRef}>
                <h2 className="titulo">Experiência</h2>
                <div className="sobre-exp-items">
                    {EXPERIENCIA.map((item) => (
                        <article className="sobre-exp-item" key={item.titulo}>
                            <span className="sobre-exp-tag">{item.tag}</span>
                            <h3>{item.titulo}</h3>
                            <span className="sobre-exp-sub">{item.periodo}</span>
                            <p className="sobre-exp-desc">{item.desc}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="secao-aberta" ref={formacaoRef}>
                <h2 className="titulo">Formação</h2>
                <div className="sobre-formacao-items">
                    {FORMACAO.map((item) => (
                        <article className="sobre-formacao-item" key={item.curso}>
                            <div className="sobre-formacao-info">
                                <h3>{item.curso}</h3>
                                <span className="sobre-formacao-local">{item.instituicao}</span>
                                <p className="sobre-formacao-desc">{item.desc}</p>
                            </div>
                            {item.documento ? (
                                <a
                                    href={item.documento.href}
                                    download={item.documento.download}
                                    className="pagina-boton"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.documento.label}
                                </a>
                            ) : null}
                        </article>
                    ))}
                </div>
            </section>

            <section className="secao-aberta" ref={principiosRef}>
                <h2 className="titulo">Como eu decido</h2>
                <div className="sobre-principios">
                    {PRINCIPIOS.map((principio) => (
                        <article className="sobre-principio" key={principio.titulo}>
                            <h3>{principio.titulo}</h3>
                            <p>{principio.desc}</p>
                        </article>
                    ))}
                </div>

                <div className="sobre-cta-wrap">
                    <Link to="/habilidades" className="pagina-boton primario">
                        Ver habilidades técnicas
                    </Link>
                </div>
            </section>

            <section className="secao-aberta sobre-estudo" ref={estudoRef}>
                <span className="eyebrow">Em estudo agora</span>
                <p className="sobre-estudo-texto" data-testid="sobre-estudo">
                    <strong>Go com Fiber</strong>, depois <strong>LangChain</strong> em
                    TypeScript integrado a <strong>MCP</strong>.
                </p>
            </section>

            <Contato />
        </main>
    );
}

export { Sobre };
