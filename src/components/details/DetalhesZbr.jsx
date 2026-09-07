function DetalhesZbr() {
    return (
        <div className="detalhes-arquitetura">
            <div className="detalhes-secao">
                <h4>Validação Matemática Real</h4>
                <p>
                    Cada método calcula dígitos verificadores via módulo 11, seguindo os padrões oficiais do governo brasileiro.
                    Não é regex — é matemática. Sequências inválidas como <code>00000000000</code> ou <code>11111111111</code> são bloqueadas.
                </p>
            </div>

            <div className="detalhes-secao">
                <h4>Métodos Disponíveis</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Método</th>
                            <th>Documento</th>
                            <th>Validação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>zbr.cpf()</code></td>
                            <td>CPF (Pessoa Física)</td>
                            <td>Dígito verificador mod 11 + bloqueio de sequências</td>
                        </tr>
                        <tr>
                            <td><code>zbr.cnpj()</code></td>
                            <td>CNPJ (Pessoa Jurídica)</td>
                            <td>Validação matemática completa + normalização</td>
                        </tr>
                        <tr>
                            <td><code>zbr.rg()</code></td>
                            <td>RG (Identidade)</td>
                            <td>7-9 chars, <code>X</code> apenas no final</td>
                        </tr>
                        <tr>
                            <td><code>zbr.cep()</code></td>
                            <td>CEP (Código Postal)</td>
                            <td>Exatamente 8 dígitos, rejeita repetições</td>
                        </tr>
                        <tr>
                            <td><code>zbr.tel()</code></td>
                            <td>Telefone</td>
                            <td>DDDs válidos (Anatel), 9º dígito obrigatório</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="detalhes-secao">
                <h4>Destaques Técnicos</h4>
                <ul>
                    <li>Zero dependências runtime — tudo embutido na lib</li>
                    <li>Dual build: ESM + CommonJS + declarações de tipo (.d.ts)</li>
                    <li>Normalização automática: máscaras como <code>123.456.789-09</code> são limpas no output</li>
                    <li>Mensagens de erro opcionais em cada método</li>
                    <li>Compatível com React Hook Form, Fastify, NestJS, Next.js, Express</li>
                    <li>Publicado no NPM como <code>br_standards_with_zod</code> (MIT)</li>
                </ul>
            </div>
        </div>
    );
}

export { DetalhesZbr };
