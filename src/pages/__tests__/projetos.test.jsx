import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Projetos } from '../projetos';
import { renderWithRouter } from '../../test/helpers';

describe('Projetos', () => {
    it('ordena os cases por força técnica', () => {
        renderWithRouter(<Projetos />);

        const titulos = screen
            .getAllByRole('heading', { level: 2 })
            .map((h) => h.textContent);

        expect(titulos).toEqual([
            'AMOTIF',
            'TypeMarks',
            'br_standards_with_zod',
            'Tchuu-Tchuu',
        ]);
    });

    it('mantém os detalhes técnicos de todos os cases recolhidos ao abrir a página', () => {
        renderWithRouter(<Projetos />);

        const gatilhos = screen.getAllByRole('button', { name: /arquitetura e detalhes/i });
        expect(gatilhos).toHaveLength(4);

        for (const gatilho of gatilhos) {
            expect(gatilho).toHaveAttribute('aria-expanded', 'false');
        }
    });

    it('expande apenas o case acionado', async () => {
        const user = userEvent.setup();
        renderWithRouter(<Projetos />);

        const gatilhos = screen.getAllByRole('button', { name: /arquitetura e detalhes/i });
        await user.click(gatilhos[0]);

        expect(gatilhos[0]).toHaveAttribute('aria-expanded', 'true');
        expect(gatilhos[1]).toHaveAttribute('aria-expanded', 'false');
    });

    it('usa as métricas reais do TypeMarks', () => {
        renderWithRouter(<Projetos />);

        // 28.534 aparece na barra do gráfico, na tabela acessível
        // e no cartão de métrica.
        expect(screen.getAllByText('28.534').length).toBeGreaterThan(0);
        // A latência aparece no cartão de métrica e também na tabela
        // acessível que acompanha o gráfico.
        expect(screen.getAllByText('2,94 ms').length).toBeGreaterThan(0);
    });

    it('não renderiza prints de GitHub, login ou cadastro', () => {
        renderWithRouter(<Projetos />);

        const proibidos = [
            'gitamotif',
            'tchuu-tchuu_github',
            'amotif_login',
            'amotif_cadastro',
            'tchuu-tchuu_login',
        ];

        const fontes = Array.from(document.querySelectorAll('img')).map(
            (img) => img.getAttribute('src') ?? ''
        );

        for (const proibido of proibidos) {
            expect(fontes.some((src) => src.includes(proibido))).toBe(false);
        }
    });

    it('usa apenas caminhos absolutos para imagens locais', () => {
        renderWithRouter(<Projetos />);

        const locais = Array.from(document.querySelectorAll('img'))
            .map((img) => img.getAttribute('src') ?? '')
            .filter((src) => src !== '' && !src.startsWith('http'));

        for (const src of locais) {
            expect(src.startsWith('/')).toBe(true);
        }
    });

    it('abre todos os links externos com segurança', () => {
        renderWithRouter(<Projetos />);

        const externos = screen
            .getAllByRole('link')
            .filter((link) => link.getAttribute('href')?.startsWith('http'));

        expect(externos.length).toBeGreaterThan(0);
        for (const link of externos) {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link.getAttribute('rel')).toContain('noopener');
        }
    });

    it('limita a stack exibida por case', () => {
        renderWithRouter(<Projetos />);

        const cases = screen.getAllByRole('article');
        for (const caseEl of cases) {
            const itens = caseEl.querySelectorAll('[data-testid="case-stack-item"]');
            expect(itens.length).toBeLessThanOrEqual(6);
        }
    });

    it('apresenta a metodologia do benchmark junto ao gráfico', () => {
        renderWithRouter(<Projetos />);

        const texto = document.body.textContent;
        expect(texto).toMatch(/100 conex/i);
        expect(texto).toMatch(/5 rodadas/i);
    });
});
