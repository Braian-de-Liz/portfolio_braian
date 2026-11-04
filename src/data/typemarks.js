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

/**
 * Tabela mestra completa do relatório (15 cenários, ordenados por throughput),
 * copiada do README do repositório typemarks.
 */
export const TODOS_CENARIOS_TYPEMARKS = [
    { rank: 1, runtime: 'Bun', framework: 'Hono', validador: 'AJV', reqs: 28534.08, latencia: '2,94 ms', p99: '5,60 ms', delta: null },
    { rank: 2, runtime: 'Bun', framework: 'Elysia', validador: 'TypeBox', reqs: 25915.2, latencia: '3,45 ms', p99: '6,60 ms', delta: '-9,2%' },
    { rank: 3, runtime: 'Bun', framework: 'Hono', validador: 'Schema-Shield', reqs: 25021.12, latencia: '3,61 ms', p99: '7,20 ms', delta: '-12,3%' },
    { rank: 4, runtime: 'Bun', framework: 'Fastify', validador: 'AJV', reqs: 22527.44, latencia: '3,93 ms', p99: '8,60 ms', delta: '-21,1%' },
    { rank: 5, runtime: 'Bun', framework: 'Fastify', validador: 'Typia', reqs: 22450.64, latencia: '3,90 ms', p99: '8,40 ms', delta: '-21,3%' },
    { rank: 6, runtime: 'Bun', framework: 'Fastify', validador: 'Schema-Shield', reqs: 21106.48, latencia: '4,23 ms', p99: '8,60 ms', delta: '-26,0%' },
    { rank: 7, runtime: 'Bun', framework: 'Fastify', validador: 'Zod', reqs: 20379.76, latencia: '4,42 ms', p99: '9,40 ms', delta: '-28,6%' },
    { rank: 8, runtime: 'Node', framework: 'Hono', validador: 'AJV', reqs: 20373.16, latencia: '4,34 ms', p99: '9,40 ms', delta: '-28,6%' },
    { rank: 9, runtime: 'Node', framework: 'Fastify', validador: 'AJV', reqs: 14998.08, latencia: '6,16 ms', p99: '14,20 ms', delta: '-47,4%' },
    { rank: 10, runtime: 'Node', framework: 'Fastify', validador: 'Typia', reqs: 14755.28, latencia: '6,26 ms', p99: '14,80 ms', delta: '-48,3%' },
    { rank: 11, runtime: 'Node', framework: 'Fastify', validador: 'Schema-Shield', reqs: 14500.8, latencia: '6,40 ms', p99: '14,20 ms', delta: '-49,2%' },
    { rank: 12, runtime: 'Node', framework: 'Fastify', validador: 'Valibot', reqs: 14114.88, latencia: '6,58 ms', p99: '14,20 ms', delta: '-50,5%' },
    { rank: 13, runtime: 'Node', framework: 'Fastify', validador: 'Zod', reqs: 13754.24, latencia: '6,80 ms', p99: '15,00 ms', delta: '-51,8%' },
    { rank: 14, runtime: 'Bun', framework: 'Fastify', validador: 'Yup', reqs: 6192, latencia: '15,76 ms', p99: '22,60 ms', delta: '-78,3%' },
    { rank: 15, runtime: 'Node', framework: 'Fastify', validador: 'Yup', reqs: 5974.26, latencia: '16,35 ms', p99: '31,00 ms', delta: '-79,1%' },
];
