import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

/**
 * Renderiza um componente dentro de um MemoryRouter.
 * A maioria dos componentes do portfólio usa Link/NavLink e precisa
 * de um contexto de rota para funcionar em teste.
 */
function renderWithRouter(ui, { route = '/' } = {}) {
    return render(
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    );
}

export { renderWithRouter };
