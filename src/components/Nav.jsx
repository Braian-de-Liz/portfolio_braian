import { Link } from 'react-router-dom';
import { HouseIcon, CodeIcon, BookOpenIcon, ZapIcon } from './Icons';

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
                    <HouseIcon />
                    <span>Início</span>
                </Link>
                <Link to="/projetos">
                    <CodeIcon />
                    <span>Projetos</span>
                </Link>
                <Link to="/formacoes">
                    <BookOpenIcon />
                    <span>Formações</span>
                </Link>
                <Link to="/Habilidades">
                    <ZapIcon />
                    <span>Skills</span>
                </Link>
            </nav>
        </>
    );
}

export { Nav };