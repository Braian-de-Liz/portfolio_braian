import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BenchmarkChart } from '../BenchmarkChart';

const cenarios = [
    { runtime: 'Bun', framework: 'Hono', validador: 'AJV', reqs: 28534, latencia: '2,94 ms' },
    { runtime: 'Bun', framework: 'Elysia', validador: 'TypeBox', reqs: 25915, latencia: '3,45 ms' },
    { runtime: 'Node', framework: 'Fastify', validador: 'AJV', reqs: 14998, latencia: '6,16 ms' },
];

describe('BenchmarkChart', () => {
    it('descreve o gráfico para tecnologia assistiva', () => {
        render(<BenchmarkChart cenarios={cenarios} legenda="Throughput por cenário" />);

        expect(screen.getByRole('img', { name: /Throughput por cenário/i })).toBeInTheDocument();
    });

    it('mantém a ordem decrescente de throughput recebida', () => {
        render(<BenchmarkChart cenarios={cenarios} legenda="Throughput" />);

        const valores = screen
            .getAllByTestId('benchmark-valor')
            .map((el) => Number(el.textContent.replace(/\./g, '').replace(/[^\d]/g, '')));

        expect(valores).toEqual([28534, 25915, 14998]);
    });

    it('identifica cada cenário por runtime, framework e validador', () => {
        render(<BenchmarkChart cenarios={cenarios} legenda="Throughput" />);

        const rotulos = screen.getAllByTestId('benchmark-rotulo').map((el) => el.textContent);
        expect(rotulos[0]).toContain('Bun');
        expect(rotulos[0]).toContain('Hono');
        expect(rotulos[0]).toContain('AJV');
    });

    it('oferece uma tabela equivalente como alternativa acessível', () => {
        render(<BenchmarkChart cenarios={cenarios} legenda="Throughput" />);

        const tabela = screen.getByRole('table', { name: /Throughput/i });
        expect(tabela).toBeInTheDocument();
        expect(tabela).toHaveClass('sr-only');
    });

    it('destaca visualmente o melhor cenário', () => {
        render(<BenchmarkChart cenarios={cenarios} legenda="Throughput" />);

        const barras = screen.getAllByTestId('benchmark-barra');
        expect(barras[0]).toHaveAttribute('data-melhor', 'true');
        expect(barras[1]).not.toHaveAttribute('data-melhor', 'true');
    });

    it('dimensiona as barras proporcionalmente ao maior valor', () => {
        render(<BenchmarkChart cenarios={cenarios} legenda="Throughput" />);

        const preenchimentos = screen.getAllByTestId('benchmark-preenchimento');
        expect(preenchimentos[0].style.getPropertyValue('--proporcao')).toBe('100%');

        const segundo = parseFloat(preenchimentos[1].style.getPropertyValue('--proporcao'));
        expect(segundo).toBeGreaterThan(80);
        expect(segundo).toBeLessThan(100);
    });
});
