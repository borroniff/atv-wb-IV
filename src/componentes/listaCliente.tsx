import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';

type Props = {
    tema: string,
    clientes: Array<{
        id: number,
        nome: string,
        email: string,
        telefone: string
    }>,
    onEdit: (id: number) => void,
    onDelete: (id: number) => void,
    onAddNew: () => void
}

export default class ListaCliente extends Component<Props> {
    render() {
        const { tema, clientes, onEdit, onDelete, onAddNew } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s10">
                        <h5>Clientes Cadastrados</h5>
                    </div>
                    <div className="col s2">
                        <button className={`btn ${tema}`} onClick={onAddNew}
                                style={{marginTop: '20px'}}>
                            <i className="material-icons left">add</i>Novo
                        </button>
                    </div>
                </div>

                {clientes.length === 0 ? (
                    <div className="center-align">Nenhum cliente cadastrado</div>
                ) : (
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
                            {clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>
                                        <button onClick={() => onEdit(cliente.id)}
                                                className={`btn-small ${tema}`}>
                                            <i className="material-icons">edit</i>
                                        </button>
                                        <button onClick={() => onDelete(cliente.id)}
                                                className="btn-small red" style={{marginLeft: '5px'}}>
                                            <i className="material-icons">delete</i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}