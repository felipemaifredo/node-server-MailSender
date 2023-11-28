const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./sendEmail');
require('dotenv').config();

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000

server.get('/', (req, res) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Meu Servidor</title>
            </head>
            <body>
                <h1>Bem-vindo ao meu servidor!</h1>
                <p>O servidor está funcionando corretamente.</p>
            </body>
        </html>
    `;
    res.send(htmlContent);
})

server.post('/send-email/:email', (req, res) => {
    let formData = req.body;
    let recipientEmail = req.params.email;
    sendEmail(formData, recipientEmail).then(message => {
            res.status(200).send(message); 
        }).catch(err => {
            res.status(500).send(err);
        });
});

server.listen(port, () => {
    console.log('Server is running');
});