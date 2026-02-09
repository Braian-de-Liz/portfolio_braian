function Projetos() {
    return (
        <>
            <main>
                {/* PROJETO 1: BIBLIOTECA BR STANDARDS (DESTAQUE) */}
                <section className="cont">
                    <div>
                        <h2 className="titulo">br_standards_with_zod</h2>
                        <p style={{ marginBottom: '20px' }}>
                            Biblioteca open-source para validação rigorosa de documentos brasileiros. 
                            Garante integridade de dados com validação matemática de dígitos verificadores e integração nativa ao ecossistema Zod.
                        </p>
                    </div>

                    {/* Representação visual do código (Power Feature) */}
                    <div className="code-display">
                        <pre>
                            <code>
{`// Exemplo de uso:
const schema = z.object({
  cpf: zbr.cpf(),
  cnpj: zbr.cnpj(),
  tel: zbr.tel()
});`}
                            </code>
                        </pre>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <a href="https://github.com/Braian-de-Liz/br_standards_with_zod" className="pagina-boton">GitHub</a>
                        <a href="https://www.npmjs.com/package/br_standards_with_zod" className="pagina-boton">Ver no NPM</a>
                        <a href="https://zbr-view-7bc2.vercel.app/" className="pagina-boton">Site do Projeto</a>
                    </div>
                </section>

                {/* PROJETO 2: TCHUU-TCHUU */}
                <section className="cont">
                    <div>
                        <h2 className="titulo">Tchuu-Tchuu</h2>
                        <p>Projeto para desenvolver aplicativo/site de serviço de monitoramento de trens em tempo real.</p>
                    </div>

                    <div className="exibir">
                        <div><img loading="lazy" src="URL_DA_IMG" alt="Preview 1" className="imge" /></div>
                        <div><img loading="lazy" src="URL_DA_IMG" alt="Preview 2" className="imge" /></div>
                    </div>
                </section>

                {/* PROJETO 3: CHAT-FUNCIONAL */}
                <section className="cont">
                    <div>
                        <h2 className="titulo">Chat-Funcional</h2>
                        <p>
                            Sistema de mensagens em tempo real utilizando WebSockets para comunicação bidirecional entre múltiplos usuários.
                        </p>
                    </div>

                    <div className="exibir">
                        <div className="exibir-form">
                            <img loading="lazy" src="URL_DA_IMG" alt="Login Escuro" className="imge" />
                            <h4>Login da página</h4>
                        </div>
                        <div className="exibir-form">
                            <img loading="lazy" src="URL_DA_IMG" alt="Login Claro" className="imge" />
                            <h4>Modo Claro do login</h4>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <a href="https://github.com/Braian-de-Liz/chat-funcional" className="pagina-boton">Repositório</a>
                        <a href="https://chat-funcional-braian-de-liz.onrender.com/" className="pagina-boton">Live Demo</a>
                    </div>
                </section>
            </main>
        </>
    )
}

export { Projetos };