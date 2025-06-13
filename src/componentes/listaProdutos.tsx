import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';

type Produto = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
};

type Props = {
    tema: string;
    produtos: Produto[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAddNew: () => void;
};

export default class ListaProdutos extends Component<Props> {
    render() {
        const { tema, produtos, onEdit, onDelete, onAddNew } = this.props;

        return (
            <div className="container">
                <h5 className="center-align">Produtos</h5>
                <table className="highlight">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map(produto => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>R$ {produto.preco.toFixed(2)}</td>
                                <td>{produto.descricao}</td>
                                <td>
                                    <button onClick={() => onEdit(produto.id)} 
                                            className={`btn-small ${tema}`}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                    <button onClick={() => onDelete(produto.id)} 
                                            className="btn-small red">
                                        <i className="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={onAddNew} className={`btn ${tema}`} style={{marginTop: '20px'}}>
                    Novo Produto
                </button>
            </div>
        );
    }
}