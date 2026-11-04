import { useId, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../animations/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const MAX_STACK_VISIVEL = 6;

/**
 * Case técnico com dois níveis de leitura:
 *
 *  - Sempre visível: categoria, título, resumo, composição visual,
 *    métricas, stack compacta e links. Suficiente para uma leitura rápida.
 *  - Sob demanda: arquitetura, metodologia e decisões, dentro de um
 *    disclosure acessível.
 *
 * `composicao` recebe o elemento visual do projeto (diagrama, gráfico
 * ou bloco de código). `imagem` é um slot opcional, usado quando houver
 * um screenshot que realmente demonstre o produto em execução.
 */
function ProjetoCase({
    categoria,
    titulo,
    resumo,
    composicao,
    imagem,
    metricas,
    stack = [],
    links = [],
    detalhes,
    destaque = false,
    id,
}) {
    const [aberto, setAberto] = useState(false);
    const idBase = useId().replace(/:/g, '');
    const painelId = `${idBase}-detalhes`;
    const gatilhoId = `${idBase}-gatilho`;

    const secaoRef = useScrollReveal({ y: 20 });
    const figuraRef = useRef(null);

    // Parallax leve: a captura de tela desliza dentro da moldura ao rolar.
    useLayoutEffect(() => {
        const figura = figuraRef.current;
        if (!figura) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const img = figura.querySelector('img');
        if (!img) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(img, { yPercent: -5 }, {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: { trigger: figura, start: 'top bottom', end: 'bottom top', scrub: true },
            });
        }, figura);
        return () => ctx.revert();
    }, [imagem?.src]);
    const stackVisivel = stack.slice(0, MAX_STACK_VISIVEL);

    return (
        <article
            id={id}
            className={`projeto-case${destaque ? ' projeto-case-destaque' : ''}`}
            ref={secaoRef}
        >
            <header className="case-cabecalho">
                <span className="eyebrow">{categoria}</span>
                <h2 className="titulo">{titulo}</h2>
                <p className="case-resumo">{resumo}</p>
            </header>

            {imagem ? (
                <figure className="case-figura" ref={figuraRef}>
                    <div className="case-figura-quadro">
                        <img
                            src={imagem.src}
                            alt={imagem.alt}
                            width={imagem.largura}
                            height={imagem.altura}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    {imagem.legenda ? (
                        <figcaption>{imagem.legenda}</figcaption>
                    ) : null}
                </figure>
            ) : null}

            {composicao ? (
                <div className="case-composicao">{composicao}</div>
            ) : null}

            {metricas?.length ? (
                <ul className="case-metricas" data-testid="case-metricas">
                    {metricas.map((metrica) => (
                        <li className="case-metrica" key={metrica.rotulo}>
                            <span className="case-metrica-valor">{metrica.valor}</span>
                            <span className="case-metrica-rotulo">{metrica.rotulo}</span>
                        </li>
                    ))}
                </ul>
            ) : null}

            {stackVisivel.length ? (
                <div className="case-stack">
                    <span className="case-stack-label">Stack</span>
                    <ul className="case-stack-lista">
                        {stackVisivel.map((item) => (
                            <li className="case-stack-item" data-testid="case-stack-item" key={item}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            <div className="case-acoes">
                {links.map((link, indice) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className={`pagina-boton${indice === 0 ? ' primario' : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            {detalhes ? (
                <div className="case-disclosure">
                    <button
                        type="button"
                        id={gatilhoId}
                        className="case-disclosure-gatilho"
                        aria-expanded={aberto}
                        aria-controls={painelId}
                        onClick={() => setAberto((estado) => !estado)}
                    >
                        <span>Ver arquitetura e detalhes</span>
                        <span className="case-disclosure-icone" aria-hidden="true">
                            {aberto ? '−' : '+'}
                        </span>
                    </button>
                    <div
                        id={painelId}
                        role="region"
                        aria-labelledby={gatilhoId}
                        hidden={!aberto}
                        className="case-disclosure-painel"
                    >
                        {detalhes}
                    </div>
                </div>
            ) : null}
        </article>
    );
}

export { ProjetoCase };
