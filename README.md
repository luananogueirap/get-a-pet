# 🐾 Get A Pet

Interface web para uma plataforma de adoção de animais. O objetivo é conectar pessoas interessadas em adotar um pet a quem deseja disponibilizar um animal para adoção.

O frontend foi desenvolvido com React e possui telas para cadastro de usuários, login, edição de perfil, gerenciamento de pets e acompanhamento de adoções. A comunicação com o servidor é feita por requisições HTTP usando Axios.

## Funcionalidades previstas na interface

- Consultar a listagem de pets e identificar animais disponíveis ou já adotados.
- Visualizar fotos, idade, peso, cor e dados do responsável por um pet.
- Cadastrar uma conta e acessar a tela de login.
- Editar informações do perfil e selecionar uma foto.
- Cadastrar e editar pets com múltiplas imagens e pré-visualização.
- Consultar e excluir os próprios pets cadastrados.
- Solicitar uma visita a um pet, acompanhar adoções e acionar a conclusão de uma adoção.
- Receber mensagens temporárias de sucesso ou erro.

Esses fluxos dependem das respostas e validações da API. A ação de solicitar uma visita não possui seleção de data ou horário na interface atual.

## Tecnologias utilizadas

| Tecnologia | Papel no projeto |
| --- | --- |
| React | Construção das telas a partir de componentes e gerenciamento do estado da interface. |
| JavaScript e JSX | Implementação da lógica e da estrutura visual dos componentes. |
| React Router DOM v5 | Navegação entre páginas com `BrowserRouter`, `Switch` e `Route`. |
| Axios | Requisições HTTP para a API de usuários e pets. |
| Context API | Compartilhamento do estado de autenticação e das ações de cadastro, login e logout. |
| CSS Modules | Estilos associados aos componentes por arquivos `.module.css`. |
| EventEmitter (`events`) | Comunicação entre a lógica que emite avisos e o componente que os exibe. |
| Create React App / react-scripts | Scripts de desenvolvimento, build e execução do test runner. |

## Organização das pastas

```text
get-a-pet-main/
├── backend/                    
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   │   └── img/
│   │   │       └── logo.png
│   │   ├── components/
│   │   │   ├── form/
│   │   │   ├── layout/
│   │   │   └── pages/
│   │   │       ├── auth/
│   │   │       ├── Pet/
│   │   │       ├── User/
│   │   │       ├── Home.js
│   │   │       └── Home.module.css
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── .gitignore
├── README.md


### `frontend/` — aplicação executada no navegador

Reúne a interface e suas configurações. O `package.json` declara dependências e comandos; o `package-lock.json` registra a resolução das dependências. A pasta `node_modules/`, criada na instalação, contém as bibliotecas e é ignorada pelo Git.

### `frontend/public/` — arquivos públicos

Contém o `index.html`, documento base no qual o React monta a aplicação, e o `favicon.ico`, ícone da aba do navegador.

### `frontend/src/` — código da interface

O `index.js` monta o React no elemento `root` do HTML e envolve a aplicação com `BrowserRouter`. O `App.js` reúne o provedor de autenticação, menu, mensagens, área de conteúdo, rotas e rodapé. O `index.css` define estilos globais.

### `frontend/src/assets/img/` — imagens da aplicação

Armazena o logotipo usado no menu. As fotos de usuários e pets são carregadas de endereços do servidor; não ficam nesta pasta.

### `frontend/src/components/form/` — formulários reutilizáveis

- `Input.js`: campo com rótulo, configurável para texto, senha, número ou arquivo.
- `Select.js`: lista de opções usada na escolha da cor do pet.
- `PetForm.js`: formulário compartilhado pelo cadastro e pela edição de pets. Controla nome, idade, peso, cor e imagens, incluindo a pré-visualização dos arquivos selecionados.
- Arquivos `.module.css`: estilos dos campos e formulários.

O `PetForm` recebe a função de envio por propriedade. Assim, a mesma estrutura visual atende tanto à criação quanto à atualização de um pet.

### `frontend/src/components/layout/` — estrutura compartilhada

- `Navbar.js`: menu que muda conforme o estado de autenticação.
- `Footer.js`: rodapé da aplicação.
- `Container.js`: área principal que recebe o conteúdo das páginas.
- `Message.js`: exibição de mensagens temporárias de sucesso ou erro, ocultadas após cerca de três segundos.
- `RoundedImage.js`: componente de imagem com estilo reutilizável.

### `frontend/src/components/pages/` — telas da aplicação

O `Home.js` consulta a API e apresenta os cards dos pets, com foto, nome, peso e indicação de disponibilidade.

| Subpasta | Arquivos e responsabilidades |
| --- | --- |
| `auth/` | `Register.js` coleta os dados de cadastro; `Login.js` contém a interface de acesso. |
| `User/` | `Profile.js` consulta o usuário e permite editar nome, e-mail, telefone, senha e imagem. |
| `Pet/` | `AddPet.js` envia um novo cadastro; `EditPet.js` carrega e atualiza um pet; `MyPets.js` lista os pets do usuário e oferece edição, exclusão e conclusão da adoção; `MyAdoptions.js` consulta suas adoções; `PetDetails.js` apresenta detalhes e permite solicitar uma visita. |

### `frontend/src/context/` — autenticação compartilhada

O `UserContext.js` cria o contexto e o `UserProvider`. Ele disponibiliza `authenticated`, `register`, `login` e `logout` para componentes como o menu e as páginas de autenticação, evitando passar essas informações manualmente por vários níveis de componentes.

### `frontend/src/hooks/` — lógica reutilizável

- `useAuth.js`: concentra as chamadas de cadastro e login, salva o token recebido em `localStorage`, mantém o estado de autenticação e implementa o logout.
- `useFlashMessage.js`: oferece a função `setFlashMessage`, que emite mensagens para exibição na interface.

### `frontend/src/utils/` — recursos de apoio

- `api.js`: cria uma instância do Axios com endereço base `http://localhost:5000`.
- `bus.js`: cria uma instância compartilhada de `EventEmitter`, usada para transmitir o evento `flash` até o componente `Message`.

## Como a aplicação funciona

### Inicialização e navegação

Ao abrir a aplicação, `index.js` renderiza `App.js`. O `UserProvider` disponibiliza o estado de autenticação, e o React Router escolhe qual página exibir a partir da URL. Menu, mensagens e rodapé permanecem na estrutura compartilhada.

### Comunicação com a API

O fluxo básico é:

```text
Interação do usuário → página ou hook → Axios → API
                                              ↓
Atualização da interface ← estado do React ← resposta
```

Por exemplo, a página inicial executa `GET /pets`, guarda a lista recebida no estado `pets` e usa essa lista para montar os cards.

### Cadastro e autenticação

O formulário de cadastro reúne os dados e chama `register` pelo contexto. O hook envia os dados à API e, em caso de sucesso, armazena o token recebido, atualiza o estado de autenticação e redireciona para a página inicial. A lógica de login segue uma ideia semelhante, mas o formulário de login possui uma pendência descrita adiante.

Ao recarregar a aplicação, `useAuth` procura o token salvo e configura o cabeçalho `Authorization: Bearer <token>`. Diversas páginas também enviam esse cabeçalho explicitamente. No logout, o token é removido e o estado é atualizado.

A presença de um token no navegador controla o estado visual; a validação do token e das permissões depende do servidor.

### Cadastro de pets e imagens

O usuário preenche `PetForm` e seleciona imagens. A pré-visualização usa `URL.createObjectURL`. As páginas de cadastro e edição organizam os dados em `FormData` e enviam uma requisição `multipart/form-data` à API. Depois de uma resposta de sucesso, o usuário é encaminhado para a listagem dos próprios pets.

### Fluxo de adoção

O fluxo previsto começa na consulta dos pets. A pessoa abre os detalhes e, estando autenticada na interface, solicita uma visita. A tela “My Adoptions” consulta os pets associados às suas adoções. Em “My Pets”, o responsável pode acionar a conclusão quando o pet está disponível e possui um interessado identificado pelo campo `adopter`.

O servidor precisa persistir essas alterações e verificar quem pode executar cada ação. A tela “My Adoptions” atualmente apresenta um texto fixo de adoção em andamento.

## Rotas da interface

| Rota | Tela |
| --- | --- |
| `/` | Listagem de pets |
| `/register` | Cadastro de usuário |
| `/login` | Login |
| `/user/profile` | Edição do perfil |
| `/pet/mypets` | Pets cadastrados pelo usuário |
| `/pet/myadoptions` | Adoções do usuário |
| `/pet/add` | Cadastro de pet |
| `/pet/edit/:id` | Edição de pet |
| `/pet/:id` | Detalhes e solicitação de visita |

O parâmetro `:id` representa o identificador do pet.

## Endpoints utilizados pelo frontend

Esta tabela descreve as chamadas encontradas no código, não uma API validada nesta cópia.

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| POST | `/users/register` | Cadastrar usuário |
| POST | `/users/login` | Autenticar usuário |
| GET | `/users/checkuser` | Consultar o usuário autenticado |
| PATCH | `/users/edit/:id` | Atualizar perfil |
| GET | `/pets` | Listar pets |
| GET | `/pets/:id` | Consultar um pet |
| GET | `/pets/mypets` | Consultar pets do usuário |
| GET | `/pets/myadoptions` | Consultar adoções do usuário |
| POST | `/pets/create` | Cadastrar pet |
| PATCH | `/pets/:id` | Atualizar pet |
| DELETE | `/pets/:id` | Excluir pet |
| PATCH | `/pets/schedule/:id` | Solicitar visita |
| PATCH | `/pets/conclude/:id` | Concluir adoção |

## Como executar o frontend

É necessário ter Node.js e npm instalados em versões compatíveis com as dependências do projeto.

1. Na raiz do projeto, instale as dependências:

   ```bash
   cd frontend
   npm install
   ```

2. Crie o arquivo `frontend/.env.local` com o endereço usado para carregar as imagens dos pets:

   ```env
   REACT_APP_API=http://localhost:5000
   ```

3. Inicie a aplicação dentro de `frontend/`:

   ```bash
   npm start
   ```

4. Acesse [http://localhost:3000](http://localhost:3000).

A API precisa estar disponível em `http://localhost:5000` para os fluxos com dados. Não há comando de inicialização do backend nesta cópia, pois seu código não está incluído.

A variável `REACT_APP_API` é utilizada nas imagens dos pets. O endereço do Axios em `src/utils/api.js` e o endereço da imagem de perfil em `Profile.js` estão fixos no código; mudar apenas a variável não altera esses dois pontos. Reinicie o servidor de desenvolvimento após alterar variáveis de ambiente.

### Scripts disponíveis

| Comando, dentro de `frontend/` | Função |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção em `frontend/build/`. |
| `npm test` | Inicia o test runner configurado pelo react-scripts. Não foram encontrados testes próprios no código analisado. |

## Pendências identificadas na leitura do código

- Incluir o backend e validar a integração completa.
- Conectar o `onSubmit` do formulário em `Login.js` à função `handleSubmit`, que já existe no componente.
- Ajustar a chamada de conclusão de adoção em `MyPets.js`: a configuração de cabeçalhos está no segundo argumento de `api.patch`, posição destinada ao corpo da requisição.
- Estabilizar a referência de `setFlashMessage`, usada como dependência de efeitos em algumas páginas, para evitar novas consultas a cada renderização.
- Implementar tratamento consistente de sessão inválida e acesso às telas autenticadas. Atualmente, as rotas em `App.js` não possuem um componente de proteção.
- Centralizar os endereços da API e das imagens na configuração de ambiente.

Esta documentação foi elaborada por inspeção dos arquivos. Não representa uma validação por execução, build ou testes de ponta a ponta.

## Conceitos presentes no projeto

O código reúne exemplos de componentização, reutilização de formulários, estado com hooks, Context API, navegação no frontend, consumo de API, envio de arquivos e comunicação de feedback ao usuário. A separação entre páginas, componentes, hooks e utilitários ajuda a localizar responsabilidades e facilita a manutenção.
