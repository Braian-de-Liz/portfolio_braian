import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

/**
 * Tilt 3D sutil que segue o cursor, aplicado a todos os elementos
 * `[data-tilt]` dentro do container retornado. Só é ativado em
 * desktop com mouse de precisão (hover: hover e pointer: fine) e
 * respeita prefers-reduced-motion.
 *
 * Pensado para grids de cards, onde cada card reage individualmente
 * ao cursor que está sobre ele.
 */
function useTiltHover(options = {}) {
    const root = useRef(null);
    const { max = 8, scale = 1.02, perspective = 700 } = options;

    useLayoutEffect(() => {
        const container = root.current;
        if (!container) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (prefersReducedMotion || !isDesktopPointer) return;

        const cards = Array.from(container.querySelectorAll('[data-tilt]'));
        if (cards.length === 0) return;

        const cleanupFns = cards.map((card) => {
            const quickX = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power3.out' });
            const quickY = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power3.out' });
            const quickScale = gsap.quickTo(card, 'scale', { duration: 0.3, ease: 'power3.out' });

            gsap.set(card, { transformPerspective: perspective, transformStyle: 'preserve-3d' });

            const onMove = (event) => {
                const rect = card.getBoundingClientRect();
                const relX = (event.clientX - rect.left) / rect.width - 0.5;
                const relY = (event.clientY - rect.top) / rect.height - 0.5;
                quickX(relX * max);
                quickY(relY * -max);
                quickScale(scale);
            };

            const onLeave = () => {
                quickX(0);
                quickY(0);
                quickScale(1);
            };

            card.addEventListener('mousemove', onMove);
            card.addEventListener('mouseleave', onLeave);

            return () => {
                card.removeEventListener('mousemove', onMove);
                card.removeEventListener('mouseleave', onLeave);
                gsap.set(card, { clearProps: 'transform,transformPerspective,transformStyle' });
            };
        });

        return () => {
            cleanupFns.forEach((fn) => fn());
        };
    }, [max, scale, perspective]);

    return root;
}

export { useTiltHover };
