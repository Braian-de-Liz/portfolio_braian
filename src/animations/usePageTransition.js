import { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { easing, duration } from './presets';

const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function usePageTransition() {
    const root = useRef(null);
    const location = useLocation();

    useLayoutEffect(() => {
        if (prefersReducedMotion) {
            window.scrollTo(0, 0);
            return;
        }

        const node = root.current;
        if (!node) return;

        window.scrollTo(0, 0);

        const ctx = gsap.context(() => {
            gsap.fromTo(node, {
                opacity: 0,
                y: 10,
            }, {
                opacity: 1,
                y: 0,
                duration: duration.entry,
                ease: easing.entry,
            });
        }, node);

        return () => ctx.revert();
    }, [location.pathname]);

    return root;
}

export { usePageTransition };
