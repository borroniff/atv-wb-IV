// src/types.ts
export interface IProduto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
}

export interface IListaProdutosProps {
    tema: string;
    produtos: IProduto[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onAddNew: () => void;
}

export type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracao: string;
};