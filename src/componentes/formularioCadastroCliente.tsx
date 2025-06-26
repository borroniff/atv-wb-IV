import { useState, useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Cliente } from '../types';

type Props = {
    tema: string;
    cliente?: Cliente | null;
    onSubmit: (cliente: Cliente) => void;
    onCancel: () => void;
};

const FormularioCadastroCliente = ({ tema, cliente, onSubmit, onCancel }: Props) => {
    const [formData, setFormData] = useState<Omit<Cliente, 'id'>>({
        nome: '',
        sobrenome: '',
        telefone: '',
        email: '',
        endereco: '',
        cpf: ''
    });

    useEffect(() => {
        if (cliente) {
            setFormData({
                nome: cliente.nome,
                sobrenome: cliente.sobrenome,
                telefone: cliente.telefone,
                email: cliente.email,
                endereco: cliente.endereco,
                cpf: cliente.cpf || ''
            });
        }
        M.updateTextFields();
    }, [cliente]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: cliente?.id || 0,
            ...formData
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="col s12">
                <h5 className="center-align">
                    {cliente ? 'Editar Cliente' : 'Cadastrar Cliente'}
                </h5>

                <div className="row">
                    <div className="input-field col s6">
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            value={formData.nome}
                            onChange={handleChange}
                            className="validate"
                            required
                        />
                        <label htmlFor="nome">Nome</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                            id="sobrenome"
                            name="sobrenome"
                            type="text"
                            value={formData.sobrenome}
                            onChange={handleChange}
                            className="validate"
                            required
                        />
                        <label htmlFor="sobrenome">Sobrenome</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input
                            id="telefone"
                            name="telefone"
                            type="tel"
                            value={formData.telefone}
                            onChange={handleChange}
                            className="validate"
                            required
                            placeholder="(99) 99999-9999"
                        />
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="validate"
                            required
                        />
                        <label htmlFor="email">E-mail</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="endereco"
                            name="endereco"
                            type="text"
                            value={formData.endereco}
                            onChange={handleChange}
                            className="validate"
                            required
                            placeholder="Rua, Número - Bairro"
                        />
                        <label htmlFor="endereco">Endereço</label>
                    </div>
                </div>

                <div className="row center-align">
                    <button
                        type="submit"
                        className={`btn waves-effect waves-light ${tema}`}
                    >
                        {cliente ? 'Atualizar' : 'Cadastrar'}
                        <i className="material-icons right">send</i>
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn waves-effect waves-light grey"
                        style={{ marginLeft: '10px' }}
                    >
                        Cancelar
                        <i className="material-icons right">cancel</i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroCliente;