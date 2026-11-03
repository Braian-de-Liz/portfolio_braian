import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { renderWithRouter } from '../../test/helpers';

describe('Hero', () => {
    it('apresenta o nome como título principal da página', () => {
        renderWithRouter(<Hero />);

        expect(screen.getByRole('heading', { level: 1, name: /Braian de Liz/i })).toBeInTheDocument();
    });

    it('posiciona a atuação em backend no cargo', () => {
        renderWithRouter(<Hero />);

        const cargo = screen.getByRole('heading', { level: 2 });
        expect(cargo).toHaveTextContent(/backend/i);
    });

    it('descreve a atuação com foco em APIs, arquitetura e dados', () => {
        renderWithRouter(<Hero />);

        const descricao = screen.getByTestId('hero-desc').textContent;
        expect(descricao).toMatch(/API/i);
        expect(descricao).toMatch(/arquitetura/i);
        expect(descricao).toMatch(/dados/i);
    });

    it('leva para os projetos pela ação principal', () => {
        renderWithRouter(<Hero />);

        expect(screen.getByRole('link', { name: /projetos/i })).toHaveAttribute('href', '/projetos');
    });

    it('não traz a foto: o retrato fica na página Sobre', () => {
        renderWithRouter(<Hero />);

        expect(screen.queryAllByRole('img')).toHaveLength(0);
    });

    it('expõe as tecnologias centrais do backend', () => {
        renderWithRouter(<Hero />);

        const tags = screen.getByTestId('hero-tags').textContent;
        for (const tech of ['TypeScript', 'Node.js', 'Fastify', 'PostgreSQL']) {
            expect(tags).toContain(tech);
        }
    });
});

describe('Hero sem WebGL', () => {
    it('não cria canvas nem reserva espaço quando a cena 3D não é suportada', () => {
        renderWithRouter(<Hero />);

        expect(document.querySelector('.hero-scene')).toBeNull();
        expect(document.querySelector('.hero-foto')).toBeNull();
    });
});
