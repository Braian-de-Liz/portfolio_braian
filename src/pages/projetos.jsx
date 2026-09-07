import { DetalhesZbr } from '../components/details/DetalhesZbr';
import { DetalhesTchuu } from '../components/details/DetalhesTchuu';
import { DetalhesAmotif } from '../components/details/DetalhesAmotif';
import { DetalhesTypeMarks } from '../components/details/DetalhesTypeMarks';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { useScrollReveal } from '../animations/useScrollReveal';

function Projetos() {
    const zbrRef = useScrollReveal({ y: 30 });
    const zbrContentRef = useScrollReveal({ y: 20, children: true, stagger: 0.05 });

    const tchuuRef = useScrollReveal({ y: 30 });
    const tchuuContentRef = useScrollReveal({ y: 20, children: true, stagger: 0.05 });

    const amotifRef = useScrollReveal({ y: 30 });
    const amotifContentRef = useScrollReveal({ y: 20, children: true, stagger: 0.05 });

    const typemarksRef = useScrollReveal({ y: 30 });
    const typemarksContentRef = useScrollReveal({ y: 20, children: true, stagger: 0.05 });

    return (
        <main>
            {/* ─── br_standards_with_zod ─── */}
            <section className="cont" ref={zbrRef}>
                <div ref={zbrContentRef}>
                    <h2 className="titulo">br_standards_with_zod</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Biblioteca open-source para validação rigorosa de documentos brasileiros.
                        Garante integridade de dados com validação matemática de dígitos verificadores e integração nativa ao ecossistema Zod.
                    </p>
                </div>

                <div className="code-display">
                    <div className="code-header">
                        <span className="code-dot"></span>
                        <span className="code-dot"></span>
                        <span className="code-dot"></span>
                        <span className="code-filename">example.ts</span>
                    </div>
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

                <div className="habilidades-grid" style={{ marginTop: '20px' }}>
                    <div className="skill-card" title="Linguagem tipada para código seguro e escalável">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" alt="TypeScript" />
                        <span>TypeScript</span>
                    </div>
                    <div className="skill-card" title="Validação de schemas TypeScript-first">
                        <img src="https://cdn.simpleicons.org/zod" alt="Zod" />
                        <span>Zod</span>
                    </div>
                    <div className="skill-card" title="Runtime JavaScript server-side">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" alt="Node.js" />
                        <span>Node.js</span>
                    </div>
                    <div className="skill-card" title="Testes unitários rápidos com Vitest">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitest/vitest-plain.svg" alt="Vitest" />
                        <span>Vitest</span>
                    </div>
                    <div className="skill-card" title="Bundler TypeScript para ESM e CJS">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/esbuild/esbuild-original.svg" alt="esbuild" />
                        <span>tsup</span>
                    </div>
                </div>

                <DetalhesZbr />

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <a href="https://github.com/Braian-de-Liz/br_standards_with_zod" className="pagina-boton">GitHub</a>
                    <a href="https://www.npmjs.com/package/br_standards_with_zod" className="pagina-boton">Ver no NPM</a>
                    <a href="https://zbr-view-7bc2.vercel.app/" className="pagina-boton">Site do Projeto</a>
                </div>
            </section>

            {/* ─── Tchuu-Tchuu ─── */}
            <section className="cont" ref={tchuuRef}>
                <div ref={tchuuContentRef}>
                    <h2 className="titulo">Tchuu-Tchuu</h2>
                    <p>
                        Plataforma de monitoramento de trens em tempo real — projeto Full Stack
                        com Node.js + Fastify no back-end e HTML + CSS + JS no front-end.
                    </p>
                </div>

                <div className="exibir">
                    <div><img loading="lazy" src="ASSETS/imagens/tchuu-tchuu_github.png" alt="Preview 1" className="imge" /></div>
                    <div><img loading="lazy" src="ASSETS/imagens/tchuu-tchuu_login.png" alt="Preview 2" className="imge" /></div>
                    <div><img loading="lazy" src="ASSETS/imagens/inicial_tchuuTchuu.png" alt="Preview 3" className="imge" /></div>
                </div>

                <div className="habilidades-grid" style={{ marginTop: '20px' }}>
                    <div className="skill-card" title="Linguagem de marcação para estruturar páginas web">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" alt="HTML5" />
                        <span>HTML5</span>
                    </div>
                    <div className="skill-card" title="Estilização e layout responsivo">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" alt="CSS3" />
                        <span>CSS3</span>
                    </div>
                    <div className="skill-card" title="Linguagem dinâmica para interatividade no navegador">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" alt="JavaScript" />
                        <span>JavaScript</span>
                    </div>
                    <div className="skill-card" title="Gráficos dinâmicos e visualização de dados">
                        <img src="https://www.chartjs.org/media/logo-title.svg" alt="Chart.js" />
                        <span>Chart.js</span>
                    </div>
                    <div className="skill-card" title="Framework web backend de alta performance">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-plain.svg" alt="Fastify" />
                        <span>Fastify</span>
                    </div>
                    <div className="skill-card" title="Runtime JavaScript server-side">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" alt="Node.js" />
                        <span>Node.js</span>
                    </div>
                    <div className="skill-card" title="Comunicação bidirecional em tempo real">
                        <img src="https://cdn.simpleicons.org/socketdotio" alt="WebSocket" />
                        <span>WebSocket</span>
                    </div>
                    <div className="skill-card" title="Hashing de senhas com bcrypt">
                        <img src="https://cdn.simpleicons.org/bcrypt" alt="Bcrypt" />
                        <span>Bcrypt</span>
                    </div>
                    <div className="skill-card" title="Banco relacional robusto">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg" alt="PostgreSQL" />
                        <span>PostgreSQL</span>
                    </div>
                </div>

                <DetalhesTchuu />

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <a href="https://github.com/Braian-de-Liz/Tchuu-Tchuu" className="pagina-boton">GitHub</a>
                </div>
            </section>

            {/* ─── AMOTIF ─── */}
            <section className="cont destaque" ref={amotifRef}>
                <div ref={amotifContentRef}>
                    <h2 className="titulo">AMOTIF — Colaboração Musical Assíncrona</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Plataforma digital que viabiliza a criação coletiva de obras musicais através da contribuição estruturada de camadas instrumentais independentes — um "Git para músicos".
                    </p>
                </div>

                <div className="exibir">
                    <div><img loading="lazy" src="ASSETS/imagens/home_amotif.png" alt="Home AMOTIF" className="imge" /></div>
                    <div><img loading="lazy" src="ASSETS/imagens/amotif_login.png" alt="Login AMOTIF" className="imge" /></div>
                    <div><img loading="lazy" src="ASSETS/imagens/amotif_cadastro.png" alt="Cadastro AMOTIF" className="imge" /></div>
                    <div><img loading="lazy" src="/ASSETS/imagens/gitamotif.png" alt="Github" className="imge" /></div>
                </div>

                <div className="habilidades-grid" style={{ marginTop: '20px' }}>
                    <div className="skill-card" title="Runtime JavaScript all-in-one — mais rápido que Node.js">
                        <img src={new URL(`/ASSETS/imagens/bun-logo.svg`, import.meta.url).href} alt="Bun" />
                        <span>Bun</span>
                    </div>
                    <div className="skill-card" title="Framework web backend de alta performance com validação TypeBox">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-plain.svg" alt="Fastify" />
                        <span>Fastify</span>
                    </div>
                    <div className="skill-card" title="Validação rigorosa de schemas TypeScript-first em runtime">
                        <img src="https://raw.githubusercontent.com/sinclairzx81/sinclair-typebox/refs/heads/main/typebox.png" alt="TypeBox" />
                        <span>TypeBox</span>
                    </div>
                    <div className="skill-card" title="ORM TypeScript type-safe para PostgreSQL">
                        <img src="https://cdn.simpleicons.org/prisma" alt="Prisma" />
                        <span>Prisma</span>
                    </div>
                    <div className="skill-card" title="Banco relacional robusto com integridade de dados">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg" alt="PostgreSQL" />
                        <span>PostgreSQL</span>
                    </div>
                    <div className="skill-card" title="Linguagem compilada com concorrência nativa para microsserviços">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" alt="Go" />
                        <span>Go</span>
                    </div>
                    <div className="skill-card" title="Biblioteca para interfaces de usuário component-based">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                        <span>React</span>
                    </div>
                    <div className="skill-card" title="Infraestrutura de cloud storage e entrega global de arquivos">
                        <img src="https://cdn.simpleicons.org/supabase" alt="Supabase" />
                        <span>Supabase</span>
                    </div>
                    <div className="skill-card" title="Containerização para ambientes consistentes de execução">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" alt="Docker" />
                        <span>Docker</span>
                    </div>
                </div>

                <ArchitectureDiagram />

                <DetalhesAmotif />

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <a href="https://github.com/Braian-de-Liz/AMOTIF" className="pagina-boton">GitHub</a>
                    <a href="https://amotif-music.onrender.com" className="pagina-boton">Site do AMOTIF</a>
                </div>
            </section>

            {/* ─── TypeMarks ─── */}
            <section className="cont" ref={typemarksRef}>
                <div ref={typemarksContentRef}>
                    <h2 className="titulo">TypeMarks — Benchmark de Validação de Schemas</h2>
                    <p style={{ marginBottom: '20px' }}>
                        Benchmarks de alta performance comparando 15 cenários de validação de esquemas combinando runtimes (Bun/Node.js), frameworks (Fastify/Elysia/Hono) e validadores (AJV, TypeBox, Schema-Shield, Zod, Typia). Campeão absoluto: <strong>Hono + AJV no Bun</strong> com <strong>28.534 req/s</strong> e latência média de <strong>2,94ms</strong>.
                    </p>
                </div>

                <div className="habilidades-grid" style={{ marginTop: '20px' }}>
                    <div className="skill-card" title="Runtime JavaScript all-in-one — mais rápido que Node.js">
                        <img src={new URL(`/ASSETS/imagens/bun-logo.svg`, import.meta.url).href} alt="Bun" />
                        <span>Bun</span>
                    </div>
                    <div className="skill-card" title="Runtime JavaScript server-side (Motor V8)">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" alt="Node.js" />
                        <span>Node.js</span>
                    </div>
                    <div className="skill-card" title="Framework web backend de alta performance">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-plain.svg" alt="Fastify" />
                        <span>Fastify</span>
                    </div>
                    <div className="skill-card" title="Framework web TypeScript-first para Bun">
                        <img src="https://avatars.githubusercontent.com/u/119793569?s=200&v=4" alt="Elysia" />
                        <span>Elysia</span>
                    </div>
                    <div className="skill-card" title="Validação estática de esquemas com TypeBox">
                        <img src="https://raw.githubusercontent.com/sinclairzx81/sinclair-typebox/refs/heads/main/typebox.png" alt="TypeBox" />
                        <span>TypeBox</span>
                    </div>
                    <div className="skill-card" title="Compilador JSON Schema de alta performance (AJV)">
                        <img src="https://cdn.simpleicons.org/ajv" alt="AJV" />
                        <span>AJV</span>
                    </div>
                    <div className="skill-card" title="Validação de schemas TypeScript-first">
                        <img src="https://cdn.simpleicons.org/zod" alt="Zod" />
                        <span>Zod</span>
                    </div>
                    <div className="skill-card" title="Validação por transformação estática em tempo de compilação">
                        <img src="https://typia.io/logo.png" alt="Typia" />
                        <span>Typia</span>
                    </div>
                    <div className="skill-card" title="Ferramenta de testes de carga HTTP">
                        <img src="https://cdn.simpleicons.org/autocannon" alt="Autocannon" />
                        <span>Autocannon</span>
                    </div>
                </div>

                <DetalhesTypeMarks />

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <a href="https://github.com/Braian-de-Liz/typemarks" className="pagina-boton">GitHub</a>
                </div>
            </section>

        </main>
    );
}

export { Projetos };
