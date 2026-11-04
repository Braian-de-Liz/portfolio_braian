import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ExploradorTypeMarks } from '../ExploradorTypeMarks';

describe('ExploradorTypeMarks', () => {
    it('não aparece sem WebGL; a tabela dos detalhes cobre os mesmos dados', () => {
        const { container } = render(<ExploradorTypeMarks />);

        expect(container).toBeEmptyDOMElement();
    });
});
