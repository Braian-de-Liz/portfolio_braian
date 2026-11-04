import { lazy, Suspense } from 'react';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';

// Tudo abaixo do hero vem em um bloco carregado sob demanda.
const Conteudo = lazy(() => import('./Conteudo').then((m) => ({ default: m.Conteudo })));

function Home() {
    return (
        <main>
            <Hero />
            <Marquee />
            <Suspense fallback={<div className="conteudo-carregando" role="status" aria-label="Carregando conteúdo" />}>
                <Conteudo />
            </Suspense>
        </main>
    );
}

export { Home };
