import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

/** Retrato da página Sobre, com tilt 3D sutil seguindo o mouse (só com mouse de precisão). */
function RetratoSobre() {
    const ref = useRef(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const rx = gsap.quickTo(el, 'rotateX', { duration: 0.5, ease: 'power3.out' });
        const ry = gsap.quickTo(el, 'rotateY', { duration: 0.5, ease: 'power3.out' });
        const sc = gsap.quickTo(el, 'scale', { duration: 0.4, ease: 'power3.out' });
        gsap.set(el, { transformPerspective: 700 });

        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 14);
            rx(((e.clientY - r.top) / r.height - 0.5) * -14);
            sc(1.03);
        };
        const onLeave = () => { rx(0); ry(0); sc(1); };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
            gsap.set(el, { clearProps: 'transform' });
        };
    }, []);

    return (
        <figure className="sobre-retrato" ref={ref}>
            <img
                src="/ASSETS/imagens/foto_braian.jpg"
                alt="Retrato de Braian de Liz"
                width="232"
                height="290"
                decoding="async"
            />
        </figure>
    );
}

export { RetratoSobre };
