import { useScrollReveal } from '../animations/useScrollReveal';

function Sobre() {
    const heroRef = useScrollReveal({ y: 25 });
    const perfilRef = useScrollReveal({ y: 25 });
    const perfilContentRef = useScrollReveal({ y: 20, children: true, stagger: 0.06 });
    const trajetoriaRef = useScrollReveal({ y: 25 });
    const trajetoriaItemsRef = useScrollReveal({ y: 20, children: true, stagger: 0.08 });
    const comoRef = useScrollReveal({ y: 25 });
    const comoCardsRef = useScrollReveal({ y: 20, children: true, stagger: 0.06 });
    const formacaoRef = useScrollReveal({ y: 25 });
    const formacaoItemsRef = useScrollReveal({ y: 20, children: true, stagger: 0.08 });
    const expRef = useScrollReveal({ y: 25 });
    const expItemsRef = useScrollReveal({ y: 20, children: true, stagger: 0.08 });
    const docsRef = useScrollReveal({ y: 20 });

    return (
        <main>
            {/* HERO DO SOBRE */}
            <section className="sobre-hero" ref={heroRef}>
                <h1 className="titulo">Por trás do código.</h1>
                <p className="sobre-hero-sub">
                    Construo sistemas pensando no que acontece por baixo deles.
                </p>
            </section>

            {/* 01 — PERFIL */}
            <section className="cont" ref={perfilRef}>
                <div className="sobre-secao-numero">01</div>
                <h2 className="titulo">Perfil</h2>

                <div className="sobre-perfil" ref={perfilContentRef}>
                    <img src="ASSETS/imagens/foto_braian.jpg" alt="Braian de Liz" className="sobre-foto" />
                    <div className="sobre-perfil-texto">
                        <p>
                            Desenvolvedor de Sistemas com foco em backend e no ecossistema TypeScript/JavaScript.
                            Tenho interesse em construção de APIs, arquitetura de sistemas, performance,
                            bancos relacionais e processamento eficiente de dados.
                        </p>
                        <p>
                            Especializado em Bun, Node.js, Fastify e React, com experiência em
                            microsserviços em Go e bancos relacionais como PostgreSQL.
                        </p>
                        <div className="sobre-links">
                            <a href="https://github.com/Braian-de-Liz" target="_blank" rel="noopener noreferrer" className="social-floating-btn">
                                <svg height="20" viewBox="0 0 16 16" width="20" fill="currentColor">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                <span>GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/braian-de-liz-da-silva-47385038b/" target="_blank" rel="noopener noreferrer" className="social-floating-btn">
                                <svg height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 02 — TRAJETÓRIA */}
            <section className="cont" ref={trajetoriaRef}>
                <div className="sobre-secao-numero">02</div>
                <h2 className="titulo">Trajetória</h2>

                <div className="timeline" ref={trajetoriaItemsRef}>
                    <div className="timeline-item">
                        <span className="timeline-ano">2023</span>
                        <div className="timeline-conteudo">
                            <h3>Lógica de Desenvolvimento de Sistemas</h3>
                            <p>Base fundamental em algoritmos e estruturação de dados.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <span className="timeline-ano">2024</span>
                        <div className="timeline-conteudo">
                            <h3>Técnico em Desenvolvimento de Sistemas</h3>
                            <p>Curso técnico de 2 anos integrado ao Ensino Médio na Escola SESI de Referência Joinville.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <span className="timeline-ano">2025</span>
                        <div className="timeline-conteudo">
                            <h3>Tchuu-Tchuu</h3>
                            <p>Plataforma de monitoramento de trens em tempo real — Full Stack com Fastify, WebSocket e PostgreSQL.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <span className="timeline-ano">2026</span>
                        <div className="timeline-conteudo">
                            <h3>AMOTIF</h3>
                            <p>Plataforma de colaboração musical assíncrona — "Git para músicos". Arquitetura Fastify-Native com 40+ endpoints.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <span className="timeline-ano">2026</span>
                        <div className="timeline-conteudo">
                            <h3>TypeMarks</h3>
                            <p>Benchmark científico comparando 15 cenários de validação de schemas — Bun + Hono + AJV = 28.534 req/s.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 03 — COMO EU TRABALHO */}
            <section className="cont" ref={comoRef}>
                <div className="sobre-secao-numero">03</div>
                <h2 className="titulo">Como eu construo</h2>

                <div className="sobre-abordagens" ref={comoCardsRef}>
                    <div className="sobre-abordagem">
                        <h3>Performance</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>Prefiro entender o custo das abstrações. Cada framework tem um preço — eu busco medir antes de escolher.</p>
                    </div>

                    <div className="sobre-abordagem">
                        <h3>Arquitetura</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>Sistemas modulares com responsabilidades claras. Plugins sobre heranças. Composição sobre configuração.</p>
                    </div>

                    <div className="sobre-abordagem">
                        <h3>Tipagem</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>TypeScript não é opcional. Schemas validam em runtime o que o compilador garante em build.</p>
                    </div>

                    <div className="sobre-abordagem">
                        <h3>Dados</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>Bancos relacionais com integridade. Migrations versionadas. Modelos que refletem o domínio, não a interface.</p>
                    </div>
                </div>
            </section>

            {/* 04 — FORMAÇÃO */}
            <section className="cont" ref={formacaoRef}>
                <div className="sobre-secao-numero">04</div>
                <h2 className="titulo">Formação</h2>

                <div className="sobre-formacao-items" ref={formacaoItemsRef}>
                    <div className="sobre-formacao-item">
                        <div className="sobre-formacao-info">
                            <h3>Técnico em Desenvolvimento de Sistemas</h3>
                            <span className="sobre-formacao-local">Escola SESI de Referência Joinville</span>
                        </div>
                        <a
                            href="/ASSETS/documentos/histórico escolar braian de liz (2).pdf"
                            download="Historico_Braian_de_Liz.pdf"
                            className="pagina-boton"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Certificado
                        </a>
                    </div>

                    <div className="sobre-formacao-item">
                        <div className="sobre-formacao-info">
                            <h3>Ensino Médio</h3>
                            <span className="sobre-formacao-local">Escola SESI de Referência Joinville</span>
                        </div>
                        <a
                            href="/ASSETS/documentos/histórico escolar braian de liz (2).pdf"
                            download="Historico_Braian_de_Liz.pdf"
                            className="pagina-boton"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Histórico
                        </a>
                    </div>
                </div>
            </section>

            {/* 05 — EXPERIÊNCIAS */}
            <section className="cont" ref={expRef}>
                <div className="sobre-secao-numero">05</div>
                <h2 className="titulo">Experiências</h2>

                <div className="sobre-formacao-items" ref={expItemsRef}>
                    <div className="sobre-formacao-item">
                        <div className="sobre-formacao-info">
                            <h3>Voluntariado: Torneio de Robótica FLL</h3>
                            <span className="sobre-formacao-local">40 horas — organização e guia de equipes</span>
                        </div>
                    </div>

                    <div className="sobre-formacao-item">
                        <div className="sobre-formacao-info">
                            <h3>Voluntário no SESI LAB</h3>
                            <span className="sobre-formacao-local">Monitoria em exposições interativas — ciência, tecnologia e arte</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* DOCUMENTOS */}
            <section className="sobre-docs" ref={docsRef}>
                <p className="sobre-docs-texto">
                    Quer conhecer minha trajetória profissional em detalhes?
                </p>
                <a
                    href="/ASSETS/documentos/Currículo Braian de Liz.pdf"
                    download="Curriculo_Braian_de_Liz.pdf"
                    className="pagina-boton sobre-docs-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Baixar currículo PDF
                </a>
                <div className="sobre-docs-links">
                    <a href="https://github.com/Braian-de-Liz" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/braian-de-liz-da-silva-47385038b/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
            </section>
        </main>
    );
}

export { Sobre };
