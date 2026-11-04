import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Projetos } from './projetos';
import { Habilidades } from './habilidades';
import { Sobre } from './sobre';
import { Contato } from '../components/Contato';
import { useAnimacoesDeScroll } from '../animations/useAnimacoesDeScroll';

/** Seções da página única, na ordem de leitura: projetos, stack, sobre e contato. */
function Conteudo() {
    const ref = useRef(null);
    useAnimacoesDeScroll(ref);

    // As seções entram depois do hero: recalcula as posições dos gatilhos de scroll.
    useEffect(() => {
        const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => window.cancelAnimationFrame(id);
    }, []);

    return (
        <div className="conteudo" ref={ref}>
            <Projetos />
            <Habilidades />
            <Sobre />
            <Contato />
        </div>
    );
}

export { Conteudo };
