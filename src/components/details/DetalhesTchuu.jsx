function DetalhesTchuu() {
    return (
        <div className="detalhes-arquitetura">
            <div className="detalhes-secao">
                <h4>Arquitetura Modular</h4>
                <p>
                    Três componentes independentes, cada um com deploy e escala próprios — reflexo de uma arquitetura de microsserviços em miniature.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Componente</th>
                            <th>Tech</th>
                            <th>Deploy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Frontend</td>
                            <td>HTML5 / CSS3 / Vanilla JS</td>
                            <td>Render (static site)</td>
                        </tr>
                        <tr>
                            <td>Backend</td>
                            <td>Node.js + Fastify + WebSocket</td>
                            <td>Render (24/7)</td>
                        </tr>
                        <tr>
                            <td>Banco de Dados</td>
                            <td>PostgreSQL (Neon.tech)</td>
                            <td>Cloud, SSL</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="detalhes-secao">
                <h4>Features</h4>
                <ul>
                    <li><strong>Monitoramento IoT:</strong> sensores de trens com telemetria em tempo real via WebSocket</li>
                    <li><strong>Chat Operacional:</strong> comunicação instantânea entre operadores</li>
                    <li><strong>Dashboard:</strong> gráficos dinâmicos de performance com Chart.js</li>
                    <li><strong>Gestão de Manutenção:</strong> status da frota e controle operacional</li>
                    <li><strong>Auth Completa:</strong> login, registro, recuperação de senha com JWT</li>
                    <li><strong>Keep-alive:</strong> endpoint <code>/acordar</code> para manter o Render ativo</li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Dados do Projeto</h4>
                <ul>
                    <li>881 commits — iteração significativa e desenvolvimento contínuo</li>
                    <li>Frontend Vanilla JS — escolha deliberada para entender fundamentos</li>
                    <li>Fastify sobre Express — foco em performance desde o início</li>
                    <li>CORS restritivo: apenas o domínio do frontend autorizado</li>
                    <li>Projeto educacional com deploy real em produção</li>
                </ul>
            </div>
        </div>
    );
}

export { DetalhesTchuu };
