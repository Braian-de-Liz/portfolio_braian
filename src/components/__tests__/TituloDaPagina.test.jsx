import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TituloDaPagina } from '../TituloDaPagina';

function titulo(rota) {
    render(<MemoryRouter initialEntries={[rota]}><TituloDaPagina /></MemoryRouter>);
    return document.title;
}

describe('TituloDaPagina', () => {
    it('usa um título por rota', () => {
        expect(titulo('/projetos')).toBe('Projetos | Braian de Liz');
        expect(titulo('/sobre/')).toBe('Sobre | Braian de Liz');
    });

    it('avisa quando a rota não existe', () => {
        expect(titulo('/nada')).toMatch(/não encontrada/i);
    });
});
