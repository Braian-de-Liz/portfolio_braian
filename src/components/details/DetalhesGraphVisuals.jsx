function DetalhesGraphVisuals() {
    return (
        <div className="detalhes-arquitetura">
            <div className="detalhes-secao">
                <h4>Princípios</h4>
                <ul>
                    <li>
                        <strong>O agente fica isolado.</strong> O CLI sobe com o executável original, no
                        diretório do projeto, sem argumentos, flags ou variáveis extras. Só o que você
                        digita chega ao processo, e a IDE não lê nem reaproveita as conversas.
                    </li>
                    <li>
                        <strong>O grafo é só visualização.</strong> A saída do Graphify fica no cache do
                        app, fora do projeto, e nunca entra no contexto dos agentes.
                    </li>
                    <li>
                        <strong>A atividade é observada, não interceptada.</strong> O brilho vem do File
                        Watcher, ou seja, de gravações em disco. Leituras do agente não aparecem, de
                        propósito.
                    </li>
                    <li>
                        <strong>Arquivos só dentro do projeto.</strong> Todo caminho que chega ao backend
                        é canonicalizado e validado contra a raiz do projeto aberto.
                    </li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Arquitetura</h4>
                <div className="tabela-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Camada</th>
                                <th>Responsabilidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rust (Tauri 2)</td>
                                <td>Raiz do projeto, leitura e gravação, File Watcher, Git, execução do Graphify e sessões PTY</td>
                            </tr>
                            <tr>
                                <td>Web Worker</td>
                                <td>Layout do grafo, fora da thread da interface</td>
                            </tr>
                            <tr>
                                <td>three.js</td>
                                <td>Grafo em um THREE.Points com shader próprio e uma camada aditiva só para o brilho</td>
                            </tr>
                            <tr>
                                <td>React 19</td>
                                <td>Interface, com stores mínimos em useSyncExternalStore</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="detalhes-secao">
                <h4>Decisões</h4>
                <ul>
                    <li>
                        <strong>Layout por comunidades.</strong> Os centros das comunidades se organizam por
                        forças (Fruchterman–Reingold) com escala diferente em cada eixo, para o grafo não
                        virar esfera nem disco.
                    </li>
                    <li>
                        <strong>O grafo não pula ao atualizar.</strong> Nós que já existiam ficam presos à
                        posição anterior; nós novos nascem perto dos vizinhos.
                    </li>
                    <li>
                        <strong>Terminal que não reinicia.</strong> Cada sessão mantém um único xterm.js
                        vivo; mudar a janela de lugar só move o elemento.
                    </li>
                    <li>
                        <strong>Salvamento sem atropelar o agente.</strong> A gravação compara a data de
                        modificação do arquivo e não sobrescreve uma alteração feita por fora.
                    </li>
                    <li>
                        <strong>Leve.</strong> Sem Electron, sem servidor HTTP e sem banco: instalador de
                        2 a 3 MB e executável de cerca de 5 MB.
                    </li>
                </ul>
            </div>

            <div className="detalhes-secao">
                <h4>Estado</h4>
                <ul>
                    <li>Versão alpha 0.1.0, licença MIT</li>
                    <li>Testado no Windows 10 e 11; macOS e Linux ainda sem teste</li>
                    <li>Próximos passos: busca no conteúdo dos arquivos, abas no editor e testes com 5.000+ nós</li>
                </ul>
            </div>
        </div>
    );
}

export { DetalhesGraphVisuals };
