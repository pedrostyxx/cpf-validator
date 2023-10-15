# API de Validação de CPF

Esta é uma API simples em Node.js para validar CPFs brasileiros. A API inclui limitação de taxa de solicitação e fornece informações sobre o estado associado a um CPF válido.

Teste a api clicando [Aqui](http://api.styxx.online/validate-cpf/CPF_AQUI)

## Instalação

Certifique-se de ter o Node.js instalado. Clone o repositório e execute o seguinte comando na pasta do projeto:

    npm install express body-parser express-rate-limit

## Uso

1.  Execute o servidor usando o seguinte comando:

`node app.js` 

2.  Acesse a API em `http://localhost:3000/validate-cpf/:cpf` substituindo `:cpf` pelo CPF que você deseja validar.

## Limitação de Taxa de Solicitação

A API possui uma limitação de taxa de solicitação que permite apenas 5 solicitações a cada 2 segundos.

## Rotas

### GET /validate-cpf/:cpf

Valida o CPF fornecido e retorna informações sobre o estado associado.

Parâmetros de URL:

-   `:cpf` - O CPF que você deseja validar.

Exemplo de resposta:

json

`{
    "isValid": true,
    "state": "São Paulo"
}` 

## Funções de Validação

A API inclui funções para validar se um CPF é válido e identificar o estado associado ao CPF.

## Dependências

-   express
-   body-parser
-   express-rate-limit

Certifique-se de instalar as dependências necessárias antes de executar a API.

## Contribuição

Sinta-se à vontade para contribuir para este projeto.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
