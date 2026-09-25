import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Habilidades } from '../habilidades';
import { renderWithRouter } from '../../test/helpers';

describe('Habilidades', () => {
    it('separa o que eu uso do que estou estudando', () => {
        renderWithRouter(<Habilidades />);

        expect(screen.getByTestId('stack-atual')).toBeInTheDocument();
        expect(screen.getByTestId('stack-estudo')).toBeInTheDocument();
    });

    it('associa cada tecnologia da stack atual a uma evidência de uso', () => {
        renderWithRouter(<Habilidades />);

        const itens = screen.getAllByTestId('stack-atual-item');
        expect(itens.length).toBeGreaterThan(0);

        for (const item of itens) {
            expect(item.querySelector('[data-testid="stack-evidencia"]')).not.toBeNull();
        }
    });

    it('apresenta os próximos estudos de forma secundária, sem acordeão', () => {
        renderWithRouter(<Habilidades />);

        const estudo = screen.getByTestId('stack-estudo');
        expect(estudo.querySelectorAll('button')).toHaveLength(0);
        expect(screen.getAllByTestId('stack-estudo-item').length).toBeGreaterThan(0);
    });

    it('não depende de hover para revelar conteúdo', async () => {
        const user = userEvent.setup();
        renderWithRouter(<Habilidades />);

        const antes = document.body.textContent;
        await user.hover(screen.getAllByTestId('stack-atual-item')[0]);

        expect(document.body.textContent).toBe(antes);
    });

    it('não carrega logos externos de tecnologia', () => {
        renderWithRouter(<Habilidades />);

        const externas = Array.from(document.querySelectorAll('img')).filter((img) =>
            img.getAttribute('src')?.startsWith('http')
        );

        expect(externas).toHaveLength(0);
    });

    it('deixa claro que a segunda lista não é domínio atual', () => {
        renderWithRouter(<Habilidades />);

        const estudo = screen.getByTestId('stack-estudo');
        expect(estudo.textContent).toMatch(/estud|aprofund|explor/i);
    });
});
