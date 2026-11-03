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

    it('resume o trabalho em números reais e informa o que está em estudo', () => {
        renderWithRouter(<Sobre />);

        const numeros = screen.getByTestId('sobre-numeros').textContent;
        for (const n of ['73', '881', '15']) expect(numeros).toContain(n);
        expect(screen.getByTestId('sobre-estudo').textContent).toMatch(/Go com Fiber/);
    });

    it('fecha com o contato', () => {
        renderWithRouter(<Sobre />);

        expect(screen.getByTestId('contato')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /delizbraian@gmail\.com/i })).toHaveAttribute('href', 'mailto:delizbraian@gmail.com');
    });

    it('usa um único h1 e organiza as seções em h2', () => {
        renderWithRouter(<Sobre />);

        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
        expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(2);
    });

    it('mantém trajetória, experiência e formação', () => {
        renderWithRouter(<Sobre />);

        expect(screen.getByRole('heading', { name: /evolução técnica/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /experiência/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /formação/i })).toBeInTheDocument();
    });

    it('oferece currículo e histórico com links seguros', () => {
        renderWithRouter(<Sobre />);

        const curriculo = screen.getByRole('link', { name: /currículo/i });
        expect(decodeURIComponent(curriculo.getAttribute('href'))).toContain('/ASSETS/documentos/');
        expect(curriculo).toHaveAttribute('download');
    });

    it('leva para habilidades técnicas', () => {
        renderWithRouter(<Sobre />);

        expect(screen.getByRole('link', { name: /habilidades/i }))
            .toHaveAttribute('href', '/habilidades');
    });

    it('descreve o posicionamento em backend', () => {
        renderWithRouter(<Sobre />);

        expect(document.body.textContent).toMatch(/backend/i);
    });
});
