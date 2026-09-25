/**
 * Bloco de código com moldura discreta de editor.
 * Mantém apenas o nome do arquivo como referência de contexto,
 * sem os pontos decorativos de janela.
 */
function BlocoCodigo({ arquivo, codigo }) {
    return (
        <div className="bloco-codigo">
            <div className="bloco-codigo-cabecalho">
                <span className="bloco-codigo-arquivo">{arquivo}</span>
            </div>
            <pre>
                <code>{codigo}</code>
            </pre>
        </div>
    );
}

export { BlocoCodigo };
