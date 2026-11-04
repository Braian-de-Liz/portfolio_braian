import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Sobre } from '../sobre';
import { renderWithRouter } from '../../test/helpers';

describe('Sobre', () => {
    it('mostra o retrato uma única vez, com dimensões definidas', () => {
        renderWithRouter(<Sobre />);

        const retratos = screen.getAllByRole('img', { name: /retrato de braian/i });
        expect(retratos).toHaveLength(1);
        expect(retratos[0]).toHaveAttribute('src', '/ASSETS/imagens/foto_braian.jpg');
        expect(retratos[0]).toHaveAttribute('width');
        expect(retratos[0]).toHaveAttribute('height');
    });

    it('resume o trabalho em números reais', () => {
        renderWithRouter(<Sobre />);

        const numeros = screen.getByTestId('sobre-numeros').textContent;
        for (const n of ['73', '881', '15']) expect(numeros).toContain(n);
    });

    it('abre a seção com um h2 e organiza o conteúdo em h2', () => {
        renderWithRouter(<Sobre />);

        expect(screen.queryAllByRole('heading', { level: 1 })).toHaveLength(0);
        expect(screen.getByRole('heading', { level: 2, name: /por trás do código/i })).toBeInTheDocument();
    });

    it('mantém trajetória, experiência e formação', () => {
        renderWithRouter(<Sobre />);

        expect(screen.getByRole('heading', { name: /evolução técnica/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /experiência/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /formação/i })).toBeInTheDocument();
    });

    it('descreve o posicionamento em backend', () => {
        renderWithRouter(<Sobre />);

        expect(document.body.textContent).toMatch(/backend/i);
    });
});
