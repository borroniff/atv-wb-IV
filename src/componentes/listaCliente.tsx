import { Cliente } from '../types';
import 'materialize-css/dist/css/materialize.min.css';

type Props = {
    tema: string;
    clientes: Cliente[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
};

const ListaCliente = ({ tema, clientes, onEdit, onDelete }: Props) => {
    return (
        <div className="container">
            <h5 className="center-align">Clientes Cadastrados</h5>
            <table className="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome} {cliente.sobrenome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>
                                <button
                                    onClick={() => onEdit(cliente.id)}
                                    className={`btn-small ${tema}`}
                                >
                                    <i className="material-icons">edit</i>
                                </button>
                                <button
                                    onClick={() => onDelete(cliente.id)}
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
        </div>
    );
};

export default ListaCliente;