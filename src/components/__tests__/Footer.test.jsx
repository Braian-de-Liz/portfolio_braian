import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
    it('exibe o ano corrente no aviso de direitos', () => {
        render(<Footer />);

        const ano = String(new Date().getFullYear());
        expect(screen.getByText(new RegExp(ano))).toBeInTheDocument();
    });
});
