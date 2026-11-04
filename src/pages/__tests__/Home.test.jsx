import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Home } from '../Home';
import { renderWithRouter } from '../../test/helpers';

describe('Home (página única)', () => {
    it('abre com o hero e carrega as seções na ordem de leitura', async () => {
        renderWithRouter(<Home />);

        expect(screen.getByRole('heading', { level: 1, name: /Braian de Liz/i })).toBeInTheDocument();
        await screen.findByTestId('contato', {}, { timeout: 8000 });

        const ids = Array.from(document.querySelectorAll('main section[id]'))
            .map((el) => el.id);
        expect(ids).toEqual(['inicio', 'projetos', 'habilidades', 'sobre', 'contato']);
    });

    it('não exibe a foto de perfil (ela fica na seção Sobre)', async () => {
        renderWithRouter(<Home />);
        await screen.findByTestId('contato', {}, { timeout: 8000 });

        const retratos = screen
            .getAllByRole('img')
            .filter((img) => img.getAttribute('src')?.includes('foto_braian'));

        expect(retratos).toHaveLength(1);
        expect(retratos[0].closest('#sobre')).not.toBeNull();
    });

    it('traz o playground da biblioteca dentro do case dela', async () => {
        renderWithRouter(<Home />);
        await screen.findByTestId('contato', {}, { timeout: 8000 });

        const caso = document.getElementById('br-standards-with-zod');
        expect(caso.querySelector('.playground')).not.toBeNull();
    });
});
