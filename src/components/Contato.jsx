import { useScrollReveal } from '../animations/useScrollReveal';

const EMAIL = 'delizbraian@gmail.com';

const LINKS = [
    { rotulo: 'LinkedIn', href: 'https://www.linkedin.com/in/braian-de-liz-da-silva-47385038b/' },
    { rotulo: 'GitHub', href: 'https://github.com/Braian-de-Liz' },
    { rotulo: '+55 (47) 93380-3828', href: 'tel:+5547933803828', telefone: true },
    {
        rotulo: 'Baixar currículo',
        href: '/ASSETS/documentos/Curr%C3%ADculo%20Braian%20de%20Liz.pdf',
        download: true,
    },
];

/** Fechamento da página: uma ação principal (e-mail) e caminhos secundários. */
function Contato() {
    const ref = useScrollReveal({ y: 24 });

    return (
        <section className="secao-aberta contato" ref={ref} id="contato" data-testid="contato">
            <span className="eyebrow">Contato</span>
            <h2 className="contato-titulo">Vamos conversar?</h2>
            <p className="contato-texto">
                Aberto a vagas e projetos de backend. 
            </p>

            <a className="contato-email" href={`mailto:${EMAIL}`}>
                <span>{EMAIL}</span>
                <span className="contato-seta" aria-hidden="true">↗</span>
            </a>

            <ul className="contato-links">
                {LINKS.map((link) => (
                    <li key={link.rotulo}>
                        <a
                            href={link.href}
                            {...(link.download
                                ? { download: true }
                                : link.telefone
                                    ? {}
                                    : { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                            {link.rotulo} <span aria-hidden="true">↗</span>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export { Contato };
