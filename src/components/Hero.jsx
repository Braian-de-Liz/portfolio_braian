import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { easing, duration } from '../animations/presets';

const TECNOLOGIAS = ['TypeScript', 'Node.js', 'Bun', 'Fastify', 'PostgreSQL'];

function Hero() {
    const sectionRef = useRef(null);
    const fotoRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Uma única entrada encadeada e discreta: sem parallax,
        // sem tilt por mouse e sem escala nos elementos de texto.
        const alvos = section.querySelectorAll('[data-hero-item]');
        if (alvos.length === 0) return;

        const ctx = gsap.context(() => {
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

        return () => {
            ctx.revert();
            gsap.set(alvos, { opacity: 1, y: 0, clearProps: 'transform' });
        };
    }, []);

    return (
        <section className="hero" ref={sectionRef}>
            <div className="hero-content">
                <p className="hero-ola" data-hero-item>Olá, eu sou</p>
                <h1 className="hero-nome" data-hero-item>Braian de Liz</h1>
                <h2 className="hero-cargo" data-hero-item>
                    Desenvolvedor de sistemas com foco em <strong>backend</strong>
                </h2>
                <p className="hero-desc" data-testid="hero-desc" data-hero-item>
                    Construo APIs e serviços em JavaScript e TypeScript, com atenção
                    a arquitetura, consistência de dados e custo de execução.
                </p>
                <div className="hero-tags" data-testid="hero-tags" data-hero-item>
                    {TECNOLOGIAS.map((tech) => (
                        <span className="hero-tag" key={tech}>{tech}</span>
                    ))}
                </div>
                <div className="hero-acoes" data-hero-item>
                    <Link to="/projetos" className="hero-cta">Ver projetos</Link>
                    <Link to="/sobre" className="hero-link-secundario">Sobre meu trabalho</Link>
                </div>
            </div>
            <div className="hero-foto" ref={fotoRef} data-hero-item>
                <img
                    src="/ASSETS/imagens/foto_braian.jpg"
                    alt="Retrato de Braian de Liz"
                    width="232"
                    height="290"
                    decoding="async"
                    fetchPriority="high"
                />
            </div>
        </section>
    );
}

export { Hero };
