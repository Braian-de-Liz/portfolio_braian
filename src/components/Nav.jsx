import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HouseIcon, CodeIcon, BookOpenIcon, ZapIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Nav() {
    const navRef = useRef(null);

    useLayoutEffect(() => {
        if (prefersReducedMotion) return;

        const nav = navRef.current;
        if (!nav) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 50,
                onEnter: () => gsap.to(nav, {
                    backgroundColor: 'rgba(7, 16, 23, 0.85)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderColor: 'rgba(79, 193, 233, 0.2)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                    duration: 0.25,
                    ease: 'power2.out',
                }),
                onLeaveBack: () => gsap.to(nav, {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
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
            <nav id="barrasup" ref={navRef}>
                <ul className="nav-links">
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/projetos">Projetos</Link></li>
                    <li><Link to="/sobre">Sobre</Link></li>
                    <li><Link to="/habilidades">Habilidades</Link></li>
                </ul>
            </nav>

            <nav id="rodanav">
                <Link to="/">
                    <HouseIcon />
                    <span>Início</span>
                </Link>
                <Link to="/projetos">
                    <CodeIcon />
                    <span>Projetos</span>
                </Link>
                <Link to="/sobre">
                    <BookOpenIcon />
                    <span>Sobre</span>
                </Link>
                <Link to="/habilidades">
                    <ZapIcon />
                    <span>Habilidades</span>
                </Link>
            </nav>
        </>
    );
}

export { Nav };
