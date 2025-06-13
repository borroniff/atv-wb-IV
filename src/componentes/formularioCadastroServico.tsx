import { Component } from "react";
import M from 'materialize-css';

type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracao: string;
};

type Props = {
    tema: string;
    servico?: Servico | null;
    onSubmit: (servico: Servico) => void;
    onCancel: () => void;
};

type State = {
    nome: string;
    preco: string;
    duracao: string;
};

export default class FormularioCadastroServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.servico?.nome || '',
            preco: props.servico?.preco.toString() || '',
            duracao: props.servico?.duracao || ''
        };
    }

    componentDidMount() {
        M.updateTextFields();
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const novoServico = {
            id: this.props.servico?.id || 0,
            nome: this.state.nome,
            preco: parseFloat(this.state.preco),
            duracao: this.state.duracao
        };
        this.props.onSubmit(novoServico);
    };

    render() {
        const { tema, onCancel } = this.props;
        const { nome, preco, duracao } = this.state;

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="col s12">
                    <h5 className="center-align">
                        {this.props.servico ? 'Editar Serviço' : 'Cadastrar Serviço'}
                    </h5>
                    
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="nome" name="nome" type="text" 
                                   value={nome} onChange={this.handleChange}
                                   className="validate" required />
                            <label htmlFor="nome">Nome do Serviço</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input id="preco" name="preco" type="number" 
                                   value={preco} onChange={this.handleChange}
                                   className="validate" required 
                                   min="0.01" step="0.01" />
                            <label htmlFor="preco">Preço (R$)</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="duracao" name="duracao" type="text" 
                                   value={duracao} onChange={this.handleChange}
                                   className="validate" required />
                            <label htmlFor="duracao">Duração (minutos)</label>
                        </div>
                    </div>

                    <div className="row center-align">
                        <button className={`btn waves-effect waves-light ${tema}`} type="submit">
                            {this.props.servico ? 'Atualizar' : 'Cadastrar'}
                            <i className="material-icons right">send</i>
                        </button>
                        <button type="button" onClick={onCancel}
                                className="btn waves-effect waves-light grey" style={{marginLeft: '10px'}}>
                            Cancelar
                            <i className="material-icons right">cancel</i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}