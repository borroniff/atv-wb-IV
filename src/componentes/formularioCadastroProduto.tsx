import { useState, useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import { Produto } from '../types';

type Props = {
    tema: string;
    produto?: Produto | null;
    onSubmit: (produto: Produto) => void;
    onCancel: () => void;
};

const FormularioCadastroProduto = ({ tema, produto, onSubmit, onCancel }: Props) => {
    const [nome, setNome] = useState(produto?.nome || '');
    const [preco, setPreco] = useState(produto?.preco.toString() || '');
    const [descricao, setDescricao] = useState(produto?.descricao || '');

    useEffect(() => {
        M.updateTextFields();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id: produto?.id || 0,
            nome,
            preco: parseFloat(preco),
            descricao
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="col s12">
                <h5 className="center-align">
                    {produto ? 'Editar Produto' : 'Cadastrar Produto'}
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
                        <label htmlFor="nome">Nome do Produto</label>
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
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <textarea
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="materialize-textarea"
                        />
                        <label htmlFor="descricao">Descrição</label>
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
                        {produto ? 'Atualizar' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroProduto;