import { useEffect, useRef, useState } from 'react';
import { suportaCena as suportaCena3D } from '../suportaCena';

/**
 * Monta a cena, liga o loop de render e devolve a função que desmonta tudo.
 * `montar(THREE, { scene, camera, container })` devolve `{ atualizar(t, mouse) }`.
 */
function construir(THREE, container, montar) {
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
        return () => {}; // sem contexto WebGL: a página segue funcional sem a cena
    }

    const leve = window.matchMedia('(max-width: 768px)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, leve ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const cena = montar(THREE, { scene, camera, container, leve });

    const resize = () => {
        const { clientWidth: w, clientHeight: h } = container;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const alvo = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
        const r = container.getBoundingClientRect();
        alvo.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        alvo.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => { alvo.x = 0; alvo.y = 0; };
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);

    const inicio = performance.now();
    let raf = 0;
    const loop = () => {
        raf = requestAnimationFrame(loop);
        if (document.hidden) return;
        mouse.x += (alvo.x - mouse.x) * 0.06;
        mouse.y += (alvo.y - mouse.y) * 0.06;
        cena.atualizar((performance.now() - inicio) / 1000, mouse);
        renderer.render(scene, camera);
    };
    loop();

    return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        container.removeEventListener('pointermove', onMove);
        container.removeEventListener('pointerleave', onLeave);
        scene.traverse((o) => {
            o.geometry?.dispose();
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach((m) => m?.dispose());
        });
        renderer.dispose();
        renderer.domElement.remove();
        container.querySelectorAll('.cena-rotulo, .cena-legenda').forEach((el) => el.remove());
    };
}

/**
 * Cena 3D decorativa de uma seção. Só existe enquanto está perto da tela
 * (um contexto WebGL por vez, no máximo alguns) e some por completo sem WebGL,
 * com "reduzir movimento" ou economia de dados: o conteúdo ao redor basta.
 */
function Cena3D({ montar, className = '' }) {
    const [suportado] = useState(suportaCena3D);
    const ref = useRef(null);

    useEffect(() => {
        if (!suportado) return;
        const container = ref.current;
        if (!container) return;

        let corrente = null;
        let cancelado = false;

        const iniciar = () => {
            if (corrente || cancelado) return;
            const marca = { fim: () => {} };
            corrente = marca;
            import('three').then((THREE) => {
                if (cancelado || corrente !== marca) return;
                marca.fim = construir(THREE, container, montar);
            });
        };
        const parar = () => {
            if (!corrente) return;
            const marca = corrente;
            corrente = null;
            marca.fim();
        };

        const io = new IntersectionObserver(
            ([entrada]) => (entrada.isIntersecting ? iniciar() : parar()),
            { rootMargin: '200px' },
        );
        io.observe(container);

        return () => {
            cancelado = true;
            io.disconnect();
            parar();
        };
    }, [suportado, montar]);

    if (!suportado) return null;
    return <div className={`cena-3d ${className}`} ref={ref} aria-hidden="true" />;
}

export { Cena3D };
