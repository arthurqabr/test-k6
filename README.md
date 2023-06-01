# test-k6

## Descrição

Testes de API de Performance, Carga, Stress e Smoke utilizando K6 para automação.

Todos os testes já rodam em CI (basta acessar no Github a aba "Actions", e também são gerados relatórios com uma boa visualização dos resultados da execução.

# :hammer: Para executar os testes:

## Existem duas formas:

1. Executar os testes individuais:

Vá para o diretório "scripts" utilizando `$ cd scripts`

Execute `$ k6 run "nome_do_arquivo.js"`

A execução será realizada via terminal e, ao finalizar, será gerado um relatório .html no diretório "metrics".

<img width="235" alt="image" src="https://github.com/arthurqabr/test-k6/assets/96924797/291b7155-3cd4-44ef-b1ea-f5c2ce39bed8">


2. Executar todos os testes de uma vez:

Na raíz do projeto, execute `$npm test` e todos os testes serão executados. Ao finalizar, o relatório individual será gerado no diretório ˜metrics".

## Exemplo de relatório:

<img width="1440" alt="image" src="https://github.com/arthurqabr/test-k6/assets/96924797/6b2862d5-3d0e-4a16-84da-67be8bea75d9">
