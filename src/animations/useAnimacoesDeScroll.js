import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easing } from './presets';

gsap.registerPlugin(ScrollTrigger);

/**
 * Coreografia de scroll da página única, em um só lugar:
 *  - cabeçalhos de seção/case entram em sequência (rótulo, título em máscara, texto);
 *  - mídia dos cases (captura, cena, diagrama) abre de dentro para fora;
 *  - grupos (métricas, chips, cards, linha do tempo) entram em cascata, conforme chegam;
 *  - números sobem até o valor final.
 *
 * Regras de segurança: o que já está visível ao carregar nunca é escondido; o estado
 * inicial só é aplicado ao que está abaixo da dobra; tudo é desfeito no cleanup; e
 * com "reduzir movimento" nada é animado.
 */
const abaixoDaDobra = (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

const GRUPOS = [
    '.case-metrica',
    '.case-stack-item',
    '.case-acoes > *',
    '.timeline-item',
    '.sobre-exp-item',
    '.sobre-formacao-item',
    '.sobre-principio',
    '.sobre-numero',
    '.stack-grupo',
    '.stack-item',
    '.estudo-bloco',
    '.contato-links li',
];

const CABECALHOS = '.pagina-cabecalho, .case-cabecalho, .contato';
const MIDIA = '.case-figura, .case-composicao, .case-disclosure, .sobre-retrato, .sobre-prosa, .sobre-links, .cena-secao';
const NUMEROS = '.case-metrica-valor, .sobre-numero-valor';

function prepararNumero(el, restaurar) {
    const original = el.textContent.trim();
    const m = original.match(/^([+-]?)(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?(.*)$/);
    if (!m) return null;
    const [, sinal, inteiro, decimais, resto] = m;
    const casas = decimais ? decimais.length : 0;
    const alvo = parseFloat(inteiro.replace(/\./g, '') + (decimais ? `.${decimais}` : ''));
    const formato = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
    const escrever = (v) => { el.textContent = `${sinal}${formato.format(v)}${resto}`; };
    restaurar.push(() => { el.textContent = original; });
    return { alvo, escrever, original };
}

function useAnimacoesDeScroll(ref) {
    useLayoutEffect(() => {
        const raiz = ref.current;
        if (!raiz) return;
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const restaurar = [];

        const ctx = gsap.context(() => {
            // Cabeçalhos: filhos em sequência; o título entra por uma máscara vertical.
            raiz.querySelectorAll(CABECALHOS).forEach((cab) => {
                if (!abaixoDaDobra(cab)) return;
                const filhos = Array.from(cab.children);
                const titulo = filhos.find((f) => /^H[1-3]$/.test(f.tagName));
                gsap.set(filhos, { opacity: 0, y: 26 });
                if (titulo) gsap.set(titulo, { clipPath: 'inset(0 0 100% 0)', y: 44 });
                ScrollTrigger.create({
                    trigger: cab,
                    start: 'top 88%',
                    once: true,
                    onEnter: () => {
                        gsap.to(filhos, {
                            opacity: 1, y: 0, duration: 0.8, ease: easing.entry, stagger: 0.09, clearProps: 'transform,opacity',
                        });
                        if (titulo) {
                            gsap.to(titulo, {
                                clipPath: 'inset(0 0 -12% 0)', y: 0, duration: 1.0, ease: 'power4.out', delay: 0.08, clearProps: 'clipPath,transform',
                            });
                        }
                    },
                });
            });

            // Mídia: abre de dentro para fora, com leve subida.
            raiz.querySelectorAll(MIDIA).forEach((el) => {
                if (!abaixoDaDobra(el)) return;
                gsap.set(el, { opacity: 0, y: 36, clipPath: 'inset(7% 5% 7% 5% round 18px)' });
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 90%',
                    once: true,
                    onEnter: () => gsap.to(el, {
                        opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.0, ease: easing.entry, clearProps: 'clipPath,transform,opacity',
                    }),
                });
            });

            // Grupos: cascata conforme os itens chegam.
            GRUPOS.forEach((seletor) => {
                const itens = gsap.utils.toArray(seletor, raiz);
                gsap.set(itens.filter(abaixoDaDobra), { opacity: 0, y: 22 });
                ScrollTrigger.batch(itens, {
                    start: 'top 92%',
                    once: true,
                    interval: 0.12,
                    batchMax: 8,
                    onEnter: (lote) => gsap.to(lote, {
                        opacity: 1, y: 0, duration: 0.7, ease: easing.entrySoft, stagger: 0.07, overwrite: true, clearProps: 'transform,opacity',
                    }),
                });
            });

            // Números: sobem até o valor final.
            raiz.querySelectorAll(NUMEROS).forEach((el) => {
                const n = prepararNumero(el, restaurar);
                if (!n) return;
                const estado = { v: 0 };
                n.escrever(0);
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 92%',
                    once: true,
                    onEnter: () => gsap.to(estado, {
                        v: n.alvo,
                        duration: 1.5,
                        ease: 'power2.out',
                        onUpdate: () => n.escrever(estado.v),
                        onComplete: () => { el.textContent = n.original; },
                    }),
                });
            });
        }, raiz);

        // Posições mudam quando imagens e fontes terminam de carregar.
        const aoCarregar = () => ScrollTrigger.refresh();
        window.addEventListener('load', aoCarregar);

        return () => {
            window.removeEventListener('load', aoCarregar);
            ctx.revert();
            restaurar.forEach((fn) => fn());
        };
    }, [ref]);
}

export { useAnimacoesDeScroll };
