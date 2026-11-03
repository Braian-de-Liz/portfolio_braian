import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroScene } from './HeroScene';
import { suportaCena } from './suportaCena';
import { easing, duration } from '../animations/presets';

gsap.registerPlugin(ScrollTrigger);

const TECNOLOGIAS = ['TypeScript', 'Node.js', 'Bun', 'Fastify', 'PostgreSQL'];

function Hero() {
    const sectionRef = useRef(null);
    const fotoRef = useRef(null);
    const ctaRef = useRef(null);
    const comCena = suportaCena();

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const alvos = section.querySelectorAll('[data-hero-item]');
        if (alvos.length === 0) return;

        const ctx = gsap.context(() => {
            // Nome: cada linha sobe de dentro de uma máscara
            gsap.fromTo(section.querySelectorAll('.hero-nome-linha > span'),
                { yPercent: 115, rotate: 4 },
                { yPercent: 0, rotate: 0, duration: 1.1, ease: easing.entry, stagger: 0.12, delay: 0.1 }
            );

            // Parallax: o texto sobe e esmaece enquanto a página rola
            gsap.to(section.querySelector('.hero-content'), {
                yPercent: -14, opacity: 0.15, ease: 'none',
                scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
            });
            if (fotoRef.current) {
                gsap.to(fotoRef.current, {
                    yPercent: 10, ease: 'none',
                    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
                });
            }

            gsap.fromTo(alvos,
                { opacity: 0, y: 14 },
                {
                    opacity: 1,
                    y: 0,
                    duration: duration.entry,
                    ease: easing.entry,
                    stagger: 0.07,
                    clearProps: 'transform',
                }
            );
        }, section);

        // Interações ricas (tilt 3D, magnetismo) só fazem sentido com mouse
        // de precisão: em touch elas não disparam e apenas adicionam custo.
        const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!isDesktopPointer) {
            return () => {
                ctx.revert();
                gsap.set(alvos, { opacity: 1, y: 0, clearProps: 'transform' });
            };
        }

        const cleanupFns = [];

        // CTA magnético: o botão se desloca levemente em direção ao cursor.
        const ctaEl = ctaRef.current;
        if (ctaEl) {
            const quickX = gsap.quickTo(ctaEl, 'x', { duration: 0.35, ease: 'power3.out' });
            const quickY = gsap.quickTo(ctaEl, 'y', { duration: 0.35, ease: 'power3.out' });

            const onMove = (event) => {
                const rect = ctaEl.getBoundingClientRect();
                const relX = event.clientX - (rect.left + rect.width / 2);
                const relY = event.clientY - (rect.top + rect.height / 2);
                quickX(relX * 0.25);
                quickY(relY * 0.35);
            };

            const onLeave = () => {
                quickX(0);
                quickY(0);
            };

            ctaEl.addEventListener('mousemove', onMove);
            ctaEl.addEventListener('mouseleave', onLeave);
            cleanupFns.push(() => {
                ctaEl.removeEventListener('mousemove', onMove);
                ctaEl.removeEventListener('mouseleave', onLeave);
            });
        }

        return () => {
            ctx.revert();
            gsap.set(alvos, { opacity: 1, y: 0, clearProps: 'transform' });
            cleanupFns.forEach((fn) => fn());
            if (ctaEl) gsap.set(ctaEl, { clearProps: 'transform' });
        };
    }, []);

    return (
        <section className="hero" ref={sectionRef}>
            <div className="hero-content">
                <p className="hero-ola" data-hero-item>Olá, eu sou</p>
                <h1 className="hero-nome" aria-label="Braian de Liz">
                    <span className="hero-nome-linha" aria-hidden="true"><span>Braian</span></span>
                    <span className="hero-nome-linha" aria-hidden="true"><span>de Liz</span></span>
                </h1>
                <h2 className="hero-cargo" data-hero-item>
                    Desenvolvedor de sistemas com foco em <strong>backend</strong>
                </h2>
                <p className="hero-desc" data-testid="hero-desc" data-hero-item>
                    Construo APIs e serviços em JavaScript e TypeScript e me preocupo
                    com a arquitetura, com a consistência dos dados e com o custo de rodar tudo.
                </p>
                <div className="hero-tags" data-testid="hero-tags" data-hero-item>
                    {TECNOLOGIAS.map((tech) => (
                        <span className="hero-tag" key={tech}>{tech}</span>
                    ))}
                </div>
                <div className="hero-acoes" data-hero-item>
                    <Link to="/projetos" className="hero-cta" ref={ctaRef}>Ver projetos</Link>
                    <Link to="/sobre" className="hero-link-secundario">Sobre meu trabalho</Link>
                </div>
            </div>
            {comCena ? (
                <div className="hero-foto" ref={fotoRef}>
                    <HeroScene />
                </div>
            ) : null}
        </section>
    );
}

export { Hero };
