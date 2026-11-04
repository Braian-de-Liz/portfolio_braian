import { useState } from 'react';
import { Cena3D } from './cenas/Cena3D';
import { criarCenaExploradora, criarEstadoExplorador } from './cenas/cenas';
import { suportaCena } from './suportaCena';
import { TODOS_CENARIOS_TYPEMARKS } from '../data/typemarks';

const FILTROS = [
    { valor: 'todos', rotulo: 'Todos' },
    { valor: 'Bun', rotulo: 'Bun' },
    { valor: 'Node', rotulo: 'Node.js' },
];

/**
 * Os 15 cenários do relatório em 3D, sob demanda. Só aparece onde a cena 3D funciona;
 * sem ela, a tabela dos detalhes do case traz os mesmos dados.
 */
function ExploradorTypeMarks() {
    const [suportado] = useState(suportaCena);
    const [aberto, setAberto] = useState(false);
    const [runtime, setRuntime] = useState('todos');
    const [estado] = useState(criarEstadoExplorador);
    const [montar] = useState(() => criarCenaExploradora(TODOS_CENARIOS_TYPEMARKS, estado));

    if (!suportado) return null;

    const escolher = (valor) => {
        estado.filtrar(valor);
        setRuntime(valor);
    };

    return (
        <div className="explorador" data-testid="explorador-typemarks">
            <button
                type="button"
                className="pagina-boton explorador-gatilho"
                aria-expanded={aberto}
                aria-controls="explorador-painel"
                onClick={() => setAberto((v) => !v)}
            >
                {aberto ? 'Recolher os 15 cenários' : 'Ver os 15 cenários em 3D'}
            </button>

            {aberto ? (
                <div id="explorador-painel" className="explorador-painel">
                    <div className="explorador-controles" role="group" aria-label="Filtrar por runtime">
                        {FILTROS.map((f) => (
                            <button
                                type="button"
                                key={f.valor}
                                aria-pressed={runtime === f.valor}
                                onClick={() => escolher(f.valor)}
                            >
                                {f.rotulo}
                            </button>
                        ))}
                        <span className="explorador-chave" aria-hidden="true">
                            <i data-runtime="Bun" /> Bun <i data-runtime="Node" /> Node.js
                        </span>
                    </div>
                    <Cena3D montar={montar} className="cena-3d-explorador" />
                    <p className="explorador-nota">
                        Do mais rápido (fundo) ao mais lento (frente). Os mesmos números estão na
                        tabela de detalhes do case.
                    </p>
                </div>
            ) : null}
        </div>
    );
}

export { ExploradorTypeMarks };
