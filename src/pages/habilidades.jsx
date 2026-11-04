import { Link } from 'react-router-dom';
import { PROJETOS, STACK_ATUAL } from '../data/stack';
import { Cena3D } from '../components/cenas/Cena3D';
import { criarCenaConstelacao } from '../components/cenas/cenas';
import { useScrollReveal } from '../animations/useScrollReveal';

const CENA_STACK = criarCenaConstelacao(STACK_ATUAL.flatMap((g) => g.itens), PROJETOS);

/** Leva ao case do primeiro projeto que tem página; sem case, a evidência fica só como texto. */
function linkDoCase(item) {
    const id = item.projetos.find((projeto) => PROJETOS[projeto]?.pagina);
    return id ? `/#${id}` : null;
}

const TOTAL_TECNOLOGIAS = STACK_ATUAL.reduce((soma, g) => soma + g.itens.length, 0);
const TOTAL_PROJETOS = new Set(STACK_ATUAL.flatMap((g) => g.itens.flatMap((i) => i.projetos))).size;

/**
 * Próximos estudos ficam em uma lista deliberadamente secundária:
 * sinalizam direção, não competência consolidada.
 */
const EM_ESTUDO = [
    { area: 'Backend', itens: ['Go (Fiber)', 'Nest.js', 'FastAPI', 'Python', 'GraphQL', '.Net'] },
    { area: 'Infraestrutura', itens: ['Docker', 'CI/CD', 'Terraform', 'AWS'] },
    { area: 'Dados', itens: ['MongoDB'] },
    { area: 'Aplicações de IA', itens: ['LangChain', 'MCP', 'Agentes de IA'] },
];

function Habilidades() {
    const atualRef = useScrollReveal({ y: 20 });
    const estudoRef = useScrollReveal({ y: 20 });

    return (
        <section id="habilidades" aria-labelledby="habilidades-titulo">
            <header className="secao-aberta pagina-cabecalho">
                <span className="eyebrow">Habilidades</span>
                <h2 className="titulo" id="habilidades-titulo">O que eu uso e onde já provei isso</h2>
                <p className="section-subtitle">
                    O que eu já uso em projetos reais, separado do que estou estudando.
                </p>
                <p className="stack-resumo" data-testid="stack-resumo">
                    <strong>{TOTAL_TECNOLOGIAS}</strong> tecnologias em uso ·{' '}
                    <strong>{TOTAL_PROJETOS}</strong> projetos como evidência
                </p>
            </header>

            <section className="secao-aberta cena-secao">
                <Cena3D montar={CENA_STACK} className="cena-3d-stack" />
            </section>

            <section className="secao-aberta" ref={atualRef} data-testid="stack-atual">
                <h2 className="titulo">Stack atual</h2>
                <p className="section-subtitle">
                    Cada evidência leva ao projeto onde a tecnologia foi aplicada.
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
                                            {linkDoCase(item) ? (
                                                <Link to={linkDoCase(item)}>{item.evidencia}</Link>
                                            ) : (
                                                item.evidencia
                                            )}
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

                <p className="estudo-foco" data-testid="estudo-foco">
                    Em foco agora: <strong>Go com Fiber</strong>, depois LangChain em
                    TypeScript integrado a MCP.
                </p>

                <dl className="estudo-lista">
                    {EM_ESTUDO.map((bloco) => (
                        <div className="estudo-bloco" key={bloco.area}>
                            <dt className="estudo-area">{bloco.area}</dt>
                            <dd className="estudo-itens">
                                {bloco.itens.map((item) => (
                                    <span
                                        className="estudo-item"
                                        data-foco={item === 'Go (Fiber)' ? 'true' : undefined}
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
        </section>
    );
}

export { Habilidades };
