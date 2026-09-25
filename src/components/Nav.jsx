import { useRef, useLayoutEffect } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HouseIcon, CodeIcon, BookOpenIcon, ZapIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

function Nav() {
    const navRef = useRef(null);

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
                    // Mesmos valores do estado inicial em App.css,
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
                    <li><NavLink to="/" end>Início</NavLink></li>
                    <li><NavLink to="/projetos">Projetos</NavLink></li>
                    <li><NavLink to="/sobre">Sobre</NavLink></li>
                    <li><NavLink to="/habilidades">Habilidades</NavLink></li>
                </ul>
            </nav>

            <nav id="rodanav" aria-label="Navegação mobile">
                <NavLink to="/" end>
                    <HouseIcon />
                    <span>Início</span>
                </NavLink>
                <NavLink to="/projetos">
                    <CodeIcon />
                    <span>Projetos</span>
                </NavLink>
                <NavLink to="/sobre">
                    <BookOpenIcon />
                    <span>Sobre</span>
                </NavLink>
                <NavLink to="/habilidades">
                    <ZapIcon />
                    <span>Habilidades</span>
                </NavLink>
            </nav>
        </>
    );
}

export { Nav };
