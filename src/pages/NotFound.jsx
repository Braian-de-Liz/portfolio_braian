import { Link } from 'react-router-dom';
import { Cena3D } from '../components/cenas/Cena3D';
import { cenaGloboPerdido } from '../components/cenas/cenas';

function NotFound() {
    return (
        <main>
            <section className="cont notfound">
                <Cena3D montar={cenaGloboPerdido} className="cena-3d-404" />
                <p className="notfound-code">404</p>
                <h1 className="titulo">Página não encontrada</h1>
                <p className="notfound-texto">
                    O endereço que você tentou acessar não existe ou foi movido.
                </p>
                <div className="sobre-cta-wrap">
                    <Link to="/" className="pagina-boton">Voltar ao início</Link>
                </div>
            </section>
        </main>
    );
}

export { NotFound };
