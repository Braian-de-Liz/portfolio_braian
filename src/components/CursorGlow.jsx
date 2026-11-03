import { useEffect, useRef } from 'react';

/** Halo de luz que segue o cursor. Só em desktop com mouse de precisão. */
function CursorGlow() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || reduce) return;

        let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y, raf = 0;
        el.dataset.ativo = 'true';
        // O loop só roda enquanto o halo ainda está alcançando o cursor.
        const loop = () => {
            cx += (x - cx) * 0.14;
            cy += (y - cy) * 0.14;
            el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
            raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(loop) : 0;
        };
        const onMove = (e) => {
            x = e.clientX;
            y = e.clientY;
            if (!raf) raf = requestAnimationFrame(loop);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        loop();
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            delete el.dataset.ativo;
        };
    }, []);

    return <div className="cursor-glow" ref={ref} aria-hidden="true" />;
}

export { CursorGlow };
