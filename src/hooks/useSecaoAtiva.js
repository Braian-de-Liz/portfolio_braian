import { useEffect, useState } from 'react';

/**
 * Descobre qual seção da página única está na leitura: a última cujo topo já
 * passou de 40% da altura da janela. Calcula no scroll (com rAF), então
 * funciona mesmo com seções carregadas sob demanda.
 */
export function useSecaoAtiva(ids, inicial) {
    const [ativa, setAtiva] = useState(inicial);

    useEffect(() => {
        let quadro = 0;
        const calcular = () => {
            quadro = 0;
            const linha = window.innerHeight * 0.4;
            let atual = null;
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= linha) atual = id;
            }
            if (atual) setAtiva(atual);
        };
        const agendar = () => { if (!quadro) quadro = window.requestAnimationFrame(calcular); };

        window.addEventListener('scroll', agendar, { passive: true });
        window.addEventListener('resize', agendar);
        agendar();
        return () => {
            window.removeEventListener('scroll', agendar);
            window.removeEventListener('resize', agendar);
            window.cancelAnimationFrame(quadro);
        };
    }, [ids]);

    return ativa;
}
