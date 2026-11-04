import { TODOS_CENARIOS_TYPEMARKS } from '../../data/typemarks';

const formatador = new Intl.NumberFormat('pt-BR');

function DetalhesTypeMarks() {
    return (
        <div className="detalhes-arquitetura">
            <div className="detalhes-secao">
                <h4>Metodologia</h4>
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
                <div className="tabela-scroll">
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
                        {TODOS_CENARIOS_TYPEMARKS.map((c) => (
                            <tr key={c.rank}>
                                <td>{c.rank}</td>
                                <td>{c.runtime}</td>
                                <td>{c.framework}</td>
                                <td>{c.validador}</td>
                                <td>
                                    {c.rank === 1 ? (
                                        <div className="detalhes-highlight">
                                            <span className="detalhes-highlight-numero">{formatador.format(Math.round(c.reqs))}</span>
                                            <span className="detalhes-highlight-label">req/s</span>
                                        </div>
                                    ) : formatador.format(Math.round(c.reqs))}
                                </td>
                                <td>{c.latencia.replace(' ms', 'ms')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>

            <div className="detalhes-secao">
                <h4>Payload dos Testes</h4>
                <p className="detalhes-payload-desc">
                    Objeto complexo com validação rigorosa, usado em todos os 15 cenários:
                </p>
                <div className="bloco-codigo">
                    <div className="bloco-codigo-cabecalho">
                        <span className="bloco-codigo-arquivo">typemarks.payload.js</span>
                    </div>
                    <pre>
                        <code>{`const payloadValido = {
  projetoId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  timestamp: 1717872234,
  configuracoes: {
    taxaAmostragem: 48000,
    bitrate: 320,
    formato: "wav",
    efeitosAtivos: ["reverb", "delay", "compressor", "limiter"],
  },
  camadasAnalise: [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      nomeTrilha: "Vocal Principal - Take 3",
      volume: 0.85,
      delayOffset: -12.5,
      tagsInstrumentos: ["vocal", "lead"],
      metadadosFrequencia: [
        { hz: 60, ganho: -2.5, q: 1.4 },
        { hz: 250, ganho: 1.2, q: 0.7 },
        { hz: 1000, ganho: -0.5, q: 1.0 },
        { hz: 5000, ganho: 3.0, q: 0.5 },
      ],
    },
    {
      id: "789e4567-e89b-12d3-a456-426614174011",
      nomeTrilha: "Guitarra Base L",
      volume: 0.7,
      delayOffset: 4.0,
      tagsInstrumentos: ["guitar", "electric", "rhythm"],
      metadadosFrequencia: [
        { hz: 80, ganho: -12.0, q: 2.0 },
        { hz: 1200, ganho: 2.1, q: 1.2 },
      ],
    },
  ],
  tagsSociais: ["rock", "collaboration", "api-test", "bun-speed"],
};`}</code>
                    </pre>
                </div>
            </div>

            <div className="detalhes-secao">
                <h4>Conclusões Chave</h4>
                <ul>
                    <li><strong>Bun é +45-52% mais rápido</strong> que Node.js para validadores compilados (AJV, Typia, Schema-Shield, Zod)</li>
                    <li><strong>Ordem de performance idêntica</strong> em ambos runtimes: AJV &gt; Typia &gt; Schema-Shield &gt; Zod &gt; Yup</li>
                    <li><strong>Node.js tem curva de warm-up:</strong> +10-23% entre rodada 1 e 5; Bun opera no pico desde a rodada 1, o que pesa em serverless</li>
                    <li><strong>Validação custa ~61%</strong> do throughput bruto (58k req/s rota vazia vs 22k com schema complexo)</li>
                    <li><strong>AJV vence até no Bun</strong> apesar do code generation dinâmico: o JIT do JSC lidou bem depois da compilação</li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Recomendações por Caso de Uso</h4>
                <ul>
                    <li><strong>Microservices / Edge / Serverless:</strong> Hono + AJV no Bun (28.534 req/s)</li>
                    <li><strong>APIs / Monólitos / Corporate:</strong> Fastify + AJV no Bun (22.527 req/s) ou Node (14.998 req/s)</li>
                    <li><strong>Aplicações grandes:</strong> Fastify recomendado no lugar de Elysia, pelos plugins maduros</li>
                    <li><strong>Edge com cold start crítico:</strong> Schema-Shield (compilação mais leve que AJV)</li>
                </ul>
            </div>
        </div>
    );
}

export { DetalhesTypeMarks };
