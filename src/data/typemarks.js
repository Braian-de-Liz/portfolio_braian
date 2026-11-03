/*
 * Os quatro melhores cenários do relatório de benchmark do TypeMarks,
 * seguidos do baseline em Node.js com a mesma combinação Fastify + AJV.
 * O contraste entre a 4ª e a 5ª linha isola o efeito do runtime.
 */
export const CENARIOS_TYPEMARKS = [
    { runtime: 'Bun', framework: 'Hono', validador: 'AJV', reqs: 28534, latencia: '2,94 ms' },
    { runtime: 'Bun', framework: 'Elysia', validador: 'TypeBox', reqs: 25915, latencia: '3,45 ms' },
    { runtime: 'Bun', framework: 'Hono', validador: 'Schema-Shield', reqs: 25021, latencia: '3,61 ms' },
    { runtime: 'Bun', framework: 'Fastify', validador: 'AJV', reqs: 22527, latencia: '3,93 ms' },
    { runtime: 'Node', framework: 'Fastify', validador: 'AJV', reqs: 14998, latencia: '6,16 ms' },
];
