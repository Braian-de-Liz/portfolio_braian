function Formacoes() {
    return (
        <>
            <header id="cabelho">
                <h1>Braian de Liz</h1>
                <h3>Trajetória e Conquistas</h3>
            </header>

            <main>
                <section className="cont destaque">
                    <div className="titulo">
                        <h2>Currículo Profissional</h2>
                    </div>

                    <div className="curriculo-perfil">
                        <img src="ASSETS/imagens/foto_braian.jpg" alt="Braian de Liz" className="foto-perfil" />
                        <div className="curriculo-info">
                            <h3 className="curriculo-nome">Braian de Liz da Silva</h3>
                            <p className="curriculo-cargo">Desenvolvedor Backend</p>
                            <p className="curriculo-descricao">
                                Construo aplicações robustas com foco em performance — do schema validation ao deploy. Especializado no ecossistema TypeScript/JavaScript (Bun, Node.js, Fastify, React) com microsserviços em Go e bancos relacionais.
                            </p>
                            <div className="curriculo-contatos">
                                <a href="https://github.com/Braian-de-Liz" target="_blank" rel="noopener noreferrer" className="social-floating-btn">
                                    <svg height="24" viewBox="0 0 16 16" width="24" fill="currentColor">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/braian-de-liz-da-silva-47385038b/" target="_blank" rel="noopener noreferrer" className="social-floating-btn">
                                    <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="curriculo-tags">
                        <span className="skill-tag">Bun</span>
                        <span className="skill-tag">Node.js</span>
                        <span className="skill-tag">TypeScript</span>
                        <span className="skill-tag">Fastify</span>
                        <span className="skill-tag">React</span>
                        {/* <span className="skill-tag">Go</span> */}
                        <span className="skill-tag">PostgreSQL</span>
                        {/* <span className="skill-tag">Docker</span> */}
                        <span className="skill-tag">Prisma</span>
                        <span className="skill-tag">Drizzle</span>
                        <span className="skill-tag">Zod</span>
                    </div>

                    <a
                        href="/ASSETS/documentos/Currículo Braian de Liz.pdf"
                        download="Curriculo_Braian_de_Liz.pdf"
                        className="pagina-boton curriculo-download"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ⬇ Baixar Currículo (PDF)
                    </a>
                </section>

                <section className="cont">
                    <div className="titulo">
                        <h2>Formação Técnica</h2>
                    </div>

                    <div className="o">
                        <div className="exibir-form">
                            <h3>Lógica de Desenvolvimento de Sistemas</h3>
                            <img loading="lazy" src="/ASSETS/imagens/certificado-lógicadeDS.jpg" alt="Certificado Lógica" />
                            <h4>Base fundamental em algoritmos e estruturação de dados.</h4>
                        </div>
                    </div>

                    <hr />
                    <br /><br /><br />

                    <div className="o">
                        <div className="exibir-form">
                            <h3>Técnico em Desenvolvimento de Sistemas</h3>
                            <img src="ASSETS/imagens/certificado_EM.png" alt="" />
                            <br />
                            <a
                                href="/ASSETS/documentos/histórico escolar braian de liz (2).pdf"
                                download="Historico_Braian_de_Liz.pdf"
                                className="pagina-boton"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginTop: '15px' }}
                            >
                            Certificado Técnico
                            </a>

                            <h4>Curso Técnico de Desenvolvimento de Sistemas de 2 anos, integrado ao Ensino Médio da Escola SESI de Referência de Joiville</h4>
                        </div>
                    </div>

                </section>

                <section className="cont">
                    <div className="titulo">
                        <h2>Experiências & Voluntariado</h2>
                    </div>
                    <div className="o">
                        <div className="exibir-form">
                            <h3>Voluntariado: Torneio de Robótica FLL</h3>
                            <img loading="lazy" src="/ASSETS/imagens/certificaçãoVoluntária.jpg" alt="Voluntário Robótica"/>
                            <h4>Atuação na organização e guia de equipes (40 horas).</h4>
                        </div>

                        <hr />

                        <div className="exibir-form">
                            <h3>Vonluntário no SESI LAB</h3>
                            <img loading="lazy" src="/ASSETS/imagens/certificado-sesilab.jpg" alt="SESI LAB"/>
                            <h4>Monitoria em exposições interativas, unindo ciência, tecnologia e arte para o público.</h4>
                        </div>
                    </div>
                </section>

                <section className="cont">
                    <div className="titulo">
                        <h2>Educação</h2>
                    </div>
                    <div className="o">
                        <div className="exibir-form">
                            <h3>Ensino Médio</h3>
                            <h4>Escola SESI de Referência Joinville</h4>

                            <a
                                href="/ASSETS/documentos/histórico escolar braian de liz (2).pdf"
                                download="Historico_Braian_de_Liz.pdf"
                                className="pagina-boton"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginTop: '15px' }}
                            >
                                Baixar Histórico Escolar / Técnico
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export { Formacoes };