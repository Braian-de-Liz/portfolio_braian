import { describe, it, expect } from 'vitest';
import { CENARIOS_TYPEMARKS, TODOS_CENARIOS_TYPEMARKS } from '../typemarks';

describe('dados do TypeMarks', () => {
    it('traz os 15 cenários do relatório, ordenados por throughput', () => {
        expect(TODOS_CENARIOS_TYPEMARKS).toHaveLength(15);
        TODOS_CENARIOS_TYPEMARKS.forEach((c, i) => expect(c.rank).toBe(i + 1));
        const reqs = TODOS_CENARIOS_TYPEMARKS.map((c) => c.reqs);
        for (let i = 1; i < 15; i++) expect(reqs[i]).toBeLessThanOrEqual(reqs[i - 1]);
    });

    it('mantém o gráfico resumido coerente com a tabela completa', () => {
        for (const c of CENARIOS_TYPEMARKS) {
            const completo = TODOS_CENARIOS_TYPEMARKS.find(
                (t) => t.runtime === c.runtime && t.framework === c.framework && t.validador === c.validador,
            );
            expect(completo, `${c.runtime} ${c.framework} ${c.validador}`).toBeDefined();
            expect(Math.round(completo.reqs)).toBe(c.reqs);
            expect(completo.latencia).toBe(c.latencia);
        }
    });
});
