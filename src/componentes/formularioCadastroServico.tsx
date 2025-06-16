import { useState, useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Servico } from '../types';

type Props = {
    tema: string;
    servico?: Servico | null;
    onSubmit: (servico: Servico) => void;
    onCancel: () => void;
};

const FormularioCadastroServico = ({ tema, servico, onSubmit, onCancel }: Props) => {
    const [nome, setNome] = useState(servico?.nome || '');
    const [preco, setPreco] = useState(servico?.preco.toString() || '');
    const [duracao, setDuracao] = useState(servico?.duracao || '');

    useEffect(() => {
        M.updateTextFields();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: servico?.id || 0,
            nome,
            preco: parseFloat(preco),
            duracao
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="col s12">
                <h5 className="center-align">
                    {servico ? 'Editar Serviço' : 'Cadastrar Serviço'}
                </h5>

                <div className="row">
                    <div className="input-field col s12">
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="validate"
                            required
                        />
                        <label htmlFor="nome">Nome do Serviço</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input
                            id="preco"
                            type="number"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            className="validate"
                            required
                            min="0.01"
                            step="0.01"
                        />
                        <label htmlFor="preco">Preço (R$)</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                            id="duracao"
                            type="text"
                            value={duracao}
                            onChange={(e) => setDuracao(e.target.value)}
                            className="validate"
                            required
                        />
                        <label htmlFor="duracao">Duração</label>
                    </div>
                </div>

                <div className="row center-align">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn grey"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`btn ${tema}`}
                        style={{ marginLeft: '10px' }}
                    >
                        {servico ? 'Atualizar' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroServico;