import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing, duration, stagger as staggerPreset, scrollConfig } from './presets';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useScrollReveal(options = {}) {
    const root = useRef(null);

    const {
        y = 30,
        opacity = 0,
        scale = 1,
        stagger: staggerAmount = staggerPreset.normal,
        start = scrollConfig.reveal.start,
        once = true,
        delay = 0,
        children = false,
    } = options;

    useLayoutEffect(() => {
        if (prefersReducedMotion) return;

        const node = root.current;
        if (!node) return;

        const targets = children ? node.children : node;

        const ctx = gsap.context(() => {
            gsap.fromTo(targets, {
                y,
                opacity,
                scale: scale !== 1 ? scale : undefined,
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: duration.entry,
                ease: easing.entry,
                stagger: children ? staggerAmount : 0,
                delay,
                scrollTrigger: {
                    trigger: node,
                    start,
                    once,
                },
            });
        }, node);

        return () => ctx.revert();
    }, [y, opacity, scale, staggerAmount, start, once, delay, children]);

    return root;
}

function useParallax(property = 'y', value = -50, triggerRef) {
    const root = useRef(null);

    useLayoutEffect(() => {
        if (prefersReducedMotion) return;

        const trigger = triggerRef?.current || root.current;
        if (!trigger) return;

        const ctx = gsap.context(() => {
            gsap.to(root.current, {
                [property]: value,
                ease: 'none',
                scrollTrigger: {
                    trigger,
                    start: scrollConfig.hero.start,
                    end: scrollConfig.hero.end,
                    scrub: 0.5,
                },
            });
        }, trigger);

        return () => ctx.revert();
    }, [property, value, triggerRef]);

    return root;
}

export { useScrollReveal, useParallax };
