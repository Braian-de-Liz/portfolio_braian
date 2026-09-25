import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Sobre } from '../sobre';
import { renderWithRouter } from '../../test/helpers';

describe('Sobre', () => {
    it('não repete a foto de perfil nesta página', () => {
        renderWithRouter(<Sobre />);

        const retratos = Array.from(document.querySelectorAll('img')).filter((img) =>
            img.getAttribute('src')?.includes('foto_braian')
        );

        expect(retratos).toHaveLength(0);
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
        expect(curriculo.getAttribute('href')).toContain('/ASSETS/documentos/');
        expect(curriculo).toHaveAttribute('rel', expect.stringContaining('noopener'));
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
