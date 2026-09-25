import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Home } from '../Home';
import { renderWithRouter } from '../../test/helpers';

describe('Home', () => {
    it('prioriza AMOTIF, TypeMarks e a biblioteca open source nesta ordem', () => {
        renderWithRouter(<Home />);

        const titulos = screen
            .getAllByTestId('preview-titulo')
            .map((el) => el.textContent);

        expect(titulos).toEqual(['AMOTIF', 'TypeMarks', 'br_standards_with_zod']);
    });

    it('apresenta cada destaque com problema e evidência', () => {
        renderWithRouter(<Home />);

        const previews = screen.getAllByTestId('preview-card');
        expect(previews).toHaveLength(3);

        for (const card of previews) {
            expect(card.querySelector('[data-testid="preview-problema"]')).not.toBeNull();
            expect(card.querySelector('[data-testid="preview-evidencia"]')).not.toBeNull();
        }
    });

    it('usa a evidência real de throughput do TypeMarks', () => {
        renderWithRouter(<Home />);

        const typemarks = screen
            .getAllByTestId('preview-card')
            .find((card) => card.textContent.includes('TypeMarks'));

        expect(typemarks.textContent).toContain('28.534');
    });

    it('não repete a foto de perfil fora do Hero', () => {
        renderWithRouter(<Home />);

        const retratos = screen
            .getAllByRole('img')
            .filter((img) => img.getAttribute('src')?.includes('foto_braian'));

        expect(retratos).toHaveLength(1);
    });

    it('oferece caminhos para a lista completa e para o perfil', () => {
        renderWithRouter(<Home />);

        expect(screen.getByRole('link', { name: /todos os projetos/i })).toHaveAttribute('href', '/projetos');
        expect(screen.getByRole('link', { name: /perfil completo/i })).toHaveAttribute('href', '/sobre');
    });

    it('não repete o mesmo rótulo de link na página', () => {
        renderWithRouter(<Home />);

        const rotulos = screen
            .getAllByRole('link')
            .map((link) => link.textContent.trim().toLowerCase());

        expect(new Set(rotulos).size).toBe(rotulos.length);
    });
});
