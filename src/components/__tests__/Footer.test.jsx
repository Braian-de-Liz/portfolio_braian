import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
    it('expõe email e telefone como links acionáveis', () => {
        render(<Footer />);

        expect(screen.getByRole('link', { name: /delizbraian@gmail\.com/i }))
            .toHaveAttribute('href', 'mailto:delizbraian@gmail.com');

        expect(screen.getByRole('link', { name: /93380-3828/ }))
            .toHaveAttribute('href', 'tel:+5547933803828');
    });

    it('exibe o ano corrente no aviso de direitos', () => {
        render(<Footer />);

        const ano = String(new Date().getFullYear());
        expect(screen.getByText(new RegExp(ano))).toBeInTheDocument();
    });
});
