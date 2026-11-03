import { useEffect, useRef } from 'react';

/** Barra fina no topo indicando o progresso de leitura da página. */
function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;
        let raf = 0;
        const update = () => {
            raf = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            bar.style.transform = `scaleX(${p})`;
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return <div className="scroll-progress" ref={barRef} aria-hidden="true" />;
}

export { ScrollProgress };
