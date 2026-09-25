import { ProjetoCase } from '../components/ProjetoCase';
import { FluxoTecnico } from '../components/FluxoTecnico';
import { BenchmarkChart } from '../components/BenchmarkChart';
import { BlocoCodigo } from '../components/BlocoCodigo';
import { DetalhesZbr } from '../components/details/DetalhesZbr';
import { DetalhesTchuu } from '../components/details/DetalhesTchuu';
import { DetalhesAmotif } from '../components/details/DetalhesAmotif';
import { DetalhesTypeMarks } from '../components/details/DetalhesTypeMarks';

/*
 * Os quatro melhores cenários do relatório de benchmark do TypeMarks,
 * seguidos do baseline em Node.js com a mesma combinação Fastify + AJV.
 * O contraste entre a 4ª e a 5ª linha isola o efeito do runtime.
 */
const CENARIOS_TYPEMARKS = [
    { runtime: 'Bun', framework: 'Hono', validador: 'AJV', reqs: 28534, latencia: '2,94 ms' },
    { runtime: 'Bun', framework: 'Elysia', validador: 'TypeBox', reqs: 25915, latencia: '3,45 ms' },
    { runtime: 'Bun', framework: 'Hono', validador: 'Schema-Shield', reqs: 25021, latencia: '3,61 ms' },
    { runtime: 'Bun', framework: 'Fastify', validador: 'AJV', reqs: 22527, latencia: '3,93 ms' },
    { runtime: 'Node', framework: 'Fastify', validador: 'AJV', reqs: 14998, latencia: '6,16 ms' },
];

const EXEMPLO_ZOD = `import { z } from 'zod';
import { zbr } from 'br_standards_with_zod';

const cadastro = z.object({
  cpf: zbr.cpf(),
  cnpj: zbr.cnpj(),
  tel: zbr.tel(),
});

// "123.456.789-09" -> normalizado para "12345678909"
// "111.111.111-11" -> rejeitado: sequência inválida`;

function Projetos() {
    return (
        <main>
            <header className="secao-aberta pagina-cabecalho">
                <span className="eyebrow">Projetos</span>
                <h1 className="titulo">Decisões técnicas e resultados</h1>
                <p className="section-subtitle">
                    Cada case começa pelo problema e pela evidência. Os detalhes de
                    arquitetura, metodologia e trade-offs ficam a um clique.
                </p>
            </header>

            {/* ─── AMOTIF ─── */}
            <ProjetoCase
                destaque
                categoria="Plataforma full stack"
                titulo="AMOTIF"
                resumo="Plataforma de colaboração musical assíncrona: cada contribuição entra como uma camada de áudio versionada, preservando autoria e histórico em vez de sobrescrever o trabalho anterior."
                composicao={
                    <FluxoTecnico
                        titulo="amotif.arquitetura"
                        status="Em produção"
                        etapas={[
                            { titulo: 'Cliente', itens: ['React 19', 'Web Audio API'] },
                            {
                                titulo: 'API',
                                itens: ['Fastify 5 + Bun', 'TypeBox (JIT)', 'JWT + Argon2id'],
                                destaque: true,
                                conexao: 'HTTPS',
                            },
                            { titulo: 'Dados', itens: ['Prisma 7', 'PostgreSQL'], conexao: 'SQL' },
                            { titulo: 'Arquivos', itens: ['Supabase Storage'], conexao: 'stream' },
                        ]}
                        nota="Upload de áudio não passa pela memória da API: o binário é validado em até 40 MB e transmitido por streaming ao storage; só a URL final é persistida no banco."
                    />
                }
                metricas={[
                    { valor: '40+', rotulo: 'endpoints' },
                    { valor: '14', rotulo: 'modelos Prisma' },
                    { valor: '15', rotulo: 'migrações' },
                    { valor: '18', rotulo: 'arquivos de teste' },
                ]}
                stack={['Bun', 'Fastify 5', 'TypeBox', 'Prisma 7', 'PostgreSQL', 'React 19']}
                links={[
                    { href: 'https://github.com/Braian-de-Liz/AMOTIF', label: 'Ver código' },
                    { href: 'https://amotif-music.onrender.com', label: 'Abrir aplicação' },
                ]}
                detalhes={<DetalhesAmotif />}
            />

            {/* ─── TypeMarks ─── */}
            <ProjetoCase
                categoria="Pesquisa de performance"
                titulo="TypeMarks"
                resumo="Benchmark de 15 cenários combinando runtimes, frameworks e validadores para medir quanto a validação de contratos custa em throughput — e transformar a escolha de stack numa decisão com dado, não com intuição."
                composicao={
                    <BenchmarkChart
                        cenarios={CENARIOS_TYPEMARKS}
                        legenda="Requisições por segundo: os quatro melhores cenários, todos no Bun, comparados ao baseline de Fastify com AJV no Node.js"
                    />
                }
                metricas={[
                    { valor: '28.534', rotulo: 'req/s no melhor cenário' },
                    { valor: '2,94 ms', rotulo: 'latência média' },
                    { valor: '5,60 ms', rotulo: 'latência P99' },
                    { valor: '+50,2%', rotulo: 'Bun sobre Node.js (AJV)' },
                ]}
                stack={['Bun', 'Node.js', 'Hono', 'Fastify', 'AJV', 'Autocannon']}
                links={[
                    { href: 'https://github.com/Braian-de-Liz/typemarks', label: 'Ver relatório' },
                ]}
                detalhes={<DetalhesTypeMarks />}
            />

            {/* ─── br_standards_with_zod ─── */}
            <ProjetoCase
                categoria="Biblioteca open source"
                titulo="br_standards_with_zod"
                resumo="Validação de documentos brasileiros que vai além de regex: o dígito verificador é calculado por módulo 11 e a entrada é normalizada antes de chegar ao schema, integrada ao ecossistema Zod."
                composicao={
                    <>
                        <BlocoCodigo arquivo="cadastro.ts" codigo={EXEMPLO_ZOD} />
                        <FluxoTecnico
                            titulo="zbr.pipeline"
                            etapas={[
                                { titulo: 'Entrada', itens: ['"123.456.789-09"'] },
                                { titulo: 'Normalização', itens: ['Remove máscara'], conexao: 'sanitize' },
                                {
                                    titulo: 'Validação',
                                    itens: ['Dígito mod 11', 'Bloqueia sequências'],
                                    destaque: true,
                                    conexao: 'checa',
                                },
                                { titulo: 'Saída', itens: ['"12345678909"'], conexao: 'tipado' },
                            ]}
                        />
                    </>
                }
                metricas={[
                    { valor: '0', rotulo: 'dependências em runtime' },
                    { valor: 'ESM + CJS', rotulo: 'formatos publicados' },
                    { valor: '5', rotulo: 'documentos validados' },
                ]}
                stack={['TypeScript', 'Zod', 'Node.js', 'Vitest', 'tsup']}
                links={[
                    { href: 'https://www.npmjs.com/package/br_standards_with_zod', label: 'Ver no NPM' },
                    { href: 'https://github.com/Braian-de-Liz/br_standards_with_zod', label: 'Ver código' },
                    { href: 'https://zbr-view-7bc2.vercel.app/', label: 'Abrir demo' },
                ]}
                detalhes={<DetalhesZbr />}
            />

            {/* ─── Tchuu-Tchuu ─── */}
            <ProjetoCase
                categoria="Monitoramento em tempo real"
                titulo="Tchuu-Tchuu"
                resumo="Sistema de monitoramento ferroviário em que telemetria de sensores chega por WebSocket e alimenta um painel operacional, com três componentes que escalam e implantam de forma independente."
                composicao={
                    <FluxoTecnico
                        titulo="tchuu.telemetria"
                        etapas={[
                            { titulo: 'Sensores', itens: ['Telemetria dos trens'] },
                            {
                                titulo: 'API',
                                itens: ['Fastify', 'WebSocket', 'JWT'],
                                destaque: true,
                                conexao: 'WS',
                            },
                            { titulo: 'Persistência', itens: ['PostgreSQL (Neon)'], conexao: 'SQL' },
                            { titulo: 'Operação', itens: ['Painel', 'Chart.js', 'Chat'], conexao: 'push' },
                        ]}
                        nota="Frontend em JavaScript puro foi uma escolha deliberada do projeto para exercitar fundamentos, e o CORS aceita apenas o domínio do próprio frontend."
                    />
                }
                metricas={[
                    { valor: '881', rotulo: 'commits' },
                    { valor: '3', rotulo: 'componentes com deploy próprio' },
                ]}
                stack={['Node.js', 'Fastify', 'WebSocket', 'PostgreSQL', 'Chart.js', 'JavaScript']}
                links={[
                    { href: 'https://github.com/Braian-de-Liz/Tchuu-Tchuu', label: 'Ver código' },
                ]}
                detalhes={<DetalhesTchuu />}
            />
        </main>
    );
}

export { Projetos };
