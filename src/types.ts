export interface Cliente {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    email: string;
    endereco: string;
    cpf?: string; // Campo opcional (não existe no backend)
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