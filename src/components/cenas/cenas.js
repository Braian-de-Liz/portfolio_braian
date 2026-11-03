/*
 * Fábricas das cenas 3D. Cada uma recebe (THREE, { scene, camera, container, leve })
 * e devolve { atualizar(t, mouse) }. Geometrias e materiais são liberados
 * por Cena3D ao desmontar, então aqui só se cria.
 */
const CIANO = '#38E8D0';
const VIOLETA = '#8B7CFF';
const ROSA = '#FF7AC6';
const BRANCO = '#F4F6F8';

const suave = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

function criarRotulo(container, texto, classe = '') {
    const el = document.createElement('span');
    el.className = `cena-rotulo ${classe}`.trim();
    el.textContent = texto;
    container.appendChild(el);
    return el;
}

/** Posiciona um elemento HTML sobre um ponto 3D. */
function projetar(THREE, ponto, camera, container, el, deslocY = 0) {
    const v = ponto.clone().project(camera);
    el.style.transform = `translate(-50%, -50%) translate(${(v.x * 0.5 + 0.5) * container.clientWidth}px, ${(-v.y * 0.5 + 0.5) * container.clientHeight + deslocY}px)`;
}

function caixaComBorda(THREE, largura, altura, profundidade, cor, opacidadeFill = 0.16) {
    const geo = new THREE.BoxGeometry(largura, altura, profundidade);
    const fill = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: opacidadeFill, depthWrite: false }),
    );
    const borda = new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: cor, transparent: true, opacity: 0.9 }),
    );
    const grupo = new THREE.Group();
    grupo.add(fill, borda);
    return { grupo, fill, borda };
}

/** Afasta a câmera em telas estreitas para a cena inteira continuar visível. */
function ajustarDistancia(camera, base, larguraMundo) {
    const distancia = base.length();
    const k = Math.max(1, larguraMundo / (camera.aspect * 0.828 * distancia));
    camera.position.copy(base).multiplyScalar(k);
}

/* ---------- AMOTIF: camadas de áudio versionadas ---------- */
export function cenaCamadasAmotif(THREE, { scene, camera }) {
    camera.position.set(0, 4, 8.4);
    camera.lookAt(0, 0.6, 0);

    const grupo = new THREE.Group();
    scene.add(grupo);

    const cores = [CIANO, VIOLETA, ROSA, CIANO];
    const PASSO = 0.95;
    const PONTOS = 72;
    const ondas = [];

    const criarCamada = (cor, freq) => {
        const { grupo: camada, fill, borda } = caixaComBorda(THREE, 4.4, 0.06, 2.6, cor, 0.14);
        const pos = new Float32Array(PONTOS * 3);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const onda = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: cor, transparent: true, opacity: 0.95 }));
        camada.add(onda);
        ondas.push({ pos, geo, freq, fase: Math.random() * 6 });
        return { camada, fill, borda };
    };

    const camadas = cores.map((cor, i) => {
        const c = criarCamada(cor, 2.2 + i * 0.7);
        c.camada.position.y = (i - 1.5) * PASSO;
        grupo.add(c.camada);
        return c;
    });

    // a camada nova desce, entra no topo da pilha e se dissolve (ciclo de contribuição)
    const nova = criarCamada(BRANCO, 3.4);
    grupo.add(nova.camada);
    const TOPO = (cores.length - 1.5) * PASSO;

    return {
        atualizar(t, mouse) {
            ondas.forEach((o, i) => {
                for (let k = 0; k < PONTOS; k++) {
                    const x = (k / (PONTOS - 1) - 0.5) * 4;
                    o.pos[k * 3] = x;
                    o.pos[k * 3 + 1] = 0.05 + Math.sin(x * o.freq + t * 1.4 + o.fase + i) * 0.13 * Math.cos(x * 0.6);
                    o.pos[k * 3 + 2] = 0;
                }
                o.geo.attributes.position.needsUpdate = true;
            });

            const ciclo = (t % 5.5) / 5.5;
            let y = TOPO + 2.2;
            let opacidade = 0;
            if (ciclo < 0.4) {
                const p = suave(ciclo / 0.4);
                y = TOPO + 2.2 * (1 - p);
                opacidade = p;
            } else if (ciclo < 0.85) {
                y = TOPO;
                opacidade = 1;
            } else {
                y = TOPO;
                opacidade = 1 - (ciclo - 0.85) / 0.15;
            }
            nova.camada.position.y = y;
            nova.fill.material.opacity = 0.22 * opacidade;
            nova.borda.material.opacity = opacidade;
            nova.camada.children[2].material.opacity = opacidade;

            grupo.rotation.y = -0.55 + Math.sin(t * 0.25) * 0.12 + mouse.x * 0.35;
            grupo.rotation.x = mouse.y * 0.12;
            camadas.forEach((c, i) => { c.camada.position.y = (i - 1.5) * PASSO + Math.sin(t * 0.8 + i) * 0.03; });
        },
    };
}

/* ---------- TypeMarks: colunas de throughput ---------- */
export function criarCenaBarras(cenarios) {
    return function cenaBarras(THREE, { scene, camera, container }) {
        const baseCamera = new THREE.Vector3(1.2, 3.6, 10.6);
        camera.position.copy(baseCamera);
        camera.lookAt(0, 1.3, 0);

        const grupo = new THREE.Group();
        scene.add(grupo);

        const chao = new THREE.GridHelper(10, 10, '#8B7CFF', '#8B7CFF');
        chao.material.transparent = true;
        chao.material.opacity = 0.18;
        grupo.add(chao);

        const maximo = Math.max(...cenarios.map((c) => c.reqs));
        const ALTURA = 3.4;
        const colunas = cenarios.map((c, i) => {
            const cor = c.runtime === 'Bun' ? CIANO : ROSA;
            const h = (c.reqs / maximo) * ALTURA;
            const { grupo: caixa, fill } = caixaComBorda(THREE, 0.95, 1, 0.95, cor, 0.3);
            caixa.position.x = (i - (cenarios.length - 1) / 2) * 2.9;
            grupo.add(caixa);
            const valor = criarRotulo(container, c.reqs.toLocaleString('pt-BR'), 'cena-rotulo-valor');
            const nome = criarRotulo(container, `${c.runtime} ${c.framework}\n${c.validador}`, 'cena-rotulo-nome');
            return { caixa, fill, h, valor, nome, x: caixa.position.x };
        });

        const ponto = new THREE.Vector3();
        return {
            atualizar(t, mouse) {
                ajustarDistancia(camera, baseCamera, 17);
                camera.lookAt(0, 1.3, 0);
                grupo.rotation.y = Math.sin(t * 0.3) * 0.06 + mouse.x * 0.25;
                grupo.rotation.x = mouse.y * 0.05;
                grupo.updateMatrixWorld();
                colunas.forEach((c, i) => {
                    const p = suave((t - 0.3 - i * 0.14) / 1.1);
                    const altura = Math.max(c.h * p, 0.001);
                    c.caixa.scale.y = altura;
                    c.caixa.position.y = altura / 2;
                    ponto.set(c.x, altura + 0.25, 0).applyMatrix4(grupo.matrixWorld);
                    projetar(THREE, ponto, camera, container, c.valor);
                    c.valor.style.opacity = p;
                    ponto.set(c.x, -0.1, 0.9).applyMatrix4(grupo.matrixWorld);
                    projetar(THREE, ponto, camera, container, c.nome);
                });
            },
        };
    };
}

/* ---------- Tchuu-Tchuu: trilho com telemetria ---------- */
export function cenaTrilho(THREE, { scene, camera }) {
    const baseCamera = new THREE.Vector3(0, 4.6, 6.4);
    camera.position.copy(baseCamera);
    camera.lookAt(0, 0, 0);

    const grupo = new THREE.Group();
    scene.add(grupo);

    const curva = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-5, 0, 1.6),
        new THREE.Vector3(-2.4, 0, 0.1),
        new THREE.Vector3(0, 0, 1.0),
        new THREE.Vector3(2.4, 0, -0.6),
        new THREE.Vector3(5, 0, -1.8),
    ]);
    const N = 160;
    const centro = curva.getSpacedPoints(N);
    const esq = [];
    const dir = [];
    centro.forEach((p, i) => {
        const tg = curva.getTangentAt(i / N);
        const nx = -tg.z;
        const nz = tg.x;
        esq.push(new THREE.Vector3(p.x + nx * 0.32, 0.02, p.z + nz * 0.32));
        dir.push(new THREE.Vector3(p.x - nx * 0.32, 0.02, p.z - nz * 0.32));
    });
    const material = new THREE.LineBasicMaterial({ color: VIOLETA, transparent: true, opacity: 0.9 });
    grupo.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(esq), material));
    grupo.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(dir), material));

    const dormenteGeo = new THREE.BoxGeometry(1.0, 0.04, 0.1);
    const dormenteMat = new THREE.MeshBasicMaterial({ color: VIOLETA, transparent: true, opacity: 0.4 });
    for (let i = 0; i <= 44; i++) {
        const u = i / 44;
        const d = new THREE.Mesh(dormenteGeo, dormenteMat);
        d.position.copy(curva.getPointAt(u));
        const tg = curva.getTangentAt(u);
        d.rotation.y = Math.atan2(-tg.z, tg.x);
        grupo.add(d);
    }

    // estações nas pontas
    [0, 1].forEach((u) => {
        const anel = new THREE.Mesh(
            new THREE.RingGeometry(0.5, 0.6, 40),
            new THREE.MeshBasicMaterial({ color: CIANO, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }),
        );
        anel.rotation.x = -Math.PI / 2;
        anel.position.copy(curva.getPointAt(u));
        anel.position.y = 0.03;
        grupo.add(anel);
    });

    const { grupo: trem } = caixaComBorda(THREE, 0.5, 0.4, 1.5, CIANO, 0.35);
    grupo.add(trem);
    const ping = new THREE.Mesh(
        new THREE.RingGeometry(0.9, 1, 48),
        new THREE.MeshBasicMaterial({ color: CIANO, side: THREE.DoubleSide, transparent: true, opacity: 0 }),
    );
    ping.rotation.x = -Math.PI / 2;
    grupo.add(ping);

    const alvo = new THREE.Vector3();
    return {
        atualizar(t, mouse) {
            ajustarDistancia(camera, baseCamera, 12.5);
            camera.lookAt(0, 0, 0);
            const u = Math.sin(t * 0.32) * 0.5 + 0.5;
            const p = curva.getPointAt(u);
            const tg = curva.getTangentAt(u).multiplyScalar(Math.cos(t * 0.32) >= 0 ? 1 : -1);
            trem.position.set(p.x, 0.24, p.z);
            alvo.set(p.x + tg.x, 0.24, p.z + tg.z);
            trem.lookAt(alvo);

            // pulso de telemetria saindo do trem
            const fase = (t % 2) / 2;
            ping.position.set(p.x, 0.04, p.z);
            ping.scale.setScalar(0.3 + fase * 2.2);
            ping.material.opacity = (1 - fase) * 0.7;

            grupo.rotation.y = mouse.x * 0.25;
            grupo.rotation.x = mouse.y * 0.05;
        },
    };
}

/* ---------- Habilidades: tecnologias ligadas aos projetos onde foram usadas ---------- */
function fibonacciEsfera(THREE, i, total, raio) {
    const y = total === 1 ? 0 : 1 - (i / (total - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = Math.PI * (3 - Math.sqrt(5)) * i;
    return new THREE.Vector3(Math.cos(theta) * r * raio, y * raio, Math.sin(theta) * r * raio);
}

/**
 * Grafo de tecnologias: duas tecnologias se ligam quando já foram usadas no
 * mesmo projeto. Os projetos não aparecem; só as ligações. Passar o mouse sobre
 * uma tecnologia acende ela e tudo que andou junto com ela.
 */
export function criarCenaConstelacao(tecnologias, projetos) {
    return function cenaConstelacao(THREE, { scene, camera, container, leve }) {
        const baseCamera = new THREE.Vector3(0, 0, leve ? 11 : 9.4);
        camera.position.copy(baseCamera);

        const grupo = new THREE.Group();
        scene.add(grupo);

        const ids = Object.keys(projetos);
        const estado = { ativo: null };
        const legenda = document.createElement('span');
        legenda.className = 'cena-legenda';
        const LEGENDA_PADRAO = leve
            ? 'Cada ligação é um par de tecnologias que já andaram juntas. Toque em uma.'
            : 'Cada ligação é um par de tecnologias que já andaram juntas. Passe o mouse sobre uma delas.';
        legenda.textContent = LEGENDA_PADRAO;
        container.appendChild(legenda);

        // agrupa perto do primeiro projeto que usou a tecnologia
        const ordenadas = [...tecnologias].sort(
            (a, b) => ids.indexOf(a.projetos[0]) - ids.indexOf(b.projetos[0]),
        );
        const RAIO = 3.3;
        const nos = ordenadas.map((tec, i) => {
            const cor = projetos[tec.projetos[0]]?.cor ?? '#38E8D0';
            const esfera = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 16, 16),
                new THREE.MeshBasicMaterial({ color: cor, transparent: true }),
            );
            esfera.position.copy(fibonacciEsfera(THREE, i, ordenadas.length, RAIO));
            grupo.add(esfera);
            const rotulo = criarRotulo(container, tec.nome, 'cena-rotulo-tec');
            return { tec, esfera, rotulo, cor, vizinhos: new Set(), arestas: [] };
        });

        // um par se liga quando divide pelo menos um projeto
        const todas = [];
        for (let a = 0; a < nos.length; a++) {
            for (let b = a + 1; b < nos.length; b++) {
                if (nos[a].tec.projetos.some((p) => nos[b].tec.projetos.includes(p))) {
                    nos[a].vizinhos.add(b);
                    nos[b].vizinhos.add(a);
                    todas.push(nos[a].esfera.position, nos[b].esfera.position);
                    nos[a].arestas.push(nos[a].esfera.position, nos[b].esfera.position);
                    nos[b].arestas.push(nos[b].esfera.position, nos[a].esfera.position);
                }
            }
        }
        const fundo = new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(todas),
            new THREE.LineBasicMaterial({ color: '#8B7CFF', transparent: true, opacity: 0.14 }),
        );
        grupo.add(fundo);

        nos.forEach((n, i) => {
            n.destaque = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(n.arestas),
                new THREE.LineBasicMaterial({ color: n.cor, transparent: true, opacity: 0 }),
            );
            grupo.add(n.destaque);
            n.rotulo.addEventListener('pointerenter', () => {
                estado.ativo = i;
                legenda.textContent = `${n.tec.nome} · ligada a ${n.vizinhos.size} tecnologias`;
            });
            n.rotulo.addEventListener('pointerleave', () => {
                estado.ativo = null;
                legenda.textContent = LEGENDA_PADRAO;
            });
        });

        const ponto = new THREE.Vector3();
        let giro = 0;
        let anterior = 0;
        const aproximar = (valor, alvo, k = 0.15) => valor + (alvo - valor) * k;

        return {
            atualizar(t, mouse) {
                ajustarDistancia(camera, baseCamera, leve ? 9 : 11);
                // o giro pausa sobre um rótulo, para ele ficar parado sob o cursor
                if (estado.ativo === null) giro += t - anterior;
                anterior = t;
                grupo.rotation.y = giro * 0.1 + mouse.x * 0.6;
                grupo.rotation.x = mouse.y * 0.35;
                grupo.updateMatrixWorld();
                const ativo = estado.ativo !== null;

                fundo.material.opacity = aproximar(fundo.material.opacity, ativo ? 0.04 : 0.14);
                nos.forEach((n, i) => {
                    const proprio = estado.ativo === i;
                    const vizinho = ativo && nos[estado.ativo].vizinhos.has(i);
                    const aceso = proprio || vizinho;
                    n.destaque.material.opacity = aproximar(n.destaque.material.opacity, proprio ? 0.95 : 0);
                    n.esfera.scale.setScalar(aproximar(n.esfera.scale.x, proprio ? 2 : vizinho ? 1.5 : 1));
                    n.esfera.material.opacity = ativo && !aceso ? 0.15 : 1;
                    n.esfera.getWorldPosition(ponto);
                    const profundidade = (ponto.z / RAIO + 1) / 2; // 0 atrás, 1 na frente
                    projetar(THREE, ponto, camera, container, n.rotulo, -14);
                    n.rotulo.style.opacity = ativo ? (aceso ? 1 : 0.12) : 0.4 + profundidade * 0.6;
                    n.rotulo.dataset.ativo = proprio ? 'true' : 'false';
                });
            },
        };
    };
}

/* ---------- 404: o globo que se desfaz ---------- */
export function cenaGloboPerdido(THREE, { scene, camera, leve }) {
    camera.position.set(0, 0, 6.4);

    const total = leve ? 700 : 1400;
    const base = new Float32Array(total * 3);
    const pos = new Float32Array(total * 3);
    const cores = new Float32Array(total * 3);
    const fuga = new Float32Array(total);
    const fase = new Float32Array(total);
    const c = new THREE.Color();
    for (let i = 0; i < total; i++) {
        const y = 1 - (i / (total - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = Math.PI * (3 - Math.sqrt(5)) * i;
        base[i * 3] = Math.cos(theta) * r * 1.9;
        base[i * 3 + 1] = y * 1.9;
        base[i * 3 + 2] = Math.sin(theta) * r * 1.9;
        c.set(CIANO).lerp(new THREE.Color(VIOLETA), (y + 1) / 2).lerp(new THREE.Color(ROSA), Math.max(0, -y) * 0.5);
        cores.set([c.r, c.g, c.b], i * 3);
        fuga[i] = Math.random() < 0.3 ? 1 : 0;
        fase[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(cores, 3));
    const pontos = new THREE.Points(
        geo,
        new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false }),
    );
    scene.add(pontos);

    return {
        atualizar(t, mouse) {
            for (let i = 0; i < total; i++) {
                const solta = fuga[i] ? 0.25 + (Math.sin(t * 0.6 + fase[i]) * 0.5 + 0.5) * 1.1 : 0;
                const k = 1 + solta;
                pos[i * 3] = base[i * 3] * k;
                pos[i * 3 + 1] = base[i * 3 + 1] * k + (fuga[i] ? Math.sin(t + fase[i]) * 0.15 : 0);
                pos[i * 3 + 2] = base[i * 3 + 2] * k;
            }
            geo.attributes.position.needsUpdate = true;
            pontos.rotation.y = t * 0.1 + mouse.x * 0.5;
            pontos.rotation.x = 0.3 + mouse.y * 0.3;
        },
    };
}
