import { useEffect, useId, useState } from 'react';

/** Exemplos reais: um válido e um que a lib rejeita, para cada documento. */
const DOCUMENTOS = [
    { id: 'cpf', rotulo: 'CPF', valido: '123.456.789-09', invalido: '111.111.111-11' },
    { id: 'cnpj', rotulo: 'CNPJ', valido: '11.222.333/0001-81', invalido: '11.111.111/1111-11' },
    { id: 'tel', rotulo: 'Telefone', valido: '(47) 93380-3828', invalido: '(00) 12345-6789' },
    { id: 'cep', rotulo: 'CEP', valido: '89010-000', invalido: '00000-000' },
    { id: 'rg', rotulo: 'RG', valido: '12.345.678-9', invalido: '123' },
];

/**
 * Playground da br_standards_with_zod: roda a biblioteca publicada no NPM
 * (não uma cópia) no navegador. A lib e o Zod entram num chunk separado.
 */
function PlaygroundZbr() {
    const [tipo, setTipo] = useState(DOCUMENTOS[0]);
    const [texto, setTexto] = useState(DOCUMENTOS[0].valido);
    const [zbr, setZbr] = useState(null);
    const [falhou, setFalhou] = useState(false);
    const campoId = useId();

    useEffect(() => {
        let cancelado = false;
        import('br_standards_with_zod')
            .then((m) => { if (!cancelado) setZbr(m.zbr); })
            .catch(() => { if (!cancelado) setFalhou(true); });
        return () => { cancelado = true; };
    }, []);

    const escolher = (doc) => {
        setTipo(doc);
        setTexto(doc.valido);
    };

    let resultado = null;
    if (zbr) {
        const r = zbr[tipo.id]().safeParse(texto);
        resultado = r.success
            ? { ok: true, mensagem: 'Válido', saida: r.data }
            : { ok: false, mensagem: r.error.issues[0]?.message ?? 'Inválido' };
    }

    return (
        <div className="playground" data-testid="playground-zbr">
            <div className="playground-tipos" role="group" aria-label="Tipo de documento">
                {DOCUMENTOS.map((doc) => (
                    <button
                        type="button"
                        key={doc.id}
                        className="playground-tipo"
                        aria-pressed={doc.id === tipo.id}
                        onClick={() => escolher(doc)}
                    >
                        {doc.rotulo}
                    </button>
                ))}
            </div>

            <label className="playground-rotulo" htmlFor={campoId}>
                Digite um {tipo.rotulo} para validar
            </label>
            <input
                id={campoId}
                className="playground-campo"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                spellCheck="false"
                autoComplete="off"
                inputMode="text"
            />

            <p className="playground-codigo">
                <code>zbr.{tipo.id}().safeParse(<span>{JSON.stringify(texto)}</span>)</code>
            </p>

            <div
                className="playground-resultado"
                data-estado={resultado ? (resultado.ok ? 'ok' : 'erro') : 'espera'}
                role="status"
            >
                {falhou && 'Não foi possível carregar a biblioteca.'}
                {!falhou && !resultado && 'Carregando a biblioteca…'}
                {resultado?.ok && (
                    <>
                        <strong>{resultado.mensagem}</strong>
                        <span>Saída normalizada: <code>{resultado.saida}</code></span>
                    </>
                )}
                {resultado && !resultado.ok && (
                    <>
                        <strong>Rejeitado</strong>
                        <span>{resultado.mensagem}</span>
                    </>
                )}
            </div>

            <div className="playground-exemplos">
                <button type="button" onClick={() => setTexto(tipo.valido)}>Exemplo válido</button>
                <button type="button" onClick={() => setTexto(tipo.invalido)}>Exemplo inválido</button>
            </div>
        </div>
    );
}

export { PlaygroundZbr };
