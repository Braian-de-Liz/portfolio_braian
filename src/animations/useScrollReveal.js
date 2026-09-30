import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing, duration, stagger as staggerPreset } from './presets';

gsap.registerPlugin(ScrollTrigger);

function useScrollReveal(options = {}) {
    const root = useRef(null);

    const {
        y = 30,
        opacity = 0,
        scale: scaleOption,
        stagger: staggerAmount = staggerPreset.normal,
        once = true,
        delay = 0,
        children = false,
    } = options;

    // Cards animados em grupo ganham uma leve escala de entrada por padrão,
    // reforçando a sensação de profundidade sem exagerar o movimento.
    const scale = scaleOption ?? (children ? 0.97 : 1);

    useLayoutEffect(() => {
        const node = root.current;
        if (!node) return;

        // Content is visible by default (no inline hidden state is applied up-front).
        // We only build the GSAP fromTo animation once the element actually enters
        // the viewport, so nothing can get stuck invisible while waiting for a trigger.

        // Reduced motion is evaluated dynamically; if the user prefers reduced motion
        // we simply never animate and leave the content visible.
        if (typeof window === 'undefined') return;

        const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        let ctx = null;
        let played = false;
        let observer = null;

        const play = () => {
            if (played) return;
            if (reduceQuery.matches) return; // dynamic reduced-motion check at trigger time
            played = true;

            const targets = children ? node.children : node;

            ctx = gsap.context(() => {
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
                    clearProps: 'transform',
                });
            }, node);
        };

        if (typeof IntersectionObserver !== 'undefined') {
            observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        play();
                        if (once && observer) {
                            observer.disconnect();
                            observer = null;
                        }
                    }
                }
            }, { threshold: 0.01, rootMargin: '0px 0px -8% 0px' });
            observer.observe(node);
        } else {
            // No IntersectionObserver support: never hide content. Just animate in
            // immediately so the reveal still reads as intentional.
            play();
        }

        return () => {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
            if (ctx) {
                ctx.revert();
                ctx = null;
            }
            // Safety net: never leave content invisible after teardown.
            const revertTargets = children ? Array.from(node.children) : node;
            gsap.set(revertTargets, { opacity: 1, y: 0, scale: 1, clearProps: 'transform' });
        };
    }, [y, opacity, scale, staggerAmount, once, delay, children]);

    return root;
}

function useParallax(property = 'y', value = -50, triggerRef) {
    const root = useRef(null);

    useLayoutEffect(() => {
        const trigger = triggerRef?.current || root.current;
        if (!trigger) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.to(root.current, {
                [property]: value,
                ease: 'none',
                scrollTrigger: {
                    trigger,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                },
            });
        }, trigger);

        return () => ctx.revert();
    }, [property, value, triggerRef]);

    return root;
}

export { useScrollReveal, useParallax };
