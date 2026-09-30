import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { easing, duration } from '../animations/presets';

const TECNOLOGIAS = ['TypeScript', 'Node.js', 'Bun', 'Fastify', 'PostgreSQL'];

function Hero() {
    const sectionRef = useRef(null);
    const fotoRef = useRef(null);
    const ctaRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

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

            // Foto: leve entrada adicional com escala, para dar profundidade
            // sem competir com o encadeamento principal do texto.
            if (fotoRef.current) {
                gsap.fromTo(fotoRef.current,
                    { opacity: 0, y: 14, scale: 0.96 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: duration.hero,
                        ease: easing.entry,
                        clearProps: 'transform',
                    }
                );
            }
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

        // Tilt 3D sutil na foto, seguindo o mouse dentro dos limites do card.
        const fotoEl = fotoRef.current;
        if (fotoEl) {
            const quickX = gsap.quickTo(fotoEl, 'rotateY', { duration: 0.5, ease: 'power3.out' });
            const quickY = gsap.quickTo(fotoEl, 'rotateX', { duration: 0.5, ease: 'power3.out' });
            const quickScale = gsap.quickTo(fotoEl, 'scale', { duration: 0.4, ease: 'power3.out' });

            const onMove = (event) => {
                const rect = fotoEl.getBoundingClientRect();
                const relX = (event.clientX - rect.left) / rect.width - 0.5;
                const relY = (event.clientY - rect.top) / rect.height - 0.5;
                quickX(relX * 14);
                quickY(relY * -14);
                quickScale(1.03);
            };

            const onLeave = () => {
                quickX(0);
                quickY(0);
                quickScale(1);
            };

            gsap.set(fotoEl, { transformPerspective: 600, transformStyle: 'preserve-3d' });
            fotoEl.addEventListener('mousemove', onMove);
            fotoEl.addEventListener('mouseleave', onLeave);
            cleanupFns.push(() => {
                fotoEl.removeEventListener('mousemove', onMove);
                fotoEl.removeEventListener('mouseleave', onLeave);
            });
        }

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
            if (fotoEl) gsap.set(fotoEl, { clearProps: 'transform,transformPerspective,transformStyle' });
            if (ctaEl) gsap.set(ctaEl, { clearProps: 'transform' });
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
                    <Link to="/projetos" className="hero-cta" ref={ctaRef}>Ver projetos</Link>
                    <Link to="/sobre" className="hero-link-secundario">Sobre meu trabalho</Link>
                </div>
            </div>
            <div className="hero-foto" ref={fotoRef}>
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
