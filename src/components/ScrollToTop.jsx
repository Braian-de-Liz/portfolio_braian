import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Rola a janela para o topo sempre que a rota muda.
 * Respeita prefers-reduced-motion usando rolagem instantânea.
 */
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    return null;
}

export { ScrollToTop };
