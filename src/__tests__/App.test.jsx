import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    it('carrega a página inicial', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByRole('heading', { level: 1, name: /Braian de Liz/i })).toBeInTheDocument();
        });
    });

    it('expõe os atalhos sociais com nome acessível', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByRole('link', { name: /GitHub/i })).toBeInTheDocument();
        });
        expect(screen.getByRole('link', { name: /LinkedIn/i })).toBeInTheDocument();
    });

    it('mantém uma única navegação principal e uma mobile', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument();
        });
        expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();
    });

    it('exibe os contatos do rodapé', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /contatos/i })).toBeInTheDocument();
        });
    });
});
