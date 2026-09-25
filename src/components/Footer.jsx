import { useScrollReveal } from '../animations/useScrollReveal';

function Footer() {
    const footerRef = useScrollReveal({ y: 20 });

    return (
        <footer id="fot" ref={footerRef}>
            <h3>Contatos</h3>
            <p>
                Telefone:{' '}
                <a href="tel:+5547933803828" className="footer-link">+55 (47) 93380-3828</a>
            </p>
            <p>
                Email:{' '}
                <a href="mailto:delizbraian@gmail.com" className="footer-link">delizbraian@gmail.com</a>
            </p>
            <p>© {new Date().getFullYear()} · Braian de Liz · Direitos Reservados</p>
        </footer>
    );
}

export { Footer };
