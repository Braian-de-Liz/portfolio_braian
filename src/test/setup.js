import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom não implementa matchMedia, usado pelos hooks de animação
// para respeitar prefers-reduced-motion.
if (!window.matchMedia) {
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
    });
}

// jsdom não implementa IntersectionObserver, usado para acionar
// as animações de reveal apenas quando o elemento entra na viewport.
if (!window.IntersectionObserver) {
    class IntersectionObserverStub {
        constructor(callback) {
            this.callback = callback;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return [];
        }
    }
    window.IntersectionObserver = IntersectionObserverStub;
    globalThis.IntersectionObserver = IntersectionObserverStub;
}

// jsdom declara scrollTo, mas a implementação lança "Not implemented".
// Os componentes de rota chamam esse método, então substituímos sempre.
window.scrollTo = () => {};

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});
