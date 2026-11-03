/**
 * Stack atual: cada tecnologia vem acompanhada da evidência de uso real,
 * para que a lista não seja uma declaração vazia de domínio.
 */
export const STACK_ATUAL = [
    {
        grupo: 'Linguagem e runtime',
        itens: [
            { nome: 'TypeScript', evidencia: 'Base do AMOTIF e da br_standards_with_zod', projeto: 'amotif' },
            { nome: 'JavaScript', evidencia: 'Backend e frontend do Tchuu-Tchuu', projeto: 'tchuu-tchuu' },
            { nome: 'Bun', evidencia: 'Runtime da API do AMOTIF e dos benchmarks', projeto: 'amotif' },
            { nome: 'Node.js', evidencia: 'API do Tchuu-Tchuu e execução do TypeMarks', projeto: 'tchuu-tchuu' },
        ],
    },
    {
        grupo: 'API e dados',
        itens: [
            { nome: 'Fastify', evidencia: 'API de 73 endpoints no AMOTIF', projeto: 'amotif' },
            { nome: 'PostgreSQL', evidencia: '14 modelos e 15 migrações no AMOTIF', projeto: 'amotif' },
            { nome: 'Prisma', evidencia: 'Camada de acesso a dados do AMOTIF', projeto: 'amotif' },
        ],
    },
    {
        grupo: 'Validação e qualidade',
        itens: [
            { nome: 'TypeBox', evidencia: 'Validação com compilação JIT no Fastify', projeto: 'typemarks' },
            { nome: 'Zod', evidencia: 'Biblioteca própria publicada no NPM', projeto: 'br-standards-with-zod' },
            { nome: 'Vitest', evidencia: 'Testes da biblioteca e dos benchmarks', projeto: 'br-standards-with-zod' },
            { nome: 'Autocannon', evidencia: 'Testes de carga dos 15 cenários do TypeMarks', projeto: 'typemarks' },
        ],
    },
];
