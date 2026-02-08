import { Link } from 'react-router-dom'; 

function Nav() {
    return (
        <nav id="barrasup">
            <ul className="nav-links">
                <li><Link to="/">inicio</Link></li>
                <li><Link to="/projetos">Projetos</Link></li>
                <li><Link to="/formacoes">Formações</Link></li>
                <li><Link to="/Habilidades">Habilidades</Link></li>
            </ul>
        </nav>
    );
}

export { Nav };