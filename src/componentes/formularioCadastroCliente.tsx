import { Component } from "react";
import M from 'materialize-css';

type Props = {
    tema: string,
    cliente?: {
        id: number,
        nome: string,
        sobrenome: string,
        cpf: string,
        telefone: string,
        email: string,
        endereco: string
    } | null,
    onSubmit: (cliente: any) => void,
    onCancel: () => void
}

type State = {
    nome: string,
    sobrenome: string,
    cpf: string,
    telefone: string,
    email: string,
    endereco: string
}

export default class FormularioCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            nome: props.cliente?.nome || '',
            sobrenome: props.cliente?.sobrenome || '',
            cpf: props.cliente?.cpf || '',
            telefone: props.cliente?.telefone || '',
            email: props.cliente?.email || '',
            endereco: props.cliente?.endereco || ''
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
        const novoCliente = {
            ...this.state,
            id: this.props.cliente?.id || Math.floor(Math.random() * 10000)
        };
        this.props.onSubmit(novoCliente);
    };

    render() {
        const { tema, onCancel } = this.props;
        const { nome, sobrenome, cpf, telefone, email, endereco } = this.state;

        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="col s12">
                    <h5 className="center-align">
                        {this.props.cliente ? 'Editar Cliente' : 'Cadastrar Cliente'}
                    </h5>
                    
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="nome" name="nome" type="text" 
                                   value={nome} onChange={this.handleChange}
                                   className="validate" required />
                            <label htmlFor="nome">Nome</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="sobrenome" name="sobrenome" type="text" 
                                   value={sobrenome} onChange={this.handleChange}
                                   className="validate" required />
                            <label htmlFor="sobrenome">Sobrenome</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input id="cpf" name="cpf" type="text" 
                                   value={cpf} onChange={this.handleChange}
                                   className="validate" required />
                            <label htmlFor="cpf">CPF</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="telefone" name="telefone" type="tel" 
                                   value={telefone} onChange={this.handleChange}
                                   className="validate" required />
                            <label htmlFor="telefone">Telefone</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input id="email" name="email" type="email" 
                                   value={email} onChange={this.handleChange}
                                   className="validate" required />
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="endereco" name="endereco" type="text" 
                                   value={endereco} onChange={this.handleChange}
                                   className="validate" required />
                            <label htmlFor="endereco">Endereço</label>
                        </div>
                    </div>

                    <div className="row center-align">
                        <button className={`btn waves-effect waves-light ${tema}`} type="submit">
                            {this.props.cliente ? 'Atualizar' : 'Cadastrar'}
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