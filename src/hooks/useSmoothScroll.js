import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registrarLenis } from './rolagem';

gsap.registerPlugin(ScrollTrigger);

/**
 * Rolagem suave (Lenis) sincronizada com o ScrollTrigger do GSAP.
 * Desligada com prefers-reduced-motion e em ambientes sem layout real.
 */
function useSmoothScroll() {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (typeof ResizeObserver === 'undefined') return;

        const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
        registrarLenis(lenis);
        const onScroll = () => ScrollTrigger.update();
        lenis.on('scroll', onScroll);
        const tick = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            lenis.off('scroll', onScroll);
            lenis.destroy();
            registrarLenis(null);
        };
    }, []);
}

export { useSmoothScroll };
