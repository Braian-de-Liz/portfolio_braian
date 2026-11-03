import { useEffect, useRef } from 'react';

/**
 * Cena 3D decorativa do hero (Three.js puro, carregado junto com a página).
 * Esfera de partículas + malha geométrica + anel orbital que reagem
 * ao mouse e ao scroll. Não renderiza nada sem WebGL, com
 * prefers-reduced-motion ou em ambiente de teste.
 */
function suportaCena() {
    if (typeof window === 'undefined') return false;
    if (typeof window.WebGL2RenderingContext === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (navigator.connection?.saveData) return false;
    return true;
}

function HeroScene() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !suportaCena()) return;

        let disposed = false;
        let cleanup = () => {};

        import('three').then((THREE) => {
            if (disposed) return;

            let renderer;
            try {
                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
            } catch {
                return; // sem contexto WebGL: o hero segue funcional sem a cena
            }

            const leve = window.matchMedia('(max-width: 768px)').matches;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, leve ? 1.5 : 2));
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
            camera.position.z = 6;

            const grupo = new THREE.Group();
            scene.add(grupo);

            const ciano = new THREE.Color('#38E8D0');
            const violeta = new THREE.Color('#8B7CFF');
            const rosa = new THREE.Color('#FF7AC6');

            // Casca de partículas distribuídas na esfera (espiral de Fibonacci)
            const total = leve ? 700 : 1600;
            const posicoes = new Float32Array(total * 3);
            const cores = new Float32Array(total * 3);
            const tmp = new THREE.Color();
            for (let i = 0; i < total; i++) {
                const y = 1 - (i / (total - 1)) * 2;
                const r = Math.sqrt(1 - y * y);
                const theta = Math.PI * (3 - Math.sqrt(5)) * i;
                const raio = 2.1 + (Math.random() - 0.5) * 0.18;
                posicoes[i * 3] = Math.cos(theta) * r * raio;
                posicoes[i * 3 + 1] = y * raio;
                posicoes[i * 3 + 2] = Math.sin(theta) * r * raio;
                tmp.copy(ciano).lerp(violeta, (y + 1) / 2);
                cores[i * 3] = tmp.r;
                cores[i * 3 + 1] = tmp.g;
                cores[i * 3 + 2] = tmp.b;
            }
            const geoParticulas = new THREE.BufferGeometry();
            geoParticulas.setAttribute('position', new THREE.BufferAttribute(posicoes, 3));
            geoParticulas.setAttribute('color', new THREE.BufferAttribute(cores, 3));
            const matParticulas = new THREE.PointsMaterial({
                size: 0.035, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false,
            });
            const particulas = new THREE.Points(geoParticulas, matParticulas);
            grupo.add(particulas);

            // Malha geométrica interna
            const geoMalha = new THREE.IcosahedronGeometry(1.45, 1);
            const matMalha = new THREE.MeshBasicMaterial({ color: ciano, wireframe: true, transparent: true, opacity: 0.22 });
            const malha = new THREE.Mesh(geoMalha, matMalha);
            grupo.add(malha);

            // Anéis orbitais
            const geoAnel = new THREE.TorusGeometry(2.7, 0.008, 8, 160);
            const matAnel = new THREE.MeshBasicMaterial({ color: violeta, transparent: true, opacity: 0.55 });
            const anel = new THREE.Mesh(geoAnel, matAnel);
            anel.rotation.x = Math.PI / 2.4;
            grupo.add(anel);
            const matAnel2 = new THREE.MeshBasicMaterial({ color: rosa, transparent: true, opacity: 0.35 });
            const anel2 = new THREE.Mesh(geoAnel, matAnel2);
            anel2.scale.setScalar(0.88);
            anel2.rotation.set(Math.PI / 3, 0.6, 0);
            grupo.add(anel2);

            // A foto vive DENTRO da cena, no centro do globo: as partículas
            // do fundo ficam atrás dela e as da frente passam por cima,
            // dando a impressão real de que ela está dentro da esfera.
            const imgDom = container.parentElement?.querySelector('img');
            const planoGeo = new THREE.PlaneGeometry(1, 1);
            const planoMat = new THREE.MeshBasicMaterial({ transparent: false, alphaTest: 0.5 });
            const plano = new THREE.Mesh(planoGeo, planoMat);
            plano.visible = false;
            scene.add(plano);
            let textura = null;

            const montarTextura = (imagem) => {
                const L = 800;
                const A = 1000;
                const canvas = document.createElement('canvas');
                canvas.width = L;
                canvas.height = A;
                const ctx = canvas.getContext('2d');
                const raio = 70;
                ctx.beginPath();
                ctx.roundRect(0, 0, L, A, raio);
                ctx.clip();
                // equivale a object-fit: cover com object-position: center 18%
                const escala = Math.max(L / imagem.naturalWidth, A / imagem.naturalHeight);
                const w = imagem.naturalWidth * escala;
                const h = imagem.naturalHeight * escala;
                ctx.drawImage(imagem, (L - w) / 2, (A - h) * 0.18, w, h);
                ctx.lineWidth = 6;
                ctx.strokeStyle = 'rgba(255,255,255,0.22)';
                ctx.beginPath();
                ctx.roundRect(3, 3, L - 6, A - 6, raio);
                ctx.stroke();
                textura = new THREE.CanvasTexture(canvas);
                textura.colorSpace = THREE.SRGBColorSpace;
                textura.anisotropy = 4;
                planoMat.map = textura;
                planoMat.needsUpdate = true;
                plano.visible = true;
                container.parentElement.dataset.cena = 'ativa';
            };

            if (imgDom) {
                const carregar = () => { if (!disposed) montarTextura(imgDom); };
                if (imgDom.complete && imgDom.naturalWidth) carregar();
                else imgDom.addEventListener('load', carregar, { once: true });
            }

            const mouse = { x: 0, y: 0 };
            const alvo = { x: 0, y: 0 };
            const onMouse = (e) => {
                mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
            };
            window.addEventListener('mousemove', onMouse, { passive: true });

            const resize = () => {
                const { clientWidth: w, clientHeight: h } = container;
                if (!w || !h) return;
                renderer.setSize(w, h, false);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                // plano com o mesmo tamanho em pixels da foto no layout
                if (imgDom && imgDom.clientWidth) {
                    const alturaVisivel = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
                    const porPixel = alturaVisivel / h;
                    plano.scale.set(imgDom.clientWidth * porPixel, imgDom.clientHeight * porPixel, 1);
                }
            };
            const ro = new ResizeObserver(resize);
            ro.observe(container);
            resize();

            let visivel = true;
            const io = new IntersectionObserver(([entry]) => { visivel = entry.isIntersecting; });
            io.observe(container);

            const relogio = new THREE.Clock();
            let raf = 0;
            const loop = () => {
                raf = requestAnimationFrame(loop);
                if (!visivel || document.hidden) return;
                const t = relogio.getElapsedTime();
                const scroll = window.scrollY / Math.max(window.innerHeight, 1);

                alvo.x += (mouse.x - alvo.x) * 0.05;
                alvo.y += (mouse.y - alvo.y) * 0.05;

                grupo.rotation.y = t * 0.12 + alvo.x * 0.6 + scroll * 1.4;
                grupo.rotation.x = alvo.y * 0.35 + scroll * 0.5;
                malha.rotation.y = -t * 0.18;
                malha.rotation.x = t * 0.1;
                anel.rotation.z = t * 0.2;
                anel2.rotation.z = -t * 0.15;
                const escala = 1 + scroll * 0.25;
                grupo.scale.setScalar(escala);
                matParticulas.opacity = Math.max(0.9 - scroll * 0.9, 0);

                plano.rotation.y = alvo.x * 0.18;
                plano.rotation.x = alvo.y * 0.1;

                renderer.render(scene, camera);
            };
            loop();

            cleanup = () => {
                cancelAnimationFrame(raf);
                window.removeEventListener('mousemove', onMouse);
                ro.disconnect();
                io.disconnect();
                [geoParticulas, geoMalha, geoAnel, planoGeo, planoMat, matParticulas, matMalha, matAnel, matAnel2].forEach((o) => o.dispose());
                textura?.dispose();
                delete container.parentElement?.dataset.cena;
                renderer.dispose();
                renderer.domElement.remove();
            };
            if (disposed) cleanup();
        });

        return () => {
            disposed = true;
            cleanup();
        };
    }, []);

    return <div className="hero-scene" ref={containerRef} aria-hidden="true" />;
}

export { HeroScene };
