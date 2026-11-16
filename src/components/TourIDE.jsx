import { useState } from 'react';

/*
 * Tour pela interface do Graph Visuals: marcas numeradas sobre o print e uma
 * legenda sempre visível. Passar o mouse, focar ou tocar em uma marca (ou no
 * item da legenda) acende a área correspondente e escurece o resto.
 * Coordenadas em % do print original (1919 × 1079).
 */
const AREAS = [
    {
        titulo: 'Grafo 3D do projeto',
        texto: '2.012 arquivos, funções e conceitos em 114 comunidades, desenhados com um único THREE.Points e shader próprio.',
        area: { x: 17, y: 4.2, l: 71.6, a: 68 },
        marca: { x: 52, y: 38 },
    },
    {
        titulo: 'Agentes nas laterais',
        texto: 'Claude Code e PowerShell em terminais reais (PTY + xterm.js), em dois andares. Arrastar a janela muda a posição sem reiniciar o processo.',
        area: { x: 0, y: 4.2, l: 17, a: 95.8 },
        marca: { x: 8.5, y: 30 },
    },
    {
        titulo: 'Painel inferior',
        texto: 'Uma sessão do Kiro CLI. O executável é o original, sem argumentos nem prompt injetado: a IDE só repassa o que você digita.',
        area: { x: 17, y: 72.2, l: 71.6, a: 27.8 },
        marca: { x: 52, y: 86 },
    },
    {
        titulo: 'Explorador e Git',
        texto: 'Árvore do projeto com a aba Alterações (34) e a marca M nos arquivos modificados.',
        area: { x: 88.6, y: 4.2, l: 11.4, a: 95.8 },
        marca: { x: 94.3, y: 30 },
    },
    {
        titulo: 'Barra superior',
        texto: 'Projeto aberto, branch atual, estado do grafo e a busca Ctrl+P, que acha arquivos, pastas e símbolos.',
        area: { x: 0, y: 0, l: 100, a: 4.2 },
        marca: { x: 47.5, y: 2.1 },
    },
];

const pct = (v) => `${v}%`;

function TourIDE() {
    const [ativo, setAtivo] = useState(null);

    const eventos = (i) => ({
        onMouseEnter: () => setAtivo(i),
        onMouseLeave: () => setAtivo(null),
        onFocus: () => setAtivo(i),
        onBlur: () => setAtivo(null),
        onClick: () => setAtivo(i),
        'aria-pressed': ativo === i,
    });

    return (
        <figure className="tour-ide" data-testid="tour-ide">
            <div className="tour-ide-quadro">
                <div className="tour-ide-recorte">
                    <img
                        src="/ASSETS/imagens/graph_visuals_ide.webp"
                        alt="Interface do Graph Visuals: grafo 3D do projeto AutoHerness-3D no centro, Claude Code e PowerShell na lateral esquerda, sessão do Kiro CLI no painel inferior e explorador de arquivos com alterações do Git à direita"
                        width={1919}
                        height={1079}
                        loading="lazy"
                        decoding="async"
                    />
                    {AREAS.map(({ titulo, area }, i) => (
                        <span
                            key={titulo}
                            className="tour-ide-area"
                            data-ativo={ativo === i}
                            aria-hidden="true"
                            style={{ left: pct(area.x), top: pct(area.y), width: pct(area.l), height: pct(area.a) }}
                        />
                    ))}
                </div>
                {AREAS.map(({ titulo, marca }, i) => (
                    <button
                        key={titulo}
                        type="button"
                        className="tour-ide-marca"
                        aria-label={`${i + 1}. ${titulo}`}
                        style={{ left: pct(marca.x), top: pct(marca.y) }}
                        {...eventos(i)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <a className="tour-ide-ampliar" href="/ASSETS/imagens/graph_visuals_ide.webp" target="_blank" rel="noopener noreferrer">
                Abrir o print em tamanho real
            </a>
            <figcaption>
                <ol className="tour-ide-legenda">
                    {AREAS.map(({ titulo, texto }, i) => (
                        <li key={titulo}>
                            <button type="button" className="tour-ide-item" {...eventos(i)}>
                                <span className="tour-ide-numero" aria-hidden="true">{i + 1}</span>
                                <span>
                                    <strong>{titulo}</strong>
                                    <span className="tour-ide-texto">{texto}</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ol>
            </figcaption>
        </figure>
    );
}

export { TourIDE };
