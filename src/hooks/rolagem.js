/** Acesso ao Lenis em uso (se houver) e rolagem até uma seção da página única. */
let lenisAtual = null;

export function registrarLenis(lenis) {
    lenisAtual = lenis;
}

const DESLOCAMENTO = 84; // altura do menu flutuante

/** Rola até o elemento; usa o Lenis quando ativo e a rolagem nativa caso contrário. */
export function rolarParaElemento(alvo, { imediato = false } = {}) {
    if (!alvo) return;
    if (lenisAtual) {
        // o Lenis já desconta o scroll-margin-top das seções (mesmo valor do menu)
        lenisAtual.scrollTo(alvo, { immediate: imediato, duration: 1.1 });
        return;
    }
    const topo = alvo.getBoundingClientRect().top + window.scrollY - DESLOCAMENTO;
    window.scrollTo({ top: Math.max(topo, 0), behavior: 'auto' });
}
