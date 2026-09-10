import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../animations/useScrollReveal';
import { usePageEntry } from '../animations/usePageEntry';
import { useRevealTitle } from '../animations/useRevealTitle';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Sobre() {
    const pageRef = usePageEntry();
    const heroRef = useScrollReveal({ y: 25 });
    const perfilRef = useScrollReveal({ y: 25 });
    const perfilContentRef = useScrollReveal({ y: 20, children: true, stagger: 0.06 });

    const trajetoriaTitleRef = useRevealTitle();
    const trajetoriaRef = useScrollReveal({ y: 25 });
    const trajetoriaItemsRef = useScrollReveal({ y: 20, children: true, stagger: 0.08 });

    const expTitleRef = useRevealTitle();
    const expRef = useScrollReveal({ y: 25 });
    const expItemsRef = useScrollReveal({ y: 20, children: true, stagger: 0.08 });

    const formacaoTitleRef = useRevealTitle();
    const formacaoRef = useScrollReveal({ y: 25 });
    const formacaoItemsRef = useScrollReveal({ y: 20, children: true, stagger: 0.08 });

    const comoTitleRef = useRevealTitle();
    const comoRef = useScrollReveal({ y: 25 });
    const comoCardsRef = useScrollReveal({ y: 20, children: true, stagger: 0.06 });

    const direcaoTitleRef = useRevealTitle();
    const docsRef = useScrollReveal({ y: 20 });
    const cvRef = useScrollReveal({ y: 20 });

    const timelineTrackRef = useRef(null);

    useLayoutEffect(() => {
        if (prefersReducedMotion) return;

        const path = timelineTrackRef.current?.querySelector('path');
        if (!path) return;

        const length = path.getTotalLength();

        const ctx = gsap.context(() => {
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });

            gsap.to(path, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 70%',
                    end: 'bottom 70%',
                    scrub: 1,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <main ref={pageRef}>
            {/* HERO DO SOBRE */}
            <section className="sobre-hero" ref={heroRef}>
                <h1 className="titulo">Por trás do código.</h1>
                <p className="sobre-hero-sub">
                    Construo sistemas pensando no que acontece por baixo deles.
                </p>
            </section>

            {/* 01 — PERFIL */}
            <section className="cont" ref={perfilRef}>
                <div className="sobre-secao-numero">01</div>
                <h2 className="titulo">Perfil</h2>

                <div className="sobre-perfil" ref={perfilContentRef}>
                    <img src="ASSETS/imagens/foto_braian.jpg" alt="Braian de Liz" className="sobre-foto" />
                    <div className="sobre-perfil-texto">
                        <p className="sobre-perfil-tagline">
                            Engenharia de software com foco em backend
                        </p>
                        <p>
                            Desenvolvedor de sistemas com formação técnica em Desenvolvimento de Sistemas
                            e graduação em Análise e Desenvolvimento de Sistemas em andamento. Minha atuação
                            é direcionada à construção de aplicações web robustas, com foco em arquitetura,
                            performance, integração de serviços e consistência de dados.
                        </p>
                        <p>
                            Tenho experiência prática desde o desenvolvimento e estruturação de aplicações
                            até sua implantação, trabalhando principalmente no ecossistema JavaScript/TypeScript
                            e tecnologias de backend. Meu interesse está especialmente em sistemas que exigem
                            eficiência, escalabilidade e decisões arquiteturais bem fundamentadas.
                        </p>
                        <div className="sobre-links">
                            <a href="https://github.com/Braian-de-Liz" target="_blank" rel="noopener noreferrer" className="social-floating-btn">
                                <svg height="20" viewBox="0 0 16 16" width="20" fill="currentColor">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                <span>GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/braian-de-liz-da-silva-47385038b/" target="_blank" rel="noopener noreferrer" className="social-floating-btn">
                                <svg height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 02 — EVOLUÇÃO TÉCNICA */}
            <section className="cont" ref={trajetoriaRef}>
                <div className="sobre-secao-numero">02</div>
                <h2 className="titulo" ref={trajetoriaTitleRef}>Evolução técnica</h2>

                <div className="timeline" ref={trajetoriaItemsRef}>
                    <div className="timeline-track" ref={timelineTrackRef}>
                        <svg width="2" height="100%" preserveAspectRatio="none">
                            <path
                                d="M1,0 L1,1000"
                                stroke="rgba(79,193,233,0.2)"
                                strokeWidth="2"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>
                    <div className="timeline-item">
                        <span className="timeline-ano">2023</span>
                        <div className="timeline-conteudo">
                            <h3>Fundamentos</h3>
                            <p>Lógica, algoritmos e primeiros projetos.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <span className="timeline-ano">2024</span>
                        <div className="timeline-conteudo">
                            <h3>Desenvolvimento de Sistemas</h3>
                            <p>Web, dados e aplicações práticas.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <span className="timeline-ano">2025</span>
                        <div className="timeline-conteudo">
                            <h3>Aplicações reais</h3>
                            <p>Projetos completos e integração.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <span className="timeline-ano">2026</span>
                        <div className="timeline-conteudo">
                            <h3>Engenharia de Backend</h3>
                            <p>Performance, arquitetura e sistemas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 03 — EXPERIÊNCIA */}
            <section className="cont" ref={expRef}>
                <div className="sobre-secao-numero">03</div>
                <h2 className="titulo" ref={expTitleRef}>Experiência</h2>

                <div className="sobre-exp-items" ref={expItemsRef}>
                    <div className="sobre-exp-item">
                        <div className="sobre-exp-numero">01</div>
                        <div className="sobre-exp-conteudo">
                            <span className="sobre-exp-tag">DESENVOLVIMENTO</span>
                            <h3>Full-Stack Freelancer</h3>
                            <span className="sobre-exp-sub">Desenvolvimento Web · Projetos Pontuais</span>
                            <p className="sobre-exp-desc">
                                Planejamento, arquitetura, desenvolvimento e deploy de aplicações web
                                para clientes reais, com atenção a responsividade, experiência do usuário
                                e performance.
                            </p>
                            <div className="sobre-exp-flow">
                                Arquitetura · Desenvolvimento · Deploy
                            </div>
                        </div>
                    </div>

                    <div className="sobre-exp-item">
                        <div className="sobre-exp-numero">02</div>
                        <div className="sobre-exp-conteudo">
                            <span className="sobre-exp-tag">INDÚSTRIA</span>
                            <h3>Tupy</h3>
                            <span className="sobre-exp-sub">Jovem Aprendiz · Controle da Qualidade</span>
                            <p className="sobre-exp-desc">
                                Atuação analítica no controle de qualidade e auditoria técnica dos
                                fluxos de produção, acompanhando conformidade, padronização e
                                tratamento de desvios.
                            </p>
                            <div className="sobre-exp-flow">
                                Qualidade · Auditoria · Conformidade
                            </div>
                        </div>
                    </div>

                    <div className="sobre-exp-item">
                        <div className="sobre-exp-numero">03</div>
                        <div className="sobre-exp-conteudo">
                            <span className="sobre-exp-tag">VOLUNTARIADO</span>
                            <h3>Torneios de Robótica</h3>
                            <span className="sobre-exp-sub">2023 — 2024</span>
                            <p className="sobre-exp-desc">
                                Suporte logístico e apoio técnico às equipes competidoras, com
                                resolução de problemas sob pressão, comunicação e trabalho em equipe.
                            </p>
                            <div className="sobre-exp-flow">
                                Suporte técnico · Comunicação · Resolução de problemas
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 04 — FORMAÇÃO */}
            <section className="cont" ref={formacaoRef}>
                <div className="sobre-secao-numero">04</div>
                <h2 className="titulo" ref={formacaoTitleRef}>Formação</h2>

                <div className="sobre-formacao-items" ref={formacaoItemsRef}>
                    <div className="sobre-formacao-item">
                        <div className="sobre-formacao-info">
                            <h3>Análise e Desenvolvimento de Sistemas</h3>
                            <span className="sobre-formacao-local">UniSenai · 2026 — atual</span>
                            <p className="sobre-formacao-desc">
                                Programação aplicada, engenharia de software,
                                frameworks modernos e desenvolvimento backend.
                            </p>
                        </div>
                    </div>

                    <div className="sobre-formacao-item">
                        <div className="sobre-formacao-info">
                            <h3>Técnico em Desenvolvimento de Sistemas</h3>
                            <span className="sobre-formacao-local">SESI/SENAI · 2023 — 2025</span>
                            <p className="sobre-formacao-desc">
                                Lógica · Algoritmos · Banco de Dados · Web
                                Estruturas de Dados · Projetos colaborativos
                            </p>
                        </div>
                        <a
                            href="/ASSETS/documentos/histórico escolar braian de liz (2).pdf"
                            download="Historico_Braian_de_Liz.pdf"
                            className="pagina-boton"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Histórico
                        </a>
                    </div>

                    <div className="sobre-formacao-item">
                        <div className="sobre-formacao-info">
                            <h3>Técnico em Fundição</h3>
                            <span className="sobre-formacao-local">SENAI · 2026 — atual</span>
                            <p className="sobre-formacao-desc">
                                Processos metalúrgicos · Materiais · Otimização
                                de processos industriais
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 05 — COMO EU TRABALHO */}
            <section className="cont" ref={comoRef}>
                <div className="sobre-secao-numero">05</div>
                <h2 className="titulo" ref={comoTitleRef}>Como eu trabalho</h2>

                <div className="sobre-abordagens" ref={comoCardsRef}>
                    <div className="sobre-abordagem">
                        <h3>Performance</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>Busco reduzir overhead e construir sistemas eficientes
                        desde a camada de dados até a API, avaliando o custo das
                        abstrações e o comportamento da aplicação em execução.</p>
                    </div>

                    <div className="sobre-abordagem">
                        <h3>Arquitetura</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>Estruturo aplicações com separação clara de responsabilidades,
                        priorizando baixo acoplamento, manutenção e evolução incremental.</p>
                    </div>

                    <div className="sobre-abordagem">
                        <h3>Dados</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>Trabalho com bancos relacionais, modelagem, validação de schemas
                        e consistência das informações, considerando o impacto das decisões
                        de persistência no restante da aplicação.</p>
                    </div>

                    <div className="sobre-abordagem">
                        <h3>Aprendizado</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>Aprendo principalmente por experimentação prática, comparando
                        tecnologias, medindo resultados e aplicando os conceitos em
                        projetos reais.</p>
                    </div>
                </div>
            </section>

            {/* 06 — DIREÇÃO TÉCNICA */}
            <section className="cont" ref={docsRef}>
                <div className="sobre-secao-numero">06</div>
                <h2 className="titulo" ref={direcaoTitleRef}>Direção técnica</h2>

                <div className="sobre-abordagens">
                    <div className="sobre-abordagem">
                        <h3>Backend e arquitetura</h3>
                        <div className="sobre-abordagem-divider"></div>
                        <p>Meu foco está no desenvolvimento backend com JavaScript e TypeScript,
                        priorizando APIs eficientes, baixo overhead e arquiteturas que sejam
                        simples de manter e evoluir.</p>
                        <p>Tenho direcionado meus estudos e projetos para runtimes, frameworks
                        e ferramentas modernas do ecossistema JavaScript/TypeScript, com atenção
                        especial a performance, arquitetura de software, integração entre serviços
                        e consistência de dados.</p>
                    </div>
                </div>

                <div className="sobre-cta-wrap">
                    <Link to="/habilidades" className="pagina-boton">Ver habilidades técnicas →</Link>
                </div>
            </section>

            {/* 07 — CV / CONTATO */}
            <section className="sobre-docs" ref={cvRef}>
                <p className="sobre-docs-texto">
                    Quer ver meu currículo completo?
                </p>
                <a
                    href="/ASSETS/documentos/Currículo Braian de Liz.pdf"
                    download="Curriculo_Braian_de_Liz.pdf"
                    className="pagina-boton sobre-docs-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Baixar currículo PDF
                </a>
            </section>
        </main>
    );
}

export { Sobre };
