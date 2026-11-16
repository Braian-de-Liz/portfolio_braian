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
export function cenaCamadasAmotif(THREE, { scene, camera, container }) {
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

    // rótulos: nomeiam as camadas e a contribuição que está chegando
    const rotulos = camadas.map((c, i) => ({ c, el: criarRotulo(container, `camada ${i + 1}`, 'cena-rotulo-camada') }));
    const rotuloNova = criarRotulo(container, 'nova contribuição', 'cena-rotulo-camada cena-rotulo-nova');
    const ponta = new THREE.Vector3(2.85, 0, 0.9);

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

            grupo.updateMatrixWorld(true);
            rotulos.forEach(({ c, el }) => {
                projetar(THREE, c.camada.localToWorld(ponta.clone()), camera, container, el);
            });
            projetar(THREE, nova.camada.localToWorld(ponta.clone()), camera, container, rotuloNova);
            rotuloNova.style.opacity = opacidade;
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

/* ---------- TypeMarks: explorador dos 15 cenários ---------- */
const PADRAO_EXPLORADOR = 'Passe o mouse (ou toque) em um número para ver o cenário.';

/**
 * Todos os cenários do relatório em três fileiras, da mais rápida (ao fundo) à mais lenta.
 * `estado` é um objeto mutável compartilhado com o componente: { runtime, ativo }.
 */
export function criarEstadoExplorador() {
    return {
        runtime: 'todos',
        ativo: null,
        filtrar(valor) { this.runtime = valor; },
    };
}

export function criarCenaExploradora(cenarios, estado) {
    return function cenaExploradora(THREE, { scene, camera, container }) {
        const baseCamera = new THREE.Vector3(0, 6.6, 11.4);
        camera.position.copy(baseCamera);
        camera.lookAt(0, 1.1, 0);

        const grupo = new THREE.Group();
        scene.add(grupo);

        const chao = new THREE.GridHelper(12, 12, '#8B7CFF', '#8B7CFF');
        chao.material.transparent = true;
        chao.material.opacity = 0.16;
        grupo.add(chao);

        const COLUNAS = 5;
        const ESPACO = 2.1;
        const FUNDO = 2.7;
        const ALTURA = 3.4;
        const maximo = Math.max(...cenarios.map((c) => c.reqs));

        const legenda = document.createElement('span');
        legenda.className = 'cena-legenda cena-legenda-larga';
        legenda.textContent = PADRAO_EXPLORADOR;
        container.appendChild(legenda);

        const colunas = cenarios.map((c, i) => {
            const cor = c.runtime === 'Bun' ? CIANO : ROSA;
            const { grupo: caixa, fill, borda } = caixaComBorda(THREE, 0.9, 1, 0.9, cor, 0.3);
            const x = ((i % COLUNAS) - (COLUNAS - 1) / 2) * ESPACO;
            const z = (Math.floor(i / COLUNAS) - 1) * FUNDO;
            caixa.position.set(x, 0, z);
            grupo.add(caixa);

            const rotulo = criarRotulo(container, `#${c.rank}`, 'cena-rotulo-rank');
            rotulo.addEventListener('pointerenter', () => { estado.ativo = i; });
            rotulo.addEventListener('pointerleave', () => { if (estado.ativo === i) estado.ativo = null; });
            return { c, caixa, fill, borda, rotulo, x, z, h: (c.reqs / maximo) * ALTURA, vis: 1 };
        });

        const ponto = new THREE.Vector3();
        let girox = 0;
        let giroy = 0;
        let textoAtual = PADRAO_EXPLORADOR;
        return {
            atualizar(t, mouse) {
                ajustarDistancia(camera, baseCamera, 13);
                camera.lookAt(0, 1.1, 0);
                // com um cenário em foco o grupo para, senão o rótulo foge do cursor
                if (estado.ativo === null) { girox = mouse.x; giroy = mouse.y; }
                grupo.rotation.y = Math.sin(t * 0.3) * 0.05 + girox * 0.22;
                grupo.rotation.x = giroy * 0.04;
                grupo.updateMatrixWorld();

                colunas.forEach((col, i) => {
                    const { c } = col;
                    const alvoVis = estado.runtime === 'todos' || estado.runtime === c.runtime ? 1 : 0.12;
                    col.vis += (alvoVis - col.vis) * 0.14;
                    const foco = estado.ativo === i;
                    const p = suave((t - 0.2 - i * 0.08) / 1.0);
                    const altura = Math.max(col.h * p, 0.001);
                    col.caixa.scale.y = altura;
                    col.caixa.position.y = altura / 2;
                    col.fill.material.opacity = (foco ? 0.62 : 0.3) * col.vis;
                    col.borda.material.opacity = (foco ? 1 : 0.9) * col.vis;

                    ponto.set(col.x, altura + 0.3, col.z).applyMatrix4(grupo.matrixWorld);
                    projetar(THREE, ponto, camera, container, col.rotulo);
                    col.rotulo.style.opacity = p * (0.25 + 0.75 * col.vis);
                    col.rotulo.dataset.ativo = foco ? 'true' : 'false';
                });

                const foco = estado.ativo === null ? null : colunas[estado.ativo].c;
                const texto = foco
                    ? `#${foco.rank} · ${foco.runtime} · ${foco.framework} · ${foco.validador} · ${Math.round(foco.reqs).toLocaleString('pt-BR')} req/s · ${foco.latencia} (P99 ${foco.p99})${foco.delta ? ` · ${foco.delta} vs topo` : ''}`
                    : PADRAO_EXPLORADOR;
                if (texto !== textoAtual) {
                    legenda.textContent = texto;
                    textoAtual = texto;
                }
            },
        };
    };
}

/* ---------- Tchuu-Tchuu: trilho com telemetria ---------- */
export function cenaTrilho(THREE, { scene, camera, container }) {
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

    const rotuloTrem = criarRotulo(container, 'trem', 'cena-rotulo-camada');
    const rotuloPulso = criarRotulo(container, 'telemetria', 'cena-rotulo-camada cena-rotulo-nova');
    const rotulosEstacao = [0, 1].map(() => criarRotulo(container, 'estação', 'cena-rotulo-camada'));
    const pontaTrem = new THREE.Vector3();
    const pontaPulso = new THREE.Vector3();

    const alvo = new THREE.Vector3();
    return {
        atualizar(t, mouse) {
            ajustarDistancia(camera, baseCamera, 15);
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

            grupo.updateMatrixWorld(true);
            projetar(THREE, grupo.localToWorld(pontaTrem.set(p.x, 0.9, p.z)), camera, container, rotuloTrem);
            projetar(THREE, grupo.localToWorld(pontaPulso.set(p.x, 0, p.z + 1.9)), camera, container, rotuloPulso);
            rotuloPulso.style.opacity = Math.min(1, (1 - fase) * 1.6);
            [0, 1].forEach((i) => {
                const e = curva.getPointAt(i);
                projetar(THREE, grupo.localToWorld(pontaTrem.set(e.x, 0, e.z + 0.9)), camera, container, rotulosEstacao[i]);
            });
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

/* ---------- Graph Visuals: um agente grava um arquivo e o grafo acende ---------- */
const OURO = '#D5B66A';
const VERMELHO = '#E5484D';
const AZUL = '#4A8FE7';
const CINZA = '#7D8799';

/** Gerador determinístico: o grafo sai igual a cada montagem. */
function aleatorio(semente) {
    let s = semente >>> 0;
    return () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const ARQUIVOS_GV = ['agents.rs', 'GraphScene.ts', 'watcher.rs', 'pty.rs', 'layout.worker.ts', 'fs_ops.rs', 'App.tsx', 'graph.rs'];
const PERIODO_ATIVIDADE = 3.4;

/**
 * Versão pequena do grafo do Graph Visuals: comunidades espalhadas e achatadas
 * (nem esfera, nem disco), ligadas por arestas. A cada poucos segundos um
 * "agente grava um arquivo": o nó acende em dourado e os vizinhos em vermelho,
 * como no app (lá o brilho dura 45 s; aqui é acelerado).
 */
export function cenaGrafoAtividade(THREE, { scene, camera, container, leve }) {
    const baseCamera = new THREE.Vector3(0, 5.4, 9.6);
    camera.position.copy(baseCamera);
    camera.lookAt(0, 0, 0);

    const rnd = aleatorio(20261116);
    const grupo = new THREE.Group();
    scene.add(grupo);

    const coresComunidade = [OURO, AZUL, VERMELHO, AZUL, OURO, CINZA, VERMELHO, AZUL, OURO, CINZA, AZUL];
    const nComunidades = leve ? 8 : 11;
    const fator = leve ? 0.7 : 1;

    const posicoes = [];
    const tamanhos = [];
    const coresBase = [];
    const vizinhos = [];
    const arestas = [];
    const hubs = [];
    const fundo = new THREE.Color('#0a0e15');
    const cor = new THREE.Color();

    const ligar = (a, b) => {
        if (a === b) return;
        arestas.push(a, b);
        vizinhos[a].push(b);
        vizinhos[b].push(a);
    };
    const novoNo = (p, c, tamanho) => {
        posicoes.push(p.x, p.y, p.z);
        tamanhos.push(tamanho);
        cor.set(c).lerp(fundo, 0.25);
        coresBase.push(cor.r, cor.g, cor.b);
        vizinhos.push([]);
        return vizinhos.length - 1;
    };

    for (let c = 0; c < nComunidades; c++) {
        // a primeira comunidade fica no centro, maior; as outras ao redor
        const angulo = (c / nComunidades) * Math.PI * 2 + rnd() * 0.6;
        const raio = c === 0 ? 0 : 2.2 + rnd() * 2.6;
        const centro = new THREE.Vector3(Math.cos(angulo) * raio * 1.3, (rnd() - 0.5) * 1.4, Math.sin(angulo) * raio * 0.85);
        const tamanho = Math.round((c === 0 ? 46 : 12 + rnd() * 22) * fator);
        const espalho = 0.35 + Math.cbrt(tamanho) * 0.17;
        const corC = coresComunidade[c % coresComunidade.length];

        const hub = novoNo(centro, corC, 2.4);
        hubs.push(hub);
        const membros = [hub];
        for (let i = 1; i < tamanho; i++) {
            const dir = new THREE.Vector3(rnd() - 0.5, (rnd() - 0.5) * 0.6, rnd() - 0.5).normalize();
            const p = centro.clone().addScaledVector(dir, espalho * Math.cbrt(rnd()));
            const no = novoNo(p, corC, 0.8 + rnd() * 0.6);
            ligar(no, rnd() < 0.65 ? hub : membros[Math.floor(rnd() * membros.length)]);
            membros.push(no);
        }
    }
    // ligações entre comunidades: o centro se liga a quase todas, as outras entre si
    hubs.forEach((h, i) => { if (i > 0 && rnd() < 0.8) ligar(hubs[0], h); });
    for (let i = 0; i < nComunidades; i++) {
        const a = hubs[Math.floor(rnd() * hubs.length)];
        const b = hubs[Math.floor(rnd() * hubs.length)];
        if (a !== b) ligar(a, b);
    }
    const totalNos = vizinhos.length;

    // poeira: pontos soltos ao redor, sem ligações
    for (let i = 0; i < (leve ? 90 : 180); i++) {
        novoNo(new THREE.Vector3((rnd() - 0.5) * 16, (rnd() - 0.5) * 3, (rnd() - 0.5) * 10), CINZA, 0.45);
        coresBase.splice(coresBase.length - 3, 3, 0.16, 0.18, 0.22);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(posicoes, 3));
    const atribCor = new THREE.Float32BufferAttribute(coresBase.slice(), 3);
    const atribTamanho = new THREE.Float32BufferAttribute(tamanhos.slice(), 1);
    geo.setAttribute('cor', atribCor);
    geo.setAttribute('tamanho', atribTamanho);

    const uniforms = { escala: { value: 40 } };
    const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
            attribute vec3 cor;
            attribute float tamanho;
            uniform float escala;
            varying vec3 vCor;
            void main() {
                vCor = cor;
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = tamanho * escala / -mv.z;
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: `
            varying vec3 vCor;
            void main() {
                float d = length(gl_PointCoord - 0.5);
                if (d > 0.5) discard;
                gl_FragColor = vec4(vCor, smoothstep(0.5, 0.12, d));
            }`,
    });
    grupo.add(new THREE.Points(geo, material));

    const geoArestas = new THREE.BufferGeometry();
    const pontosArestas = arestas.flatMap((i) => [posicoes[i * 3], posicoes[i * 3 + 1], posicoes[i * 3 + 2]]);
    geoArestas.setAttribute('position', new THREE.Float32BufferAttribute(pontosArestas, 3));
    grupo.add(new THREE.LineSegments(
        geoArestas,
        new THREE.LineBasicMaterial({ color: '#56637a', transparent: true, opacity: 0.14, depthWrite: false }),
    ));

    // arestas do arquivo gravado, redesenhadas a cada evento
    const maxVizinhos = Math.max(...vizinhos.slice(0, totalNos).map((v) => v.length));
    const geoAtivas = new THREE.BufferGeometry();
    const bufAtivas = new Float32Array(maxVizinhos * 6);
    geoAtivas.setAttribute('position', new THREE.BufferAttribute(bufAtivas, 3));
    const matAtivas = new THREE.LineBasicMaterial({
        color: OURO, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    grupo.add(new THREE.LineSegments(geoAtivas, matAtivas));

    // candidatos: nós com pelo menos dois vizinhos, para o brilho se espalhar
    const candidatos = [];
    for (let i = 0; i < totalNos; i++) if (vizinhos[i].length >= 2) candidatos.push(i);

    const rotuloArquivo = criarRotulo(container, '', 'cena-rotulo-camada cena-rotulo-nova cena-rotulo-gravado');
    const rotuloVizinhos = criarRotulo(container, 'vizinhos', 'cena-rotulo-camada cena-rotulo-vizinhos');
    const ouroVivo = new THREE.Color('#FFE3A1');
    const vermelhoVivo = new THREE.Color(VERMELHO).multiplyScalar(1.25);
    const ponto = new THREE.Vector3();
    const media = new THREE.Vector3();
    let eventoAtual = -1;
    let ativo = candidatos[0];
    let tocados = [];

    const posDe = (i, alvo) => alvo.set(posicoes[i * 3], posicoes[i * 3 + 1], posicoes[i * 3 + 2]);

    const pintar = (i, base, alvoCor, k, aumento) => {
        cor.setRGB(coresBase[i * 3], coresBase[i * 3 + 1], coresBase[i * 3 + 2]).lerp(alvoCor, k);
        atribCor.setXYZ(i, cor.r, cor.g, cor.b);
        atribTamanho.setX(i, base * (1 + aumento * k));
    };

    return {
        atualizar(t, mouse) {
            ajustarDistancia(camera, baseCamera, 15);
            camera.lookAt(0, -0.4, 0);
            uniforms.escala.value = container.clientHeight * Math.min(window.devicePixelRatio || 1, 2) * 0.17;

            const evento = Math.floor(t / PERIODO_ATIVIDADE);
            if (evento !== eventoAtual) {
                eventoAtual = evento;
                tocados.forEach((i) => {
                    atribCor.setXYZ(i, coresBase[i * 3], coresBase[i * 3 + 1], coresBase[i * 3 + 2]);
                    atribTamanho.setX(i, tamanhos[i]);
                });
                ativo = candidatos[Math.floor(aleatorio(evento + 3)() * candidatos.length)];
                tocados = [ativo, ...vizinhos[ativo]];
                rotuloArquivo.textContent = `${ARQUIVOS_GV[evento % ARQUIVOS_GV.length]} · gravado`;
                posDe(ativo, ponto);
                vizinhos[ativo].forEach((v, j) => {
                    bufAtivas.set([ponto.x, ponto.y, ponto.z, posicoes[v * 3], posicoes[v * 3 + 1], posicoes[v * 3 + 2]], j * 6);
                });
                geoAtivas.setDrawRange(0, vizinhos[ativo].length * 2);
                geoAtivas.attributes.position.needsUpdate = true;
            }

            const fase = (t % PERIODO_ATIVIDADE) / PERIODO_ATIVIDADE;
            const k = fase < 0.1 ? suave(fase / 0.1) : 1 - suave((fase - 0.1) / 0.9);
            const kVizinhos = Math.max(0, Math.min(1, (fase - 0.06) / 0.12)) * (1 - suave((fase - 0.1) / 0.9));
            pintar(ativo, tamanhos[ativo], ouroVivo, k, 2.2);
            vizinhos[ativo].forEach((v) => pintar(v, tamanhos[v], vermelhoVivo, kVizinhos, 0.9));
            atribCor.needsUpdate = true;
            atribTamanho.needsUpdate = true;
            matAtivas.opacity = kVizinhos * 0.7;

            grupo.rotation.y = t * 0.06 + mouse.x * 0.35;
            grupo.rotation.x = mouse.y * 0.08;
            grupo.updateMatrixWorld(true);

            projetar(THREE, grupo.localToWorld(posDe(ativo, ponto)), camera, container, rotuloArquivo, -22);
            rotuloArquivo.style.opacity = Math.min(1, k * 1.4);
            media.set(0, 0, 0);
            vizinhos[ativo].forEach((v) => media.add(posDe(v, ponto)));
            media.divideScalar(vizinhos[ativo].length);
            projetar(THREE, grupo.localToWorld(media), camera, container, rotuloVizinhos, 20);
            rotuloVizinhos.style.opacity = Math.min(1, kVizinhos * 1.4);
        },
    };
}
