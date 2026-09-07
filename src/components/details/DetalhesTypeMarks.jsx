function DetalhesTypeMarks() {
    return (
        <div className="detalhes-arquitetura">
            <div className="detalhes-secao">
                <h4>Metodologia Científica</h4>
                <ul>
                    <li>100 conexões simultâneas por teste</li>
                    <li>10 segundos de duração por rodada</li>
                    <li>5 rodadas consecutivas por cenário</li>
                    <li>Payload JSON complexo: UUIDs, regex, arrays, objetos nested, <code>additionalProperties: false</code></li>
                    <li>Hardware isolado, warm-up analisado</li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Matriz de Cenários (15 combinações)</h4>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Runtime</th>
                            <th>Framework</th>
                            <th>Validador</th>
                            <th>Req/s</th>
                            <th>Latência</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Bun</td>
                            <td>Hono</td>
                            <td>AJV</td>
                            <td><div className="detalhes-highlight"><span className="detalhes-highlight-numero">28.534</span><span className="detalhes-highlight-label">req/s</span></div></td>
                            <td>2,94ms</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Bun</td>
                            <td>Elysia</td>
                            <td>TypeBox</td>
                            <td>25.915</td>
                            <td>3,45ms</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Bun</td>
                            <td>Hono</td>
                            <td>Schema-Shield</td>
                            <td>25.021</td>
                            <td>3,61ms</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Bun</td>
                            <td>Fastify</td>
                            <td>AJV</td>
                            <td>22.527</td>
                            <td>3,93ms</td>
                        </tr>
                        <tr>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>15</td>
                            <td>Node</td>
                            <td>Fastify</td>
                            <td>Yup</td>
                            <td>5.974</td>
                            <td>16,35ms</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="detalhes-secao">
                <h4>Conclusões Chave</h4>
                <ul>
                    <li><strong>Bun é +45-52% mais rápido</strong> que Node.js para validadores compilados (AJV, Typia, Schema-Shield, Zod)</li>
                    <li><strong>Ordem de performance idêntica</strong> em ambos runtimes: AJV &gt; Typia &gt; Schema-Shield &gt; Zod &gt; Yup</li>
                    <li><strong>Node.js tem curva de warm-up:</strong> +10-23% entre rodada 1 e 5; Bun opera no pico desde a rodada 1   crítico para serverless</li>
                    <li><strong>Validação custa ~61%</strong> do throughput bruto (58k req/s rota vazia vs 22k com schema complexo)</li>
                    <li><strong>AJV vence até no Bun</strong> apesar de code generation dinâmico   JSC JIT lidou bem após compilação</li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Recomendações por Caso de Uso</h4>
                <ul>
                    <li><strong>Microservices / Edge / Serverless:</strong> Hono + AJV no Bun (28.534 req/s)</li>
                    <li><strong>APIs / Monólitos / Corporate:</strong> Fastify + AJV no Bun (22.527 req/s) ou Node (14.998 req/s)</li>
                    <li><strong>Aplicações grandes:</strong> Fastify recomendado sobre Elysia por ecossistema de plugins maduro</li>
                    <li><strong>Edge com cold start crítico:</strong> Schema-Shield (compilação mais leve que AJV)</li>
                </ul>
            </div>
        </div>
    );
}

export { DetalhesTypeMarks };
