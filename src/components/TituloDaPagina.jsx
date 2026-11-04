import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NOME = 'Braian de Liz';

/** Título da aba: um para a página única e outro para rotas que não existem. */
function TituloDaPagina() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.title = pathname === '/'
            ? `${NOME} | Desenvolvedor de Sistemas`
            : `Página não encontrada | ${NOME}`;
    }, [pathname]);

    return null;
}

export { TituloDaPagina };
