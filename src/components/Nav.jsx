import { useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HouseIcon, CodeIcon, BookOpenIcon, ZapIcon } from './Icons';
import { useSecaoAtiva } from '../hooks/useSecaoAtiva';
import { rolarParaElemento } from '../hooks/rolagem';

gsap.registerPlugin(ScrollTrigger);

const SECOES = [
    { id: 'inicio', rotulo: 'Início', icone: <HouseIcon /> },
    { id: 'projetos', rotulo: 'Projetos', icone: <CodeIcon /> },
    { id: 'habilidades', rotulo: 'Habilidades', icone: <ZapIcon /> },
    { id: 'sobre', rotulo: 'Sobre', icone: <BookOpenIcon /> },
];
const IDS = SECOES.map((s) => s.id);

/** Link para uma seção da página única: rola mesmo quando o hash já é o mesmo. */
function LinkSecao({ id, ativa, children }) {
    const aoClicar = () => rolarParaElemento(document.getElementById(id));
    return (
        <Link
            to={{ pathname: '/', hash: id === 'inicio' ? '' : `#${id}` }}
            className={ativa ? 'active' : undefined}
            aria-current={ativa ? 'location' : undefined}
            onClick={aoClicar}
        >
            {children}
        </Link>
    );
}

function Nav() {
    const navRef = useRef(null);
    const { pathname, hash } = useLocation();
    const inicial = pathname === '/' && IDS.includes(hash.slice(1)) ? hash.slice(1) : 'inicio';
    const ativa = useSecaoAtiva(IDS, inicial);
    const secaoMarcada = pathname === '/' ? ativa : null;

    useLayoutEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 50,
                onEnter: () => gsap.to(nav, {
                    backgroundColor: 'rgba(9, 15, 21, 0.86)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderColor: 'rgba(255, 255, 255, 0.11)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.26)',
                    duration: 0.25,
                    ease: 'power2.out',
                }),
                onLeaveBack: () => gsap.to(nav, {
                    // Mesmos valores do estado inicial em styles.css,
                    // para a navbar voltar exatamente ao tom original.
                    backgroundColor: 'rgba(13, 21, 28, 0.66)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 255, 255, 0.07)',
                    boxShadow: 'none',
                    duration: 0.25,
                    ease: 'power2.out',
                }),
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <nav id="barrasup" ref={navRef} aria-label="Navegação principal">
                <ul className="nav-links">
                    {SECOES.map(({ id, rotulo }) => (
                        <li key={id}>
                            <LinkSecao id={id} ativa={secaoMarcada === id}>{rotulo}</LinkSecao>
                        </li>
                    ))}
                </ul>
            </nav>

            <nav id="rodanav" aria-label="Navegação mobile">
                {SECOES.map(({ id, rotulo, icone }) => (
                    <LinkSecao id={id} ativa={secaoMarcada === id} key={id}>
                        {icone}
                        <span>{rotulo}</span>
                    </LinkSecao>
                ))}
            </nav>
        </>
    );
}

export { Nav };
