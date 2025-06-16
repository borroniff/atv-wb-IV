import { Servico } from '../types';
import 'materialize-css/dist/css/materialize.min.css';

type Props = {
    tema: string;
    servicos: Servico[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAddNew: () => void;
};

const ListaServicos = ({ tema, servicos, onEdit, onDelete, onAddNew }: Props) => {
    return (
        <div className="container">
            <h5 className="center-align">Serviços</h5>
            <table className="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Duração</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {servicos.map((servico) => (
                        <tr key={servico.id}>
                            <td>{servico.nome}</td>
                            <td>R$ {servico.preco.toFixed(2)}</td>
                            <td>{servico.duracao}</td>
                            <td>
                                <button
                                    onClick={() => onEdit(servico.id)}
                                    className={`btn-small ${tema}`}
                                >
                                    <i className="material-icons">edit</i>
                                </button>
                                <button
                                    onClick={() => onDelete(servico.id)}
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
                <i className="material-icons left">add</i>Novo Serviço
            </button>
        </div>
    );
};

export default ListaServicos;