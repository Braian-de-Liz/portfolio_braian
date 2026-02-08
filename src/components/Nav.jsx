import { Link } from 'react-router-dom'; 

function Nav() {
    return (
        <>
            <nav id="barrasup">
                <ul className="nav-links">
                    <li><Link to="/">inicio</Link></li>
                    <li><Link to="/projetos">Projetos</Link></li>
                    <li><Link to="/formacoes">Formações</Link></li>
                    <li><Link to="/Habilidades">Habilidades</Link></li>
                </ul>
            </nav>

   
            <nav id="rodanav">
                <Link to="/">
                    <span>🏠</span>
                    <span>Início</span>
                </Link>
                <Link to="/projetos">
                    <span>💻</span>
                    <span>Projetos</span>
                </Link>
                <Link to="/formacoes">
                    <span>🎓</span>
                    <span>Formações</span>
                </Link>
                <Link to="/Habilidades">
                    <span>⚡</span>
                    <span>Skills</span>
                </Link>
            </nav>
        </>
    );
}

export { Nav };