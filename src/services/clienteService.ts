import { Cliente } from '../types';

const API_URL = "http://localhost:32832";

const formatarCliente = (clienteBackend: any): Cliente => {
    return {
        id: clienteBackend.id,
        nome: clienteBackend.nome,
        sobrenome: clienteBackend.sobreNome || '',
        telefone: clienteBackend.telefones?.length > 0 
            ? `(${clienteBackend.telefones[0].ddd}) ${clienteBackend.telefones[0].numero}`
            : '',
        email: clienteBackend.email || '',
        endereco: clienteBackend.endereco
            ? `${clienteBackend.endereco.rua}, ${clienteBackend.endereco.numero} - ${clienteBackend.endereco.bairro}`
            : '',
        cpf: ''
    };
};

export const ClienteService = {
    async verificarBackend(): Promise<{status: boolean, message?: string}> {
        try {
            const response = await fetch(`${API_URL}/clientes`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                mode: 'cors'
            });

            if (response.ok) {
                return { status: true };
            } else {
                const errorText = await response.text();
                return { 
                    status: false,
                    message: `Backend retornou status ${response.status}: ${errorText || 'Sem mensagem de erro'}`
                };
            }
        } catch (error) {
            return {
                status: false,
                message: `Erro na conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
            };
        }
    },

    async listarClientes(): Promise<Cliente[]> {
        const { status, message } = await this.verificarBackend();
        if (!status) {
            console.error('Falha na conexão com o backend:', message);
            throw new Error('Servidor backend não está disponível');
        }

        try {
            const response = await fetch(`${API_URL}/clientes`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao listar clientes: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            return data.map(formatarCliente);
        } catch (error) {
            console.error('Erro no processamento:', error);
            throw new Error(`Não foi possível carregar os clientes: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    },

    async obterCliente(id: number): Promise<Cliente> {
        try {
            const response = await fetch(`${API_URL}/cliente/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao obter cliente: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            return formatarCliente(data);
        } catch (error) {
            console.error('Erro ao obter cliente:', error);
            throw new Error(`Não foi possível carregar o cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    },

    async cadastrarCliente(cliente: Omit<Cliente, 'id'>): Promise<number> {
        try {
            // Formatação dos dados
            const enderecoParts = cliente.endereco.split(', ');
            const ruaNumero = enderecoParts[1]?.split(' - ') || ['', ''];
            const telefoneMatch = cliente.telefone.match(/\((\d{2})\)\s*(\d{4,5}\d{4})/);

            const payload = {
                nome: cliente.nome,
                sobreNome: cliente.sobrenome,
                email: cliente.email,
                endereco: {
                    estado: '',
                    cidade: '',
                    bairro: ruaNumero[1] || '',
                    rua: enderecoParts[0] || '',
                    numero: ruaNumero[0] || '',
                    codigoPostal: '',
                    informacoesAdicionais: ''
                },
                telefones: telefoneMatch ? [{
                    ddd: telefoneMatch[1],
                    numero: telefoneMatch[2]
                }] : []
            };

            console.log('Enviando payload:', payload);

            const response = await fetch(`${API_URL}/cliente/cadastrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
                mode: 'cors'
            });

            console.log('Resposta do servidor:', response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro detalhado:', errorText);
                throw new Error(errorText || 'Erro ao cadastrar cliente');
            }

            // Obtém o ID do cliente recém-criado
            try {
                const data = await response.json();
                if (data.id) {
                    return data.id;
                }
            } catch (e) {
                console.warn('O servidor não retornou um JSON válido com o ID');
            }

            // Se não conseguir obter o ID da resposta, lista os clientes para encontrar o novo
            const clientes = await this.listarClientes();
            const novoCliente = clientes.find(c => 
                c.nome === cliente.nome && 
                c.email === cliente.email
            );

            if (novoCliente) {
                return novoCliente.id;
            }

            throw new Error('Cliente cadastrado mas não foi possível obter o ID');
        } catch (error) {
            console.error('Erro completo no cadastro:', error);
            throw new Error(`Erro ao cadastrar cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    },

    async atualizarCliente(cliente: Cliente): Promise<void> {
        try {
            const enderecoParts = cliente.endereco.split(', ');
            const ruaNumero = enderecoParts[1]?.split(' - ') || ['', ''];
            const telefoneMatch = cliente.telefone.match(/\((\d{2})\)\s*(\d{4,5}\d{4})/);

            const payload = {
                id: cliente.id,
                nome: cliente.nome,
                sobreNome: cliente.sobrenome,
                email: cliente.email,
                endereco: {
                    estado: '',
                    cidade: '',
                    bairro: ruaNumero[1] || '',
                    rua: enderecoParts[0] || '',
                    numero: ruaNumero[0] || '',
                    codigoPostal: '',
                    informacoesAdicionais: ''
                },
                telefones: telefoneMatch ? [{
                    ddd: telefoneMatch[1],
                    numero: telefoneMatch[2]
                }] : []
            };

            const response = await fetch(`${API_URL}/cliente/atualizar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload),
                mode: 'cors'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Erro ao atualizar cliente');
            }
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw new Error(`Erro ao atualizar cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    },

    async excluirCliente(id: number): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/cliente/excluir`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }),
                mode: 'cors'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Erro ao excluir cliente');
            }
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            throw new Error(`Erro ao excluir cliente: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    },

    // Modo de desenvolvimento offline (apenas para teste)
    async modoOffline(): Promise<boolean> {
        console.warn('Modo offline ativado - usando dados mockados');
        return true;
    }
};