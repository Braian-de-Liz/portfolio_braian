import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { easing, duration } from './presets';

const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function usePageEntry(options = {}) {
    const root = useRef(null);

    const {
        eyebrow = '.page-eyebrow',
        title = '.page-title',
        subtitle = '.page-subtitle',
        content = '.page-content',
        stagger = 0.15,
    } = options;

    useLayoutEffect(() => {
        if (prefersReducedMotion) return;

        const node = root.current;
        if (!node) return;

        const eyebrowEl = node.querySelector(eyebrow);
        const titleEl = node.querySelector(title);
        const subtitleEl = node.querySelector(subtitle);
        const contentEl = node.querySelector(content);

        const targets = [eyebrowEl, titleEl, subtitleEl, contentEl].filter(Boolean);
        if (targets.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(targets, {
                opacity: 0,
                y: 20,
            }, {
                opacity: 1,
                y: 0,
                duration: duration.entry,
                ease: easing.entry,
                stagger,
            });
        }, node);

        return () => ctx.revert();
    }, [eyebrow, title, subtitle, content, stagger]);

    return root;
}

export { usePageEntry };
