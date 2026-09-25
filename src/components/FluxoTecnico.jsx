/**
 * Diagrama de fluxo técnico em CSS, usado para representar arquitetura
 * e pipelines de dados sem depender de screenshots.
 *
 * A sequência é uma lista ordenada: quem usa leitor de tela percebe a
 * ordem das etapas, e o rótulo de conexão descreve o protocolo entre elas.
 * O conteúdo é estático e não depende de animação para ficar visível.
 */
function FluxoTecnico({ titulo, etapas, nota, status }) {
    return (
        <div className="fluxo" data-testid="fluxo-tecnico">
            <div className="fluxo-cabecalho">
                <span className="fluxo-titulo">{titulo}</span>
                {status ? (
                    <span className="fluxo-status">
                        <span className="fluxo-status-ponto" aria-hidden="true" />
                        {status}
                    </span>
                ) : null}
            </div>

            <ol className="fluxo-etapas" aria-label={titulo}>
                {etapas.map((etapa, indice) => (
                    <li
                        className="fluxo-etapa"
                        key={etapa.titulo}
                        data-testid="fluxo-etapa"
                        data-destaque={etapa.destaque ? 'true' : undefined}
                    >
                        {indice > 0 && etapa.conexao ? (
                            <span className="fluxo-conexao" data-testid="fluxo-conexao">
                                <span className="fluxo-conexao-rotulo">{etapa.conexao}</span>
                                <span className="fluxo-conexao-linha" aria-hidden="true" />
                            </span>
                        ) : null}

                        <div className="fluxo-etapa-corpo">
                            <span className="fluxo-etapa-titulo" data-testid="fluxo-etapa-titulo">
                                {etapa.titulo}
                            </span>
                            <ul className="fluxo-etapa-itens">
                                {etapa.itens.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>

            {nota ? <p className="fluxo-nota">{nota}</p> : null}
        </div>
    );
}

export { FluxoTecnico };
