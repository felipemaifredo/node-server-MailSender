const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()
const { validationResult, check } = require('express-validator')

const user = process.env.DB_USER
const pass = process.env.DB_PASS

const server = express()
server.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass
    }
})

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
    `
    res.send(htmlContent)
})

server.post('/send-email/:email', [
    check('name').notEmpty().withMessage('O campo nome é obrigatório'),
    check('email').isEmail().withMessage('Informe um e-mail válido'),
    check('message').notEmpty().withMessage('O campo mensagem é obrigatório')
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const formData = req.body
    const recipientEmail = req.params.email

    const mailOptions = {
        from: `Felipe <${user}>`,
        to: recipientEmail,
        subject: 'Novo Contato Recebido!',
        text: formData.message,
        html: `
            <div style="background-color: black">
                <p style="color: white">
                    A pessoa ${formData.name}, enviou: ${formData.message}, o email dela é: ${formData.email}
                </p>
            </div>
        `
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Erro ao enviar o e-mail:', err)
            return res.status(500).json({ success: false, message: 'Erro ao enviar o e-mail.' })
        }
        console.log('E-mail enviado:', info.response)
        res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' })
    })
})

server.use((req, res) => {
    res.status(404).send('Página não encontrada')
})

server.listen(port, () => {
    console.log('Server is running')
})