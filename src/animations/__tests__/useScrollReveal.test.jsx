import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useScrollReveal } from '../useScrollReveal';

function Componente(props) {
    const ref = useScrollReveal(props);
    return (
        <div ref={ref} data-testid="alvo">
            <p>Conteúdo um</p>
            <p>Conteúdo dois</p>
        </div>
    );
}

function comMovimentoReduzido(reduzido) {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
        matches: reduzido,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    }));
}

describe('useScrollReveal', () => {
    it('mantém o conteúdo visível antes de qualquer gatilho de scroll', () => {
        render(<Componente />);

        const alvo = screen.getByTestId('alvo');
        expect(alvo).toBeVisible();
        expect(alvo.style.opacity).not.toBe('0');
    });

    it('não aplica estado oculto quando o usuário pede movimento reduzido', () => {
        comMovimentoReduzido(true);
        render(<Componente />);

        const alvo = screen.getByTestId('alvo');
        expect(alvo.style.opacity).not.toBe('0');
        expect(screen.getByText('Conteúdo um')).toBeVisible();
    });

    it('não oculta os filhos no modo de revelação encadeada', () => {
        render(<Componente children stagger={0.05} />);

        expect(screen.getByText('Conteúdo um')).toBeVisible();
        expect(screen.getByText('Conteúdo dois')).toBeVisible();
    });

    it('deixa o conteúdo visível após a desmontagem do efeito', () => {
        const { unmount } = render(<Componente />);
        const alvo = screen.getByTestId('alvo');

        unmount();
        expect(alvo.style.opacity).not.toBe('0');
    });
});
