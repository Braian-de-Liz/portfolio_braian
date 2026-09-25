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

    it('lista todas as rotas do portfólio em cada navegação', () => {
        renderWithRouter(<Nav />);

        for (const nome of ['Início', 'Projetos', 'Sobre', 'Habilidades']) {
            expect(screen.getAllByRole('link', { name: nome })).toHaveLength(2);
        }
    });

    it('marca apenas a rota atual como página ativa', () => {
        renderWithRouter(<Nav />, { route: '/projetos' });

        const ativos = screen.getAllByRole('link', { current: 'page' });
        expect(ativos).toHaveLength(2);
        for (const link of ativos) {
            expect(link).toHaveAccessibleName('Projetos');
        }
    });

    it('não marca Início como ativo quando está em outra rota', () => {
        renderWithRouter(<Nav />, { route: '/sobre' });

        const inicio = screen.getAllByRole('link', { name: 'Início' });
        for (const link of inicio) {
            expect(link).not.toHaveAttribute('aria-current');
        }
    });
});
