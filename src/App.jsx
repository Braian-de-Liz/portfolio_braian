import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Projetos } from './pages/projetos'; 
import { Formacoes } from './pages/formacoes';
import { Habilidades } from './pages/habilidades';
import './App.css';

function Home() {
    return (
        <>
            <header id="cabelho">
                <h1 className="titulo">Braian de Liz</h1>
                <h3 className="subtitulo">Desenvolvedor .js</h3>
            </header>
            <main>
                <section id="sobre">
                    <div className="eu">
                        <img src="/ASSETS/imagens/Braian-Terno.jpg" alt="Braian" className='imge'/>
                        <div>
                            <h2 className="subtitulo">Sobre Mim</h2>
                            <p>Eu sou Braian de Liz da Silva, estudante da Escola SESI de Referência Joinville...</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

function App() {
    return (
        <Router>
            <div className="App">
                <Nav />
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projetos" element={<Projetos />} />
                    <Route path="/formacoes" element={<Formacoes />} />
                    <Route path="/Habilidades" element={<Habilidades />} />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
}

export default App;