import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Cena3D } from '../Cena3D';
import { cenaCamadasAmotif } from '../cenas';

describe('Cena3D', () => {
    it('não renderiza nada quando o ambiente não tem WebGL2', () => {
        const { container } = render(<Cena3D montar={cenaCamadasAmotif} />);

        expect(container).toBeEmptyDOMElement();
    });
});
