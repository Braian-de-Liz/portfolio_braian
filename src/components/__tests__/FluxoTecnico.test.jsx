import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FluxoTecnico } from '../FluxoTecnico';

const etapas = [
    { titulo: 'Frontend', itens: ['React 19', 'Vite'] },
    { titulo: 'API', itens: ['Fastify 5', 'TypeBox'], destaque: true, conexao: 'HTTPS' },
    { titulo: 'Banco', itens: ['PostgreSQL'], conexao: 'SQL' },
];

describe('FluxoTecnico', () => {
    it('renderiza todas as etapas na ordem informada', () => {
        render(<FluxoTecnico titulo="architecture.flow" etapas={etapas} />);

        const titulos = screen.getAllByTestId('fluxo-etapa-titulo').map((el) => el.textContent);
        expect(titulos).toEqual(['Frontend', 'API', 'Banco']);
    });

    it('lista os itens de cada etapa', () => {
        render(<FluxoTecnico titulo="architecture.flow" etapas={etapas} />);

        expect(screen.getByText('React 19')).toBeInTheDocument();
        expect(screen.getByText('Fastify 5')).toBeInTheDocument();
        expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    });

    it('usa lista ordenada para preservar a sequência semanticamente', () => {
        render(<FluxoTecnico titulo="architecture.flow" etapas={etapas} />);

        const lista = screen.getByRole('list', { name: /architecture\.flow/i });
        expect(lista.tagName).toBe('OL');
    });

    it('marca a etapa em destaque', () => {
        render(<FluxoTecnico titulo="architecture.flow" etapas={etapas} />);

        const etapasRenderizadas = screen.getAllByTestId('fluxo-etapa');
        expect(etapasRenderizadas[1]).toHaveAttribute('data-destaque', 'true');
        expect(etapasRenderizadas[0]).not.toHaveAttribute('data-destaque');
    });

    it('exibe o protocolo de conexão entre etapas', () => {
        render(<FluxoTecnico titulo="architecture.flow" etapas={etapas} />);

        expect(screen.getByText('HTTPS')).toBeInTheDocument();
        expect(screen.getByText('SQL')).toBeInTheDocument();
    });

    it('não exibe conexão antes da primeira etapa', () => {
        render(<FluxoTecnico titulo="architecture.flow" etapas={etapas} />);

        const conexoes = screen.getAllByTestId('fluxo-conexao');
        expect(conexoes).toHaveLength(2);
    });

    it('renderiza a nota de rodapé quando fornecida', () => {
        render(
            <FluxoTecnico
                titulo="architecture.flow"
                etapas={etapas}
                nota="Upload segue por streaming até o storage."
            />
        );

        expect(screen.getByText(/Upload segue por streaming/)).toBeInTheDocument();
    });

    it('permanece visível sem depender de animação', () => {
        render(<FluxoTecnico titulo="architecture.flow" etapas={etapas} />);

        const raiz = screen.getByTestId('fluxo-tecnico');
        expect(raiz).toBeVisible();
        expect(raiz.style.opacity).not.toBe('0');
    });
});
