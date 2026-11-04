import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { rolarParaElemento } from '../hooks/rolagem';

/**
 * Sem âncora, volta ao topo quando a rota muda. Com âncora (/#projetos), rola
 * até a seção: ela fica num bloco carregado sob demanda, então tentamos por
 * alguns segundos até o elemento existir.
 */
function ScrollToTop() {
    const { pathname, hash } = useLocation();
    const primeira = useRef(true);

    useEffect(() => {
        if (!hash) {
            primeira.current = false;
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return;
        }

        let tentativas = 0;
        let timer = 0;
        let mexeu = false;
        const marcar = () => { mexeu = true; };
        window.addEventListener('wheel', marcar, { passive: true });
        window.addEventListener('touchstart', marcar, { passive: true });
        window.addEventListener('keydown', marcar);

        // Imagens e seções carregam depois e empurram o conteúdo: confere a posição
        // duas vezes e corrige, a menos que a pessoa já tenha começado a rolar.
        const conferir = (alvo, ms) => {
            timer = window.setTimeout(() => {
                if (mexeu) return;
                if (Math.abs(alvo.getBoundingClientRect().top - 84) > 8) rolarParaElemento(alvo, { imediato: true });
            }, ms);
        };
        const procurar = () => {
            const alvo = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (alvo) {
                rolarParaElemento(alvo, { imediato: primeira.current });
                primeira.current = false;
                conferir(alvo, 700);
            } else if (tentativas++ < 100) {
                timer = window.setTimeout(procurar, 60);
            }
        };
        procurar();
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('wheel', marcar);
            window.removeEventListener('touchstart', marcar);
            window.removeEventListener('keydown', marcar);
        };
    }, [pathname, hash]);

    return null;
}

export { ScrollToTop };
