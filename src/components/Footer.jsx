import { useScrollReveal } from '../animations/useScrollReveal';

function Footer() {
    const footerRef = useScrollReveal({ y: 20 });

    return (
        <footer id="fot" ref={footerRef}>
            <p>© {new Date().getFullYear()} Braian de Liz</p>
        </footer>
    );
}

export { Footer };
