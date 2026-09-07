function DetalhesAmotif() {
    return (
        <div className="detalhes-arquitetura">
            <div className="detalhes-secao">
                <h4>Arquitetura "Fastify-Native Flat Plugin"</h4>
                <p>
                    Deliberadamente não-MVC. Cada rota é um plugin Fastify que acessa o Prisma diretamente.
                    Schema-first com TypeBox: cada rota declara seu schema de validação, que o Fastify compila para AJV com JIT.
                    Apenas 2 services existem no projeto inteiro   extraídos apenas quando chamados de múltiplas rotas.
                </p>
                <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <div className="detalhes-highlight">
                        <span className="detalhes-highlight-numero">40+</span>
                        <span className="detalhes-highlight-label">endpoints</span>
                    </div>
                    <div className="detalhes-highlight">
                        <span className="detalhes-highlight-numero">14</span>
                        <span className="detalhes-highlight-label">models Prisma</span>
                    </div>
                    <div className="detalhes-highlight">
                        <span className="detalhes-highlight-numero">15</span>
                        <span className="detalhes-highlight-label">migrações</span>
                    </div>
                    <div className="detalhes-highlight">
                        <span className="detalhes-highlight-numero">18</span>
                        <span className="detalhes-highlight-label">arquivos de teste</span>
                    </div>
                </div>
            </div>

            <div className="detalhes-secao">
                <h4>Stack Completa</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Camada</th>
                            <th>Tecnologia</th>
                            <th>Função</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Runtime</td>
                            <td>Bun</td>
                            <td>~50ms startup, ~50k req/s</td>
                        </tr>
                        <tr>
                            <td>Framework</td>
                            <td>Fastify 5 + TypeBox</td>
                            <td>Schema-first, validação JIT via AJV</td>
                        </tr>
                        <tr>
                            <td>ORM</td>
                            <td>Prisma 7 + PrismaPg</td>
                            <td>Type-safe, connection pool (30)</td>
                        </tr>
                        <tr>
                            <td>Banco</td>
                            <td>PostgreSQL (Neon)</td>
                            <td>Serverless branching</td>
                        </tr>
                        <tr>
                            <td>Frontend</td>
                            <td>React 19 + Vite</td>
                            <td>Lazy routes, React Compiler</td>
                        </tr>
                        <tr>
                            <td>Áudio</td>
                            <td>WaveSurfer.js + Web Audio API</td>
                            <td>Waveform, trim, EQ, mixer</td>
                        </tr>
                        <tr>
                            <td>Storage</td>
                            <td>Supabase Storage</td>
                            <td>Bucket de áudio (40MB max)</td>
                        </tr>
                        <tr>
                            <td>Deploy</td>
                            <td>Render</td>
                            <td>Auto-deploy via Git</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="detalhes-secao">
                <h4>Autenticação em Camadas</h4>
                <ul>
                    <li><strong>JWT:</strong> access token 4h (HttpOnly cookie + Bearer header)</li>
                    <li><strong>Refresh Token:</strong> 7d com rotação ativa   uso atômico deleta o antigo, cria novo</li>
                    <li><strong>Reuse Detection:</strong> se um token já usado for apresentado, todos do usuário são deletados</li>
                    <li><strong>Argon2id:</strong> hash de senhas com memoryCost: 4096, timeCost: 2</li>
                    <li><strong>CPF:</strong> criptografado com AES-256-GCM, lookup determinístico</li>
                    <li><strong>5 hooks de autorização:</strong> JWT, dono do projeto, dono da layer, colaborador, permissão genérica</li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Versionamento de Camadas ("Git para Áudio")</h4>
                <ul>
                    <li>Cada edição de uma camada cria uma nova versão com snapshot completo</li>
                    <li>Numeração sequencial (v1, v2, v3...) com ponteiro <code>currentVersionId</code></li>
                    <li>Rollback cria uma nova versão com dados de uma versão anterior   histórico nunca é deletado</li>
                    <li>Paginação por cursor no histórico de versões</li>
                    <li>Aprovação/rejeição de camadas pelo dono do projeto</li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Mixer Virtual (In-Browser)</h4>
                <ul>
                    <li><strong>Multi-track:</strong> exibição de waveforms coloridas por instrumento</li>
                    <li><strong>Trim:</strong> corte de início/fim com controle percentual</li>
                    <li><strong>Volume:</strong> gain 0-200% por track</li>
                    <li><strong>EQ:</strong> bass (low-shelf 80Hz) e treble (high-shelf 6kHz), ±12dB</li>
                    <li><strong>Noise Reduction:</strong> gate de amplitude por threshold</li>
                    <li><strong>Gravação:</strong> microfone via Web Audio API, concatenação com áudio existente</li>
                    <li><strong>Sincronização:</strong> delay offset em milissegundos entre tracks</li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Colaboração e Social</h4>
                <ul>
                    <li>Convites por email com token de 7 dias de expiração</li>
                    <li>Mural do projeto (bulletin board) para comunicação</li>
                    <li>Sistema de sugestões com workflow: Aberta → Em Andamento → Resolvida</li>
                    <li>Follow/unfollow de músicos</li>
                    <li>Like e favoritar projetos</li>
                    <li>Notificações (8 tipos) via polling a cada 3 minutos</li>
                    <li>Busca avançada: texto + gênero + BPM + escala</li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Infra e Documentação</h4>
                <ul>
                    <li>Swagger/OpenAPI auto-gerado em <code>/docs</code> a partir dos schemas TypeBox</li>
                    <li>Rate limiting: 60 req/min (produção)</li>
                    <li>SEO completo: OpenGraph, Twitter Cards, JSON-LD schema.org</li>
                    <li>PWA-ready com manifest.json</li>
                    <li>Desktop wrapper experimental via Deno + WebView2</li>
                    <li>Documentação técnica extensa: Architecture.md (246 linhas), organization.md (303 linhas)</li>
                </ul>
            </div>
        </div>
    );
}

export { DetalhesAmotif };
