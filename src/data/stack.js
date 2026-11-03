/**
 * Projetos que servem de evidência para a stack. Só os quatro com `pagina: true`
 * têm case em /projetos; os demais aparecem no grafo e na lista sem link.
 * `status` só vai aqui quando foi informado: não é inferido.
 */
export const PROJETOS = {
    amotif: { nome: 'AMOTIF', cor: '#38E8D0', status: 'em produção', pagina: true },
    'tchuu-tchuu': { nome: 'Tchuu-Tchuu', cor: '#8B7CFF', pagina: true },
    typemarks: { nome: 'TypeMarks', cor: '#FF7AC6', pagina: true },
    'br-standards-with-zod': { nome: 'br_standards_with_zod', cor: '#F4F6F8', status: 'publicada no NPM', pagina: true },
    comandliz: { nome: 'ComandLiz', cor: '#FFD166', status: 'back-end pronto, front-end começando' },
    docusprint: { nome: 'DocuSprint', cor: '#FFA94D' },
    orcalint: { nome: 'OrcaLint', cor: '#9BE564' },
    'agente-local': { nome: 'Agente local', cor: '#7BDFF2' },
};

/**
 * Stack atual: cada tecnologia vem com a evidência de uso real e a lista de
 * projetos onde foi aplicada (`projetos`), para a lista não ser uma declaração
 * vazia de domínio. O primeiro projeto é o que a lista linka quando há case.
 */
export const STACK_ATUAL = [
    {
        grupo: 'Linguagem e runtime',
        itens: [
            { nome: 'TypeScript', evidencia: 'Base do AMOTIF e da br_standards_with_zod', projetos: ['amotif', 'br-standards-with-zod'] },
            { nome: 'JavaScript', evidencia: 'Backend e frontend do Tchuu-Tchuu', projetos: ['tchuu-tchuu'] },
            { nome: 'Bun', evidencia: 'Runtime do AMOTIF, do ComandLiz, do DocuSprint, do OrcaLint e dos benchmarks', projetos: ['amotif', 'typemarks', 'comandliz', 'docusprint', 'orcalint'] },
            { nome: 'Node.js', evidencia: 'API do Tchuu-Tchuu e execução do TypeMarks', projetos: ['tchuu-tchuu', 'typemarks'] },
        ],
    },
    {
        grupo: 'API e dados',
        itens: [
            { nome: 'Fastify', evidencia: 'API de 73 endpoints no AMOTIF e back-end do ComandLiz', projetos: ['amotif', 'comandliz', 'tchuu-tchuu', 'typemarks'] },
            { nome: 'Hono', evidencia: 'API de autenticação e licenciamento do DocuSprint', projetos: ['docusprint', 'typemarks'] },
            { nome: 'WebSocket', evidencia: 'Telemetria dos trens no Tchuu-Tchuu', projetos: ['tchuu-tchuu'] },
            { nome: 'PostgreSQL', evidencia: '14 modelos e 15 migrações no AMOTIF', projetos: ['amotif', 'comandliz', 'tchuu-tchuu', 'docusprint'] },
            { nome: 'Neon', evidencia: 'Banco gerenciado do Tchuu-Tchuu e do DocuSprint', projetos: ['tchuu-tchuu', 'docusprint'] },
            { nome: 'Prisma', evidencia: 'Camada de acesso a dados do AMOTIF', projetos: ['amotif'] },
            { nome: 'Drizzle ORM', evidencia: 'Acesso a dados do ComandLiz, do DocuSprint e do OrcaLint', projetos: ['comandliz', 'docusprint', 'orcalint'] },
        ],
    },
    {
        grupo: 'Autenticação e pagamentos',
        itens: [
            { nome: 'JWT', evidencia: 'Sessões no AMOTIF, no Tchuu-Tchuu e no OrcaLint', projetos: ['amotif', 'tchuu-tchuu', 'orcalint'] },
            { nome: 'Argon2', evidencia: 'Hash de senhas no AMOTIF (Argon2id) e no DocuSprint', projetos: ['amotif', 'docusprint'] },
            { nome: 'Login com Google', evidencia: 'Autenticação do OrcaLint', projetos: ['orcalint'] },
        ],
    },
    {
        grupo: 'Interfaces',
        itens: [
            { nome: 'React', evidencia: 'Frontend do AMOTIF e do DocuSprint', projetos: ['amotif', 'docusprint'] },
            { nome: 'Next.js', evidencia: 'Frontend do ComandLiz', projetos: ['comandliz'] },
            { nome: 'Expo', evidencia: 'App do OrcaLint, com Expo Router', projetos: ['orcalint'] },
            { nome: 'Zustand', evidencia: 'Estado do app do OrcaLint', projetos: ['orcalint'] },
            { nome: 'Chart.js', evidencia: 'Painel operacional do Tchuu-Tchuu', projetos: ['tchuu-tchuu'] },
        ],
    },
    {
        grupo: 'Validação e qualidade',
        itens: [
            { nome: 'TypeBox', evidencia: 'Validação com compilação JIT no AMOTIF, no ComandLiz e no TypeMarks', projetos: ['amotif', 'comandliz', 'typemarks'] },
            { nome: 'Zod', evidencia: 'Biblioteca própria publicada no NPM', projetos: ['br-standards-with-zod'] },
            { nome: 'Vitest', evidencia: 'Testes da biblioteca e dos benchmarks', projetos: ['br-standards-with-zod'] },
            { nome: 'Autocannon', evidencia: 'Testes de carga dos 15 cenários do TypeMarks', projetos: ['typemarks'] },
        ],
    },
    {
        grupo: 'IA local',
        itens: [
            { nome: 'Ollama', evidencia: 'Modelo local rodando na RTX 5060 no agente local', projetos: ['agente-local'] },
            { nome: 'OpenRouter', evidencia: 'Fallback opcional do agente local', projetos: ['agente-local'] },
        ],
    },
];
