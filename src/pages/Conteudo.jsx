import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Projetos } from './projetos';
import { Habilidades } from './habilidades';
import { Sobre } from './sobre';
import { Contato } from '../components/Contato';

/** Seções da página única, na ordem de leitura: projetos, stack, sobre e contato. */
function Conteudo() {
    // As seções entram depois do hero: recalcula as posições dos gatilhos de scroll.
    useEffect(() => {
        const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => window.cancelAnimationFrame(id);
    }, []);

    return (
        <>
            <Projetos />
            <Habilidades />
            <Sobre />
            <Contato />
        </>
    );
}

export { Conteudo };
