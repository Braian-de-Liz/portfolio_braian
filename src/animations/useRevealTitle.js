import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, scrollConfig } from './presets';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useRevealTitle(options = {}) {
    const root = useRef(null);

    const {
        start = scrollConfig.reveal.start,
        once = true,
    } = options;

    useLayoutEffect(() => {
        if (prefersReducedMotion) return;

        const node = root.current;
        if (!node) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(node, {
                clipPath: motion.revealTitle.clipPath,
                opacity: motion.revealTitle.opacity,
            }, {
                clipPath: 'inset(0 0% 0 0)',
                opacity: 1,
                duration: motion.revealTitle.duration,
                ease: motion.revealTitle.ease,
                scrollTrigger: {
                    trigger: node,
                    start,
                    once,
                },
            });
        }, node);

        return () => ctx.revert();
    }, [start, once]);

    return root;
}

export { useRevealTitle };
