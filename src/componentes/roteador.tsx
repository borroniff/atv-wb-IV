import { useState } from 'react';
import BarraNavegacao from './barraNavegacao';
import ListaCliente from './listaCliente';
import FormularioCadastroCliente from './formularioCadastroCliente';
import ListaProdutos from './listaProdutos';
import FormularioCadastroProduto from './formularioCadastroProduto';
import ListaServicos from './listaServicos';
import FormularioCadastroServico from './formularioCadastroServico';
import { Cliente, Produto, Servico } from '../types';

const Roteador = () => {
    // Estados
    const [tela, setTela] = useState<string>("Clientes");
    const [clientes, setClientes] = useState<Cliente[]>([
        {
            id: 1,
            nome: 'João',
            sobrenome: 'Silva',
            cpf: '123.456.789-00',
            telefone: '(11) 9999-9999',
            email: 'joao@email.com',
            endereco: 'Rua A, 123'
        }
    ]);
    const [produtos, setProdutos] = useState<Produto[]>([
        { id: 1, nome: 'Shampoo', preco: 25.9, descricao: 'Shampoo hidratante' }
    ]);
    const [servicos, setServicos] = useState<Servico[]>([
        { id: 1, nome: 'Corte de Cabelo', preco: 60, duracao: '30 min' }
    ]);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
    const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);

    // Navegação
    const selecionarView = (novaTela: string, e: React.MouseEvent) => {
        e.preventDefault();
        setTela(novaTela);
    };

    // CRUD Clientes
    const adicionarCliente = (cliente: Cliente) => {
        if (cliente.id === 0) {
            const novoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
            setClientes([...clientes, { ...cliente, id: novoId }]);
        } else {
            setClientes(clientes.map(c => c.id === cliente.id ? cliente : c));
        }
        setTela('Clientes');
    };

    const excluirCliente = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            setClientes(clientes.filter(c => c.id !== id));
        }
    };

    // CRUD Produtos
    const adicionarProduto = (produto: Produto) => {
        if (produto.id === 0) {
            const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
            setProdutos([...produtos, { ...produto, id: novoId }]);
        } else {
            setProdutos(produtos.map(p => p.id === produto.id ? produto : p));
        }
        setTela('Produtos');
    };

    const excluirProduto = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            setProdutos(produtos.filter(p => p.id !== id));
        }
    };

    // CRUD Serviços
    const adicionarServico = (servico: Servico) => {
        if (servico.id === 0) {
            const novoId = servicos.length > 0 ? Math.max(...servicos.map(s => s.id)) + 1 : 1;
            setServicos([...servicos, { ...servico, id: novoId }]);
        } else {
            setServicos(servicos.map(s => s.id === servico.id ? servico : s));
        }
        setTela('Serviços');
    };

    const excluirServico = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            setServicos(servicos.filter(s => s.id !== id));
        }
    };

    // Renderização condicional
    return (
        <>
            {/* Tela de Clientes */}
            {tela === 'Clientes' && (
                <>
                    <BarraNavegacao
                        tema="purple lighten-4"
                        botoes={['Clientes', 'Cadastros', 'Produtos', 'Serviços']}
                        seletorView={selecionarView}
                    />
                    <ListaCliente
                        tema="purple lighten-4"
                        clientes={clientes}
                        onEdit={(id) => {
                            setClienteEditando(clientes.find(c => c.id === id) || null);
                            setTela('Cadastros');
                        }}
                        onDelete={excluirCliente}
                    />
                </>
            )}

            {/* Tela de Cadastro/Edição de Clientes */}
            {tela === 'Cadastros' && (
                <>
                    <BarraNavegacao
                        tema="purple lighten-4"
                        botoes={['Clientes', 'Cadastros', 'Produtos', 'Serviços']}
                        seletorView={selecionarView}
                    />
                    <FormularioCadastroCliente
                        tema="purple lighten-4"
                        cliente={clienteEditando}
                        onSubmit={adicionarCliente}
                        onCancel={() => setTela('Clientes')}
                    />
                </>
            )}

            {/* Tela de Produtos */}
            {tela === 'Produtos' && (
                <>
                    <BarraNavegacao
                        tema="purple lighten-4"
                        botoes={['Clientes', 'Cadastros', 'Produtos', 'Serviços']}
                        seletorView={selecionarView}
                    />
                    <ListaProdutos
                        tema="purple lighten-4"
                        produtos={produtos}
                        onEdit={(id) => {
                            setProdutoEditando(produtos.find(p => p.id === id) || null);
                            setTela('CadastrosProdutos');
                        }}
                        onDelete={excluirProduto}
                        onAddNew={() => {
                            setProdutoEditando(null);
                            setTela('CadastrosProdutos');
                        }}
                    />
                </>
            )}

            {/* Tela de Cadastro/Edição de Produtos */}
            {tela === 'CadastrosProdutos' && (
                <>
                    <BarraNavegacao
                        tema="purple lighten-4"
                        botoes={['Clientes', 'Cadastros', 'Produtos', 'Serviços']}
                        seletorView={selecionarView}
                    />
                    <FormularioCadastroProduto
                        tema="purple lighten-4"
                        produto={produtoEditando}
                        onSubmit={adicionarProduto}
                        onCancel={() => setTela('Produtos')}
                    />
                </>
            )}

            {/* Tela de Serviços */}
            {tela === 'Serviços' && (
                <>
                    <BarraNavegacao
                        tema="purple lighten-4"
                        botoes={['Clientes', 'Cadastros', 'Produtos', 'Serviços']}
                        seletorView={selecionarView}
                    />
                    <ListaServicos
                        tema="purple lighten-4"
                        servicos={servicos}
                        onEdit={(id) => {
                            setServicoEditando(servicos.find(s => s.id === id) || null);
                            setTela('CadastrosServicos');
                        }}
                        onDelete={excluirServico}
                        onAddNew={() => {
                            setServicoEditando(null);
                            setTela('CadastrosServicos');
                        }}
                    />
                </>
            )}

            {/* Tela de Cadastro/Edição de Serviços */}
            {tela === 'CadastrosServicos' && (
                <>
                    <BarraNavegacao
                        tema="purple lighten-4"
                        botoes={['Clientes', 'Cadastros', 'Produtos', 'Serviços']}
                        seletorView={selecionarView}
                    />
                    <FormularioCadastroServico
                        tema="purple lighten-4"
                        servico={servicoEditando}
                        onSubmit={adicionarServico}
                        onCancel={() => setTela('Serviços')}
                    />
                </>
            )}
        </>
    );
};

export default Roteador;