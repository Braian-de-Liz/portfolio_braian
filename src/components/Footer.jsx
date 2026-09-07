import { useScrollReveal } from '../animations/useScrollReveal';

function Footer() {
    const footerRef = useScrollReveal({ y: 20 });

    return (
        <footer id="fot" ref={footerRef}>
            <h3>Contatos</h3>
            <p>Telefone: +55 (47) 93380-3828</p>
            <p>email: delizbraian@gmail.com</p>
            <p>© {new Date().getFullYear()} . Braian de Liz Direitos Reservados</p>
        </footer>
    )
}

export { Footer };
