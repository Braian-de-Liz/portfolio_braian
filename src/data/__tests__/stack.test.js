import { describe, it, expect } from 'vitest';
import { PROJETOS, STACK_ATUAL } from '../stack';

describe('dados da stack', () => {
    const itens = STACK_ATUAL.flatMap((g) => g.itens);

    it('liga cada tecnologia a pelo menos um projeto que existe', () => {
        for (const item of itens) {
            expect(item.projetos.length, item.nome).toBeGreaterThan(0);
            for (const id of item.projetos) {
                expect(PROJETOS[id], `${item.nome} → ${id}`).toBeDefined();
            }
        }
    });

    it('não repete tecnologia', () => {
        const nomes = itens.map((i) => i.nome);
        expect(new Set(nomes).size).toBe(nomes.length);
    });

    it('usa cada projeto como evidência de pelo menos uma tecnologia', () => {
        for (const id of Object.keys(PROJETOS)) {
            expect(itens.some((i) => i.projetos.includes(id)), id).toBe(true);
        }
    });
});
