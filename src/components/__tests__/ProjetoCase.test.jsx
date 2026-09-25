import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjetoCase } from '../ProjetoCase';

const base = {
    id: 'exemplo',
    categoria: 'Plataforma',
    titulo: 'Projeto Exemplo',
    resumo: 'Resumo curto do problema e da solução.',
    stack: ['Bun', 'Fastify', 'PostgreSQL'],
    links: [{ href: 'https://github.com/exemplo', label: 'GitHub' }],
    detalhes: <p>Conteúdo técnico aprofundado.</p>,
};

describe('ProjetoCase', () => {
    it('apresenta categoria, título e resumo sem exigir interação', () => {
        render(<ProjetoCase {...base} />);

        expect(screen.getByRole('heading', { level: 2, name: /Projeto Exemplo/ })).toBeInTheDocument();
        expect(screen.getByText('Plataforma')).toBeInTheDocument();
        expect(screen.getByText(/Resumo curto/)).toBeInTheDocument();
    });

    it('mantém os detalhes técnicos recolhidos por padrão', () => {
        render(<ProjetoCase {...base} />);

        const gatilho = screen.getByRole('button', { name: /arquitetura e detalhes/i });
        expect(gatilho).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByText(/Conteúdo técnico aprofundado/)).not.toBeVisible();
    });

    it('revela e recolhe os detalhes ao acionar o gatilho', async () => {
        const user = userEvent.setup();
        render(<ProjetoCase {...base} />);

        const gatilho = screen.getByRole('button', { name: /arquitetura e detalhes/i });

        await user.click(gatilho);
        expect(gatilho).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText(/Conteúdo técnico aprofundado/)).toBeVisible();

        await user.click(gatilho);
        expect(gatilho).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByText(/Conteúdo técnico aprofundado/)).not.toBeVisible();
    });

    it('permite abrir os detalhes pelo teclado', async () => {
        const user = userEvent.setup();
        render(<ProjetoCase {...base} />);

        const gatilho = screen.getByRole('button', { name: /arquitetura e detalhes/i });
        gatilho.focus();
        await user.keyboard('{Enter}');

        expect(gatilho).toHaveAttribute('aria-expanded', 'true');
    });

    it('associa o gatilho ao painel que ele controla', () => {
        render(<ProjetoCase {...base} />);

        const gatilho = screen.getByRole('button', { name: /arquitetura e detalhes/i });
        const painelId = gatilho.getAttribute('aria-controls');

        expect(painelId).toBeTruthy();
        expect(painelId).not.toMatch(/[\s&]/);
        expect(document.getElementById(painelId)).not.toBeNull();
    });

    it('lista a stack e limita a quantidade exibida', () => {
        render(
            <ProjetoCase
                {...base}
                stack={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']}
            />
        );

        expect(screen.getAllByTestId('case-stack-item').length).toBeLessThanOrEqual(6);
    });

    it('exibe métricas quando fornecidas', () => {
        render(
            <ProjetoCase
                {...base}
                metricas={[
                    { valor: '28.534', rotulo: 'req/s' },
                    { valor: '2,94 ms', rotulo: 'latência média' },
                ]}
            />
        );

        expect(screen.getByText('28.534')).toBeInTheDocument();
        expect(screen.getByText('latência média')).toBeInTheDocument();
    });

    it('funciona sem imagem e sem métricas', () => {
        render(<ProjetoCase {...base} />);

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.queryByTestId('case-metricas')).not.toBeInTheDocument();
    });

    it('renderiza a imagem opcional com legenda quando existir', () => {
        render(
            <ProjetoCase
                {...base}
                imagem={{
                    src: '/ASSETS/imagens/home_amotif.png',
                    alt: 'Feed de projetos do AMOTIF',
                    legenda: 'Feed público com filtros',
                }}
            />
        );

        const img = screen.getByRole('img', { name: /Feed de projetos do AMOTIF/ });
        expect(img).toHaveAttribute('src', '/ASSETS/imagens/home_amotif.png');
        expect(img).toHaveAttribute('loading', 'lazy');
        expect(screen.getByText('Feed público com filtros')).toBeInTheDocument();
    });

    it('abre links externos com segurança', () => {
        render(<ProjetoCase {...base} />);

        const link = screen.getByRole('link', { name: /GitHub/ });
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
});
