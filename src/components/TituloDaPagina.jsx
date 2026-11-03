import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NOME = 'Braian de Liz';

const TITULOS = {
    '/': `${NOME} | Desenvolvedor de Sistemas`,
    '/projetos': `Projetos | ${NOME}`,
    '/sobre': `Sobre | ${NOME}`,
    '/habilidades': `Habilidades | ${NOME}`,
};

/** Atualiza o título da aba a cada rota, para histórico e links compartilhados. */
function TituloDaPagina() {
    const { pathname } = useLocation();

    useEffect(() => {
        const chave = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
        document.title = TITULOS[chave] ?? `Página não encontrada | ${NOME}`;
    }, [pathname]);

    return null;
}

export { TituloDaPagina };
