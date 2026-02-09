function Projetos() {
    return (

        <main>
            <section className="cont">
                <div>
                    <h2 className="titulo">br_standards_with_zod</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Biblioteca open-source para validação rigorosa de documentos brasileiros.
                        Garante integridade de dados com validação matemática de dígitos verificadores e integração nativa ao ecossistema Zod.
                    </p>
                </div>

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

            <section className="cont">
                <div>
                    <h2 className="titulo">Tchuu-Tchuu</h2>
                    <p>
                        Projeto para desenvolver aplicativo/site de serviço de monitoramento de trens em tempo real,
                        Projeto Full Stack, Utilizando Node + Fastify para o Back-end e HTML + CSS + JS no Front-end.</p>
                </div>

                <div className="exibir">
                    <div><img loading="lazy" src="ASSETS/imagens/tchuu-tchuu_github.png" alt="Preview 1" className="imge" /></div>
                    <div><img loading="lazy" src="ASSETS\imagens\tchuu-tchuu_login.png" alt="Preview 2" className="imge" /></div>
                    <div><img loading="lazy" src="ASSETS\imagens\inicial_tchuuTchuu.png" alt="Preview 3" className="imge" /></div>
                </div>

                <br />
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <a href="https://github.com/Braian-de-Liz/Tchuu-Tchuu" className="pagina-boton">GitHub</a>
                    <a href="https://tchuu-tchuu-front-end.onrender.com/" className="pagina-boton">Site do tchuu-tchuu</a>
                </div>
            </section>


        </main>

    )
}

export { Projetos };