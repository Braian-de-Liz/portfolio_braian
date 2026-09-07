import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing, duration } from '../animations/presets';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
    const sectionRef = useRef(null);
    const olaRef = useRef(null);
    const nomeRef = useRef(null);
    const cargoRef = useRef(null);
    const descRef = useRef(null);
    const tagsRef = useRef(null);
    const ctaRef = useRef(null);
    const fotoRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: easing.entry } });

            tl.fromTo(olaRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: duration.fast }
            )
            .fromTo(nomeRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: duration.hero },
                '-=0.3'
            )
            .fromTo(cargoRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: duration.entry },
                '-=0.5'
            )
            .fromTo(descRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: duration.entry },
                '-=0.4'
            )
            .fromTo(tagsRef.current.children,
                { opacity: 0, y: 10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: duration.fast, stagger: 0.06 },
                '-=0.3'
            )
            .fromTo(ctaRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: duration.entry },
                '-=0.2'
            )
            .fromTo(fotoRef.current,
                { opacity: 0, y: 20, scale: 0.94 },
                { opacity: 1, y: 0, scale: 1, duration: duration.hero },
                '-=0.7'
            );

            if (!prefersReducedMotion) {
                gsap.to(fotoRef.current, {
                    y: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.5,
                    },
                });

                gsap.to(section.querySelector('.hero-content'), {
                    y: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 0.5,
                    },
                });
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={sectionRef}>
            <div className="hero-content">
                <p className="hero-ola" ref={olaRef}>Olá, eu sou</p>
                <h1 className="hero-nome" ref={nomeRef}>Braian de Liz</h1>
                <h2 className="hero-cargo" ref={cargoRef}>Desenvolvedor de Sistemas</h2>
                <p className="hero-desc" ref={descRef}>
                    Construo aplicações web focadas em performance,
                    arquitetura e escalabilidade.
                </p>
                <div className="hero-tags" ref={tagsRef}>
                    <span className="hero-tag">JavaScript</span>
                    <span className="hero-tag">TypeScript</span>
                    <span className="hero-tag">Node.js</span>
                    <span className="hero-tag">Fastify</span>
                </div>
                <Link to="/projetos" className="hero-cta" ref={ctaRef}>Ver Projetos</Link>
            </div>
            <div className="hero-foto" ref={fotoRef}>
                <img src="ASSETS/imagens/foto_braian.jpg" alt="Braian de Liz" />
            </div>
        </section>
    );
}

export { Hero };
