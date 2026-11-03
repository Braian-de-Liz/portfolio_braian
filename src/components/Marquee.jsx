import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINHAS = [
    ['TypeScript', 'Bun', 'Fastify', 'Hono', 'PostgreSQL', 'Drizzle', 'Prisma', 'TypeBox', 'Zod', 'Node.js'],
    ['Arquitetura', 'Performance', 'APIs', 'Benchmarks', 'Dados', 'Open source'],
];

/** Faixas de texto que deslizam em sentidos opostos conforme o scroll. */
function Marquee() {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = gsap.context(() => {
            root.querySelectorAll('[data-marquee-track]').forEach((track, i) => {
                const dir = i % 2 === 0 ? -1 : 1;
                gsap.fromTo(track,
                    { xPercent: dir === -1 ? 0 : -25 },
                    {
                        xPercent: dir === -1 ? -25 : 0,
                        ease: 'none',
                        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
                    }
                );
            });
        }, root);
        return () => ctx.revert();
    }, []);

    return (
        <div className="marquee" ref={rootRef} aria-hidden="true">
            {LINHAS.map((palavras, i) => (
                <div className={`marquee-linha ${i % 2 ? 'contorno' : ''}`} key={i}>
                    <div className="marquee-track" data-marquee-track>
                        {[...palavras, ...palavras, ...palavras, ...palavras].map((p, j) => (
                            <span key={j}>{p}<i>✦</i></span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export { Marquee };
