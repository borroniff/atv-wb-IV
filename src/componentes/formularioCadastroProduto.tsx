import { Component } from "react";
import M from 'materialize-css';

type Produto = {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
};

type Props = {
    tema: string;
    produto?: Produto | null;  // Aceita undefined OU null
    onSubmit: (produto: Produto) => void;
    onCancel: () => void;
};

type State = {
    nome: string;
    preco: string;
    descricao: string;
};

export default class FormularioCadastroProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.produto?.nome || '',
            preco: props.produto?.preco.toString() || '',
            descricao: props.produto?.descricao || ''
        };
    }

    componentDidMount() {
        M.updateTextFields();
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<State, keyof State>);
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onSubmit({
            id: this.props.produto?.id || 0,
            nome: this.state.nome,
            preco: parseFloat(this.state.preco),
            descricao: this.state.descricao
        });
    };

    render() {
        const { tema, onCancel } = this.props;
        const { nome, preco, descricao } = this.state;

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h5>{this.props.produto ? 'Editar Produto' : 'Novo Produto'}</h5>
                    
                    <div className="input-field">
                        <input id="nome" type="text" name="nome" value={nome} onChange={this.handleChange} required />
                        <label htmlFor="nome">Nome</label>
                    </div>

                    <div className="input-field">
                        <input id="preco" type="number" name="preco" value={preco} 
                               onChange={this.handleChange} step="0.01" min="0" required />
                        <label htmlFor="preco">Preço (R$)</label>
                    </div>

                    <div className="input-field">
                        <textarea id="descricao" name="descricao" value={descricao} 
                                  onChange={this.handleChange} className="materialize-textarea" />
                        <label htmlFor="descricao">Descrição</label>
                    </div>

                    <div className="center-align">
                        <button type="button" onClick={onCancel} className="btn grey">
                            Cancelar
                        </button>
                        <button type="submit" className={`btn ${tema}`} style={{marginLeft: '10px'}}>
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}