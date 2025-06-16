export interface Cliente {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    telefone: string;
    email: string;
    endereco: string;
}

export interface Produto {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
}

export interface Servico {
    id: number;
    nome: string;
    preco: number;
    duracao: string;
}