import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Nav } from '../Nav';
import { renderWithRouter } from '../../test/helpers';

describe('Nav', () => {
    it('expõe as duas navegações com rótulos acessíveis distintos', () => {
        renderWithRouter(<Nav />);

        expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument();
        expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();
    });

    it('leva a cada seção da página única em ambas as navegações', () => {
        renderWithRouter(<Nav />);

        const destinos = { 'Início': '/', Projetos: '/#projetos', Habilidades: '/#habilidades', Sobre: '/#sobre' };
        for (const [nome, href] of Object.entries(destinos)) {
            const links = screen.getAllByRole('link', { name: nome });
            expect(links).toHaveLength(2);
            for (const link of links) expect(link).toHaveAttribute('href', href);
        }
    });

    it('marca a seção da âncora como atual', () => {
        renderWithRouter(<Nav />, { route: '/#sobre' });

        const ativos = screen.getAllByRole('link', { current: 'location' });
        expect(ativos).toHaveLength(2);
        for (const link of ativos) expect(link).toHaveAccessibleName('Sobre');
    });

    it('começa em Início sem âncora', () => {
        renderWithRouter(<Nav />);

        const ativos = screen.getAllByRole('link', { current: 'location' });
        for (const link of ativos) expect(link).toHaveAccessibleName('Início');
    });
});
