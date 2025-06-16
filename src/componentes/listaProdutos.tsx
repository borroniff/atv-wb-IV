import { Produto } from '../types';
import 'materialize-css/dist/css/materialize.min.css';

type Props = {
    tema: string;
    produtos: Produto[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAddNew: () => void;
};

const ListaProdutos = ({ tema, produtos, onEdit, onDelete, onAddNew }: Props) => {
    return (
        <div className="container">
            <h5 className="center-align">Produtos</h5>
            <table className="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.nome}</td>
                            <td>R$ {produto.preco.toFixed(2)}</td>
                            <td>{produto.descricao}</td>
                            <td>
                                <button
                                    onClick={() => onEdit(produto.id)}
                                    className={`btn-small ${tema}`}
                                >
                                    <i className="material-icons">edit</i>
                                </button>
                                <button
                                    onClick={() => onDelete(produto.id)}
                                    className="btn-small red"
                                    style={{ marginLeft: '5px' }}
                                >
                                    <i className="material-icons">delete</i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={onAddNew}
                className={`btn ${tema}`}
                style={{ marginTop: '20px' }}
            >
                <i className="material-icons left">add</i>Novo Produto
            </button>
        </div>
    );
};

export default ListaProdutos;