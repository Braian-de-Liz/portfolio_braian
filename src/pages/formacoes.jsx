function Formacoes() {
    return (
        <>
            <header id="cabelho">
                <h1>Braian de Liz</h1>
                <h3>Trajetória e Conquistas</h3>
            </header>

            <main>
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