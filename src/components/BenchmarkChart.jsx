const formatador = new Intl.NumberFormat('pt-BR');

/**
 * Gráfico de barras horizontais sem biblioteca externa.
 *
 * O elemento visual recebe role="img" com um nome acessível, e a mesma
 * informação é repetida numa tabela visualmente oculta — leitores de tela
 * leem os dados tabulados em vez de tentar interpretar as barras.
 */
function BenchmarkChart({ cenarios, legenda, unidade = 'req/s' }) {
    const maximo = Math.max(...cenarios.map((c) => c.reqs));

    return (
        <div className="benchmark">
            <div className="benchmark-grafico" role="img" aria-label={legenda}>
                {cenarios.map((cenario, indice) => {
                    const proporcao = (cenario.reqs / maximo) * 100;
                    const melhor = indice === 0;

                    return (
                        <div
                            className="benchmark-linha"
                            key={`${cenario.runtime}-${cenario.framework}-${cenario.validador}`}
                            data-testid="benchmark-barra"
                            data-melhor={melhor ? 'true' : undefined}
                        >
                            <span className="benchmark-rotulo" data-testid="benchmark-rotulo">
                                <span className="benchmark-runtime">{cenario.runtime}</span>
                                <span className="benchmark-sep" aria-hidden="true">/</span>
                                <span>{cenario.framework}</span>
                                <span className="benchmark-sep" aria-hidden="true">/</span>
                                <span>{cenario.validador}</span>
                            </span>

                            <span className="benchmark-trilha">
                                <span
                                    className="benchmark-preenchimento"
                                    data-testid="benchmark-preenchimento"
                                    style={{ '--proporcao': `${proporcao}%` }}
                                />
                            </span>

                            <span className="benchmark-valor" data-testid="benchmark-valor">
                                {formatador.format(cenario.reqs)}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/*
              * O sr-only fica no wrapper, não na <table>: tabelas tratam `width`
              * como mínimo e crescem até o conteúdo (com nowrap, ~880px), o que
              * gerava overflow horizontal no mobile.
              */}
            <div className="sr-only">
            <table>
                <caption>{legenda}</caption>
                <thead>
                    <tr>
                        <th scope="col">Runtime</th>
                        <th scope="col">Framework</th>
                        <th scope="col">Validador</th>
                        <th scope="col">{unidade}</th>
                        <th scope="col">Latência média</th>
                    </tr>
                </thead>
                <tbody>
                    {cenarios.map((cenario) => (
                        <tr key={`${cenario.runtime}-${cenario.framework}-${cenario.validador}-linha`}>
                            <td>{cenario.runtime}</td>
                            <td>{cenario.framework}</td>
                            <td>{cenario.validador}</td>
                            <td>{formatador.format(cenario.reqs)}</td>
                            <td>{cenario.latencia}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export { BenchmarkChart };
