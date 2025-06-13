import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css';

type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracao: string;
};

type Props = {
    tema: string;
    servicos: Servico[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAddNew: () => void;
};

export default class ListaServicos extends Component<Props> {
    render() {
        const { tema, servicos, onEdit, onDelete, onAddNew } = this.props;

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
                        {servicos.map(servico => (
                            <tr key={servico.id}>
                                <td>{servico.nome}</td>
                                <td>R$ {servico.preco.toFixed(2)}</td>
                                <td>{servico.duracao}</td>
                                <td>
                                    <button onClick={() => onEdit(servico.id)} 
                                            className={`btn-small ${tema}`}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                    <button onClick={() => onDelete(servico.id)} 
                                            className="btn-small red" style={{marginLeft: '5px'}}>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="fixed-action-btn">
                    <button onClick={onAddNew} 
                            className={`btn-floating btn-large ${tema}`}>
                        <i className="large material-icons">add</i>
                    </button>
                </div>
            </div>
        );
    }
}