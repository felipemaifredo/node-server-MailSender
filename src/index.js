const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./sendEmail');
require('dotenv').config();

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    return res.json({mensagem: 'Server is running!'})
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

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});