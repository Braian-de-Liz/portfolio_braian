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

/* ---------- Habilidades: tecnologias ligadas pelos projetos ---------- */
const CORES_PROJETO = {
    amotif: CIANO,
    'tchuu-tchuu': VIOLETA,
    typemarks: ROSA,
    'br-standards-with-zod': BRANCO,
};
const NOMES_PROJETO = {
    amotif: 'AMOTIF',
    'tchuu-tchuu': 'Tchuu-Tchuu',
    typemarks: 'TypeMarks',
    'br-standards-with-zod': 'br_standards_with_zod',
};

export function criarCenaConstelacao(tecnologias) {
    return function cenaConstelacao(THREE, { scene, camera, container, leve }) {
        camera.position.set(0, 0, leve ? 8.6 : 7.4);

        const grupo = new THREE.Group();
        scene.add(grupo);

        const RAIO = 2.5;
        const estado = { projeto: null };
        const legenda = document.createElement('span');
        legenda.className = 'cena-legenda';
        const LEGENDA_PADRAO = 'Passe o mouse sobre uma tecnologia para ver o projeto';
        legenda.textContent = LEGENDA_PADRAO;
        container.appendChild(legenda);

        const nos = tecnologias.map((tec, i) => {
            const y = 1 - (i / (tecnologias.length - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = Math.PI * (3 - Math.sqrt(5)) * i;
            const cor = CORES_PROJETO[tec.projeto] ?? CIANO;
            const esfera = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 16, 16),
                new THREE.MeshBasicMaterial({ color: cor, transparent: true }),
            );
            esfera.position.set(Math.cos(theta) * r * RAIO, y * RAIO, Math.sin(theta) * r * RAIO);
            grupo.add(esfera);

            const rotulo = criarRotulo(container, tec.nome, 'cena-rotulo-tec');
            rotulo.addEventListener('pointerenter', () => {
                estado.projeto = tec.projeto;
                legenda.textContent = `${tec.nome} · usada em ${NOMES_PROJETO[tec.projeto] ?? tec.projeto}`;
            });
            rotulo.addEventListener('pointerleave', () => {
                estado.projeto = null;
                legenda.textContent = LEGENDA_PADRAO;
            });
            return { tec, esfera, rotulo, cor };
        });

        // liga as tecnologias que pertencem ao mesmo projeto
        const ligacoes = [];
        Object.keys(CORES_PROJETO).forEach((projeto) => {
            const doProjeto = nos.filter((n) => n.tec.projeto === projeto);
            if (doProjeto.length < 2) return;
            const pts = [];
            for (let a = 0; a < doProjeto.length; a++) {
                for (let b = a + 1; b < doProjeto.length; b++) {
                    pts.push(doProjeto[a].esfera.position, doProjeto[b].esfera.position);
                }
            }
            const linha = new THREE.LineSegments(
                new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color: CORES_PROJETO[projeto], transparent: true, opacity: 0.22 }),
            );
            grupo.add(linha);
            ligacoes.push({ projeto, linha });
        });

        const ponto = new THREE.Vector3();
        let giro = 0;
        let anterior = 0;
        return {
            atualizar(t, mouse) {
                // o giro pausa sobre uma tecnologia, para o rótulo ficar parado sob o cursor
                if (!estado.projeto) giro += t - anterior;
                anterior = t;
                grupo.rotation.y = giro * 0.1 + mouse.x * 0.6;
                grupo.rotation.x = mouse.y * 0.35;
                grupo.updateMatrixWorld();

                ligacoes.forEach(({ projeto, linha }) => {
                    const alvoOpacidade = estado.projeto === projeto ? 0.95 : estado.projeto ? 0.05 : 0.22;
                    linha.material.opacity += (alvoOpacidade - linha.material.opacity) * 0.15;
                });
                nos.forEach((n) => {
                    const ativo = estado.projeto === n.tec.projeto;
                    const apagado = estado.projeto && !ativo;
                    const escala = ativo ? 1.8 : 1;
                    n.esfera.scale.setScalar(n.esfera.scale.x + (escala - n.esfera.scale.x) * 0.15);
                    n.esfera.material.opacity = apagado ? 0.25 : 1;
                    n.esfera.getWorldPosition(ponto);
                    const profundidade = (ponto.z / RAIO + 1) / 2; // 0 atrás, 1 na frente
                    projetar(THREE, ponto, camera, container, n.rotulo, -16);
                    n.rotulo.style.opacity = apagado ? 0.25 : 0.45 + profundidade * 0.55;
                    n.rotulo.dataset.ativo = ativo ? 'true' : 'false';
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
