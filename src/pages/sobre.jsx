import { Link } from 'react-router-dom';
import { useScrollReveal } from '../animations/useScrollReveal';

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
        desc: 'Planejamento, arquitetura, desenvolvimento e deploy de aplicações web para clientes reais.',
    },
    {
        tag: 'Indústria',
        titulo: 'Tupy',
        periodo: 'Jovem aprendiz · Controle da qualidade',
        desc: 'Auditoria técnica de fluxos de produção, acompanhando conformidade, padronização e tratamento de desvios.',
    },
    {
        tag: 'Voluntariado',
        titulo: 'Torneios de robótica',
        periodo: '2023 — 2024',
        desc: 'Apoio técnico às equipes competidoras, com resolução de problemas sob pressão e trabalho em equipe.',
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
        titulo: 'Performance medida, não presumida',
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
    const cvRef = useScrollReveal({ y: 16 });

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
                <div className="sobre-prosa">
                    <p>
                        Sou desenvolvedor de sistemas com foco em <strong>backend</strong>, com
                        formação técnica em Desenvolvimento de Sistemas e graduação em Análise
                        e Desenvolvimento de Sistemas em andamento.
                    </p>
                    <p>
                        Trabalho principalmente no ecossistema JavaScript e TypeScript,
                        construindo APIs e serviços com atenção a arquitetura, integração
                        entre serviços e consistência de dados. Meu interesse está em sistemas
                        que precisam ser eficientes e sustentáveis de manter.
                    </p>
                    <p>
                        Tenho experiência prática desde a estruturação da aplicação até o
                        deploy, e gosto de fundamentar decisões técnicas em medição em vez
                        de preferência.
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

            <section className="secao-aberta sobre-docs" ref={cvRef}>
                <p className="sobre-docs-texto">Quer o documento completo?</p>
                <a
                    href="/ASSETS/documentos/Currículo Braian de Liz.pdf"
                    download="Curriculo_Braian_de_Liz.pdf"
                    className="pagina-boton"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Baixar currículo em PDF
                </a>
            </section>
        </main>
    );
}

export { Sobre };
