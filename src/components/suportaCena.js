/** WebGL2 disponível e sem preferência por menos movimento/dados. */
export function suportaCena() {
    if (typeof window === 'undefined') return false;
    if (typeof window.WebGL2RenderingContext === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (navigator.connection?.saveData) return false;
    return true;
}
