Documentação do Servidor de Envio de E-mails
Introdução
O servidor de envio de e-mails é uma aplicação Node.js que permite enviar e-mails usando o serviço do Gmail. Ele fornece uma rota HTTP para enviar e-mails com dados de um formulário HTML.

Como Usar
Configuração do Ambiente
Certifique-se de ter as seguintes variáveis de ambiente configuradas:

DB_USER: O usuário do Gmail que será usado para autenticação SMTP.
DB_PASS: A senha do usuário do Gmail.
Instalação das Dependências
Antes de iniciar o servidor, instale as dependências necessárias executando o seguinte comando:

npm install

Iniciar o Servidor
Para iniciar o servidor, execute o seguinte comando:

npm start

O servidor será iniciado na porta definida pela variável de ambiente PORT, ou na porta 3000 se não estiver definida.

Enviar um E-mail
Para enviar um e-mail, faça uma solicitação POST para a rota /send-email/:email, onde :email é o endereço de e-mail do destinatário.

Requisição HTTP

POST /send-email/:email

Corpo da Requisição
Envie os seguintes campos no corpo da requisição:

name: Nome do remetente.
email: Endereço de e-mail do remetente.
message: Mensagem a ser enviada.

Exemplo de Requisição cURL

curl -X POST http://localhost:3000/send-email/example@example.com -d "name=John&email=john@example.com&message=Olá, este é um teste de e-mail!"

Respostas
Se o e-mail for enviado com sucesso, você receberá uma resposta 200 OK com o seguinte corpo:

{
    "success": true,
    "message": "E-mail enviado com sucesso!"
}

Se ocorrer um erro durante o envio do e-mail, você receberá uma resposta 500 Internal Server Error com uma mensagem de erro específica:

{
    "success": false,
    "message": "Erro ao enviar o e-mail. [mensagem de erro]"
}

Considerações Finais
Este é um servidor simples para envio de e-mails. Certifique-se de configurar corretamente as variáveis de ambiente e garantir a segurança das credenciais do Gmail. Além disso, lembre-se de validar os dados de entrada do usuário antes de enviar e-mails para evitar possíveis ataques.