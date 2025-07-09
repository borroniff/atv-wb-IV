# Sistema de Gerenciamento de Clientes - World Beauty (ATVIV-WB)

Este é um sistema **front-end** desenvolvido em React e TypeScript como parte da Atividade Prática ATVIV-WB para o Grupo World Beauty. O sistema permite o gerenciamento de clientes através de uma interface gráfica que se comunica com um back-end RESTful desenvolvido em Java.

---

## ✅ Funcionalidades

* **CRUD completo de clientes** (integrado com back-end Java):
  - Listagem de todos os clientes
  - Cadastro de novos clientes
  - Edição de clientes existentes
  - Exclusão de clientes

* **Gerenciamento local de produtos e serviços**:
  - Cadastro, edição e exclusão de produtos
  - Cadastro, edição e exclusão de serviços

* **Interface amigável** com Materialize CSS:
  - Navegação intuitiva
  - Formulários validados
  - Feedback visual claro

---

## 🚀 Como executar o projeto

### Pré-requisitos:
1. Node.js (versão 16 ou superior)
2. Java 17+ (para executar o back-end)
3. Back-end em execução (wbbackend.jar)

### Passos para execução:

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/borroniff/atv-wb-IV
   ```

2. **Inicie o back-end Java**:
   ```bash
   cd backend\executavel
   java -jar wbbackend.jar
   ```

3. **Instale as dependências**:
   ```bash
   cd atv-wb-IV
   npm install
   ```

4. **Inicie o front-end**:
   ```bash
   npm start
   ```

5. **Acesse no navegador**:
   ```
   http://localhost:3000
   ```

---

## 🛠 Estrutura do projeto
```bash
src/
├── componentes/
│   ├── barraNavegacao.tsx      # Componente de navegação
│   ├── formularioCadastroCliente.tsx  # Formulário de cliente
│   ├── formularioCadastroProduto.tsx  # Formulário de produto
│   ├── formularioCadastroServico.tsx  # Formulário de serviço
│   ├── listaCliente.tsx        # Listagem de clientes
│   ├── listaProdutos.tsx       # Listagem de produtos
│   ├── listaServicos.tsx       # Listagem de serviços
│   └── roteador.tsx            # Gerenciamento de rotas
├── services/
│   └── clienteService.ts       # Serviço para comunicação com o back-end
├── types.ts            # Tipos TypeScript
├── index.tsx           # Ponto de entrada da aplicação
└── ...                 # Outros arquivos de configuração
```

---

## 🔌 Integração com o Back-end

O front-end se comunica com o back-end através dos seguintes endpoints:

- `GET /clientes` - Lista todos os clientes
- `GET /cliente/[id]` - Obtém um cliente específico
- `POST /cliente/cadastrar` - Cadastra um novo cliente
- `PUT /cliente/atualizar` - Atualiza um cliente existente
- `DELETE /cliente/excluir` - Remove um cliente

**Observação**: Os módulos de produtos e serviços são gerenciados localmente no front-end como demonstração.

---

## 🧪 Tecnologias utilizadas

- **Front-end**:
  - React 18
  - TypeScript
  - Materialize CSS
  - Axios (para requisições HTTP)

- **Back-end**:
  - Java 17+
  - Serviço RESTful

---

## 👨‍💻 Desenvolvido por
Angelina Borroni Ferreira  
