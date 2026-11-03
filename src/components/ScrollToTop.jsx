import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Rola a janela para o topo sempre que a rota muda.
 * Respeita prefers-reduced-motion usando rolagem instantânea.
 */
function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return;
        }

        // Âncora (#projeto): a página é carregada sob demanda, então
        // tentamos por um instante até o elemento existir.
        let tentativas = 0;
        let timer = 0;
        const procurar = () => {
            const alvo = document.getElementById(decodeURIComponent(hash.slice(1)));
            if (alvo) {
                alvo.scrollIntoView({ behavior: 'auto', block: 'start' });
            } else if (tentativas++ < 20) {
                timer = window.setTimeout(procurar, 60);
            }
        };
        procurar();
        return () => window.clearTimeout(timer);
    }, [pathname, hash]);

    return null;
}

export { ScrollToTop };
