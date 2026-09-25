import { useScrollReveal } from '../animations/useScrollReveal';

/**
 * Stack atual: cada tecnologia vem acompanhada da evidência de uso real,
 * para que a lista não seja uma declaração vazia de domínio.
 */
const STACK_ATUAL = [
    {
        grupo: 'Linguagem e tipos',
        itens: [
            { nome: 'TypeScript', evidencia: 'Base do AMOTIF e da br_standards_with_zod' },
            { nome: 'JavaScript', evidencia: 'Backend e frontend do Tchuu-Tchuu' },
        ],
    },
    {
        grupo: 'Runtime e API',
        itens: [
            { nome: 'Bun', evidencia: 'Runtime da API do AMOTIF e dos benchmarks' },
            { nome: 'Node.js', evidencia: 'API do Tchuu-Tchuu e execução do TypeMarks' },
            { nome: 'Fastify', evidencia: 'API de 40+ endpoints no AMOTIF' },
        ],
    },
    {
        grupo: 'Dados e validação',
        itens: [
            { nome: 'PostgreSQL', evidencia: '14 modelos e 15 migrações no AMOTIF' },
            { nome: 'Prisma', evidencia: 'Camada de acesso a dados do AMOTIF' },
            { nome: 'TypeBox', evidencia: 'Validação com compilação JIT no Fastify' },
            { nome: 'Zod', evidencia: 'Biblioteca própria publicada no NPM' },
        ],
    },
    {
        grupo: 'Qualidade',
        itens: [
            { nome: 'Vitest', evidencia: 'Testes da biblioteca e dos benchmarks' },
            { nome: 'Autocannon', evidencia: 'Testes de carga dos 15 cenários do TypeMarks' },
        ],
    },
];

/**
 * Próximos estudos ficam em uma lista deliberadamente secundária:
 * sinalizam direção, não competência consolidada.
 */
const EM_ESTUDO = [
    { area: 'Backend', itens: ['Hono', 'Go', 'GraphQL'] },
    { area: 'Infraestrutura', itens: ['Docker', 'CI/CD', 'Terraform', 'AWS'] },
    { area: 'Dados', itens: ['Drizzle', 'MongoDB'] },
    { area: 'Aplicações de IA', itens: ['MCP', 'Agentes de IA'] },
];

function Habilidades() {
    const atualRef = useScrollReveal({ y: 20 });
    const estudoRef = useScrollReveal({ y: 20 });

    return (
        <main>
            <header className="secao-aberta pagina-cabecalho">
                <span className="eyebrow">Habilidades</span>
                <h1 className="titulo">Stack e direção técnica</h1>
                <p className="section-subtitle">
                    O que eu já uso em projetos reais, separado do que estou estudando.
                </p>
            </header>

            <section className="secao-aberta" ref={atualRef} data-testid="stack-atual">
                <h2 className="titulo">Stack atual</h2>
                <p className="section-subtitle">
                    Cada item aponta onde foi aplicado.
                </p>

                <div className="stack-grupos">
                    {STACK_ATUAL.map((grupo) => (
                        <div className="stack-grupo" key={grupo.grupo}>
                            <h3 className="stack-grupo-titulo">{grupo.grupo}</h3>
                            <ul className="stack-lista">
                                {grupo.itens.map((item) => (
                                    <li
                                        className="stack-item"
                                        key={item.nome}
                                        data-testid="stack-atual-item"
                                    >
                                        <span className="stack-item-nome">{item.nome}</span>
                                        <span
                                            className="stack-item-evidencia"
                                            data-testid="stack-evidencia"
                                        >
                                            {item.evidencia}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="secao-aberta stack-estudo" ref={estudoRef} data-testid="stack-estudo">
                <h2 className="titulo">Em estudo</h2>
                <p className="section-subtitle">
                    Tecnologias que estou explorando ou pretendo aprofundar, alinhadas
                    a backend, arquitetura e infraestrutura. Ainda não são domínio consolidado.
                </p>

                <dl className="estudo-lista">
                    {EM_ESTUDO.map((bloco) => (
                        <div className="estudo-bloco" key={bloco.area}>
                            <dt className="estudo-area">{bloco.area}</dt>
                            <dd className="estudo-itens">
                                {bloco.itens.map((item) => (
                                    <span
                                        className="estudo-item"
                                        key={item}
                                        data-testid="stack-estudo-item"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>
        </main>
    );
}

export { Habilidades };
