import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Contato } from '../Contato';
import { renderWithRouter } from '../../test/helpers';

describe('Contato', () => {
    it('oferece e-mail, telefone e currículo', () => {
        renderWithRouter(<Contato />);

        expect(screen.getByRole('link', { name: /delizbraian@gmail\.com/i }))
            .toHaveAttribute('href', 'mailto:delizbraian@gmail.com');
        expect(screen.getByRole('link', { name: /93380-3828/ }))
            .toHaveAttribute('href', 'tel:+5547933803828');

        const curriculo = screen.getByRole('link', { name: /currículo/i });
        expect(decodeURIComponent(curriculo.getAttribute('href'))).toContain('/ASSETS/documentos/');
        expect(curriculo).toHaveAttribute('download');
    });

    it('abre perfis externos com segurança', () => {
        renderWithRouter(<Contato />);

        for (const nome of [/linkedin/i, /github/i]) {
            expect(screen.getByRole('link', { name: nome }))
                .toHaveAttribute('rel', expect.stringContaining('noopener'));
        }
    });
});
