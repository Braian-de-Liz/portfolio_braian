import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TituloDaPagina } from '../TituloDaPagina';

function titulo(rota) {
    render(<MemoryRouter initialEntries={[rota]}><TituloDaPagina /></MemoryRouter>);
    return document.title;
}

describe('TituloDaPagina', () => {
    it('usa o título principal na página única', () => {
        expect(titulo('/')).toBe('Braian de Liz | Desenvolvedor de Sistemas');
    });

    it('avisa quando a rota não existe', () => {
        expect(titulo('/nada')).toMatch(/não encontrada/i);
    });
});
