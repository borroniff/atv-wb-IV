import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaCliente from "./listaCliente";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import ListaProdutos from "./listaProdutos";
import FormularioCadastroServico from "./formularioCadastroServico";
import ListaServicos from "./listaServicos";
import M from 'materialize-css';

type Cliente = {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    telefone: string;
    email: string;
    endereco: string;
};

type Produto = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
};

type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracao: string;
};

type State = {
    tela: string;
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
    clienteEditando: Cliente | null;
    produtoEditando: Produto | null;
    servicoEditando: Servico | null;
};

export default class Roteador extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: 'Clientes',
            clientes: [
                {
                    id: 1,
                    nome: 'João',
                    sobrenome: 'Silva',
                    cpf: '123.456.789-00',
                    telefone: '(11) 9999-9999',
                    email: 'joao@email.com',
                    endereco: 'Rua A, 123'
                }
            ],
            produtos: [
                { id: 1, nome: 'Shampoo', preco: 25.90, descricao: 'Shampoo hidratante' }
            ],
            servicos: [
                { id: 1, nome: 'Corte de Cabelo', preco: 60.00, duracao: '30 min' }
            ],
            clienteEditando: null,
            produtoEditando: null,
            servicoEditando: null
        };
    }

    componentDidMount() {
        M.AutoInit();
    }

    selecionarView = (novaTela: string, evento: React.MouseEvent) => {
        evento.preventDefault();
        this.setState({ tela: novaTela });
    };

    // ========= CLIENTES =========
    adicionarCliente = (cliente: Omit<Cliente, 'id'>) => {
        this.setState(prev => {
            const novoId = prev.clientes.length > 0 
                ? Math.max(...prev.clientes.map(c => c.id)) + 1 
                : 1;
            
            return {
                clientes: [...prev.clientes, { ...cliente, id: novoId }],
                tela: 'Clientes'
            };
        });
        M.toast({ html: 'Cliente cadastrado!' });
    };

    editarCliente = (clienteAtualizado: Cliente) => {
        this.setState(prev => ({
            clientes: prev.clientes.map(c => 
                c.id === clienteAtualizado.id ? clienteAtualizado : c
            ),
            clienteEditando: null,
            tela: 'Clientes'
        }));
        M.toast({ html: 'Cliente atualizado!' });
    };

    excluirCliente = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            this.setState(prev => ({
                clientes: prev.clientes.filter(c => c.id !== id)
            }));
            M.toast({ html: 'Cliente excluído!' });
        }
    };

    // ========= CRUD PRODUTOS =========
adicionarProduto = (produto: Omit<Produto, 'id'>) => {
    this.setState(prev => ({
        produtos: [...prev.produtos, {
            ...produto,
            id: prev.produtos.length > 0 ? Math.max(...prev.produtos.map(p => p.id)) + 1 : 1
        }],
        tela: 'Produtos'
    }));
};

editarProduto = (produtoAtualizado: Produto) => {
    this.setState(prev => ({
        produtos: prev.produtos.map(p => 
            p.id === produtoAtualizado.id ? produtoAtualizado : p
        ),
        produtoEditando: null,
        tela: 'Produtos'
    }));
};

excluirProduto = (id: number) => {
    if (window.confirm('Excluir este produto?')) {
        this.setState(prev => ({
            produtos: prev.produtos.filter(p => p.id !== id)
        }));
    }
};

// ========= CRUD SERVIÇOS ========= 
adicionarServico = (servico: Omit<Servico, 'id'>) => {
    this.setState(prev => ({
        servicos: [...prev.servicos, {
            ...servico,
            id: prev.servicos.length > 0 ? Math.max(...prev.servicos.map(s => s.id)) + 1 : 1
        }],
        tela: 'Serviços'
    }));
};

editarServico = (servicoAtualizado: Servico) => {
    this.setState(prev => ({
        servicos: prev.servicos.map(s => 
            s.id === servicoAtualizado.id ? servicoAtualizado : s
        ),
        servicoEditando: null,
        tela: 'Serviços'
    }));
};

excluirServico = (id: number) => {
    if (window.confirm('Excluir este serviço?')) {
        this.setState(prev => ({
            servicos: prev.servicos.filter(s => s.id !== id)
        }));
    }
};
    render() {
        const { tela, clientes, produtos, servicos, clienteEditando, produtoEditando, servicoEditando } = this.state;
        const barraNavegacao = <BarraNavegacao 
            seletorView={this.selecionarView} 
            tema="purple lighten-4" 
            botoes={['Clientes', 'Cadastros', 'Produtos', 'Serviços']} 
        />;

        switch (tela) {
            case 'Clientes':
                return (
                    <>
                        {barraNavegacao}
                        <ListaCliente 
                            tema="purple lighten-4"
                            clientes={clientes}
                            onEdit={(id) => this.setState({
                                clienteEditando: clientes.find(c => c.id === id) || null,
                                tela: 'Cadastros'
                            })}
                            onDelete={this.excluirCliente}
                            onAddNew={() => this.setState({
                                clienteEditando: null,
                                tela: 'Cadastros'
                            })}
                        />
                    </>
                );

            case 'Cadastros':
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroCliente 
                            tema="purple lighten-4"
                            cliente={clienteEditando}
                            onSubmit={clienteEditando ? this.editarCliente : this.adicionarCliente}
                            onCancel={() => this.setState({ tela: 'Clientes' })}
                        />
                    </>
                );

            case 'Produtos':
                return (
                    <>
                        {barraNavegacao}
                        <ListaProdutos 
                            tema="purple lighten-4"
                            produtos={this.state.produtos}
                            onEdit={(id: number) => {
                                const produto = this.state.produtos.find(p => p.id === id);
                                this.setState({
                                    produtoEditando: produto || null,
                                    tela: 'CadastrosProdutos'
                                });
                            }}
                            onDelete={(id: number) => this.excluirProduto(id)}
                            onAddNew={() => this.setState({
                                produtoEditando: null,
                                tela: 'CadastrosProdutos'
                            })}
                        />
                    </>
                );
            case 'CadastrosProdutos':
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroProduto 
                            tema="purple lighten-4"
                            produto={produtoEditando}
                            onSubmit={produtoEditando ? this.editarProduto : this.adicionarProduto}
                            onCancel={() => this.setState({ tela: 'Produtos' })}
                        />
                    </>
                );

            case 'Serviços':
                return (
                    <>
                        {barraNavegacao}
                        <ListaServicos 
                            tema="purple lighten-4"
                            servicos={this.state.servicos}
                            onEdit={(id) => this.setState({
                                servicoEditando: this.state.servicos.find(s => s.id === id) || null,
                                tela: 'CadastrosServicos'
                            })}
                            onDelete={(id) => this.excluirServico(id)}
                            onAddNew={() => this.setState({
                                servicoEditando: null,
                                tela: 'CadastrosServicos'
                            })}
                        />
                    </>
                );

            case 'CadastrosServicos':
                return (
                    <>
                        {barraNavegacao}
                        <FormularioCadastroServico 
                            tema="purple lighten-4"
                            servico={this.state.servicoEditando}
                            onSubmit={this.state.servicoEditando ? this.editarServico : this.adicionarServico}
                            onCancel={() => this.setState({ tela: 'Serviços' })}
                        />
                    </>
                );

            default:
                return (
                    <>
                        {barraNavegacao}
                        <div className="container">
                            <h5 className="center-align">Página não encontrada</h5>
                        </div>
                    </>
                );
        }
    }
}