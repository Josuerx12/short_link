# Short Link

Bem-vindo ao monorepo **Short Link**! Este projeto é composto por dois serviços: `short_link` (gerenciamento de URLs) e `short_link_visits` (gerenciamento de visitas).

Este `README` te guiará passo a passo na configuração e execução do projeto.

Arquitetura utilizada `Domain Driven Design` - Projeto principal.

Collection do postman: https://drive.google.com/file/d/1YC7vJ3aWwgnotMCjCSfMC1DjY9mDGWKK/view?usp=sharing

---

### 🚀 Como Rodar o Projeto

Siga estes passos para ter o projeto rodando localmente.

#### 1. Configurar as Variáveis de Ambiente e instalar dependencias

Crie arquivos `.env` em ambos os diretórios de projeto (`short_link` e `short_link_visits`) e preencha as variáveis de ambiente necessárias.
Rodar yarn install em cada pasta do projeto.

#### 2. Iniciar os Serviços

Na raiz do repositório, execute o script de inicialização para subir os containers do banco de dados (PostgreSQL, MongoDB e Redis).

**Bash**

```
./start.sh
```

#### 3. Configurar o Banco de Dados

Com os serviços de banco de dados rodando, navegue até a pasta do projeto `short_link` e execute os comandos abaixo para criar as tabelas e usuários padrão.

- **Migrar o banco de dados:**
  **Bash**

  ```
  yarn migrate:ts up
  ```

- **Criar usuários padrão:**
  **Bash**

  ```
  yarn seed:ts up
  ```

> O usuário padrão criado para testes é:
>
> - **Login:**`jcdevvv@gmail.com`
> - **Senha:**`123456`

---

### 📝 Documentação e Testes

#### Documentação da API

Acesse a documentação de cada projeto navegando para a URL da API seguida de `/docs`.

- **Short Link:**`{{url_do_projeto_short_link}}/docs`
- **Short Link Visits:**`{{url_do_projeto_short_link_visits}}/docs`

#### Executar Testes Unitários

Para rodar os testes unitários, basta executar o seguinte comando dentro da pasta **`short_link`**:

**Bash**

```
yarn test
```

> **Nota:** No momento, os testes unitários só estão disponíveis no projeto `short_link`.

---

### ⚙️ Rotas da API

As rotas da API estão detalhadas na coleção do Postman fornecida, mas as principais rotas são:

#### Autenticação e Usuários

- `POST {{url}}/auth/sign-in`

  - **Body:**
    **JSON**

    ```
    {
      "login": "jcdevvv@gmail.com",
      "password": "123456"
    }
    ```

- `POST {{url}}/users` (Para criar um novo usuário)

  - **Body:**
    **JSON**

    ```
    {
      "name": "Josué",
      "email": "jcdev@gmail.com",
      "password": "123456"
    }
    ```

#### Gerenciamento de URLs

`POST {{url}}/urls` (Cria uma nova URL encurtada)

- **Body:**
  **JSON**

  ```
  {
    "originalUrl": "https://google.com"
  }
  ```

`DELETE {{url}}/urls/:id` (Deleta uma URL)

`GET {{url}}/urls` (Lista URLs com paginação e filtros)

- Filtros, paginação podem ser aplicados via query parameter `filter, perPage, page, sort, sortDir`, utilizando o código da URL encurtada ou parte da URL original.

* `GET {{url}}/urls/:id` (Detalhes de uma URL específica, incluindo as visitas)
* Para se redirecionar para uma url encurtada bastar colocar no seu navegador de preferencia a `{{url da sua api}}/redirect/:code` com isso vai contar como uma visita.

---

### 💡 Pontos de Melhoria

A seguir estão alguns pontos de melhoria que não foram implementados por restrições de tempo, mas que seriam valiosos para o projeto:

- **Separação de Módulos**: Em vez de ter um único serviço de visitas de URL, uma melhoria seria isolar o cadastro e a autenticação de usuários em um serviço dedicado. Isso evitaria que a lógica de autenticação do frontend fosse quebrada e proporcionaria uma arquitetura mais modular.
- **Cobertura de Testes**: Adicionar uma cobertura de testes unitários mais completa para todas as funcionalidades.
- **Monitoramento e Rastreamento**: Integrar ferramentas de rastreamento distribuído como **Jaeger** e **OpenTelemetry** para melhor observabilidade do sistema e rastreamento de requisições entre os serviços.
- **Padronização de Erros**: Adicionar um _pipe_ de validação para formatar os erros de validação em um objeto padronizado, em vez de retornar um array de erros, melhorando a comunicação com o frontend.
- **Dockerização Completa**: Criar um arquivo `docker-compose` para rodar todas as aplicações (não apenas os bancos de dados) em containers, eliminando a necessidade de scripts de inicialização manuais.

---

### 🔴 Como Finalizar os Containers

Para fechar os bancos de dados de forma segura, volte ao terminal onde você executou o `./start.sh` e pressione `Ctrl + C`. Isso encerrará todos os containers sem perda de dados.
