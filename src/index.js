const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config()
const user = process.env.DB_USER
const pass = process.env.DB_PASS

const server = express()
server.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

const sendEmail = async (formData, recipientEmail) => {
    let { name, email, message } = formData
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: user,
            pass: pass,
        }
    })

    const mailOptions = ({
        from: `Felipe <${user}>`,
        to: recipientEmail,
        subject: 'Novo Contato Recebito!',
        text: message,
        html: `<P style="color: red">a Pessoa ${name}, enviou: ${message}, o email dele é: ${email}<p>`
    })

    try {
        await transporter.sendMail(mailOptions)
        return {
            success: true,
            message: 'E-mail enviado com sucesso!'
        }
    } catch(err) {
        return {
            success: false,
            message: `Erro ao enviar o e-mail. ${err}`
        } 
    }
}

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

server.post('/send-email/:email', (req, res) => {
    let formData = req.body
    let recipientEmail = req.params.email
    sendEmail(formData, recipientEmail).then(message => {
            res.status(200).send(message) 
        }).catch(err => {
            res.status(500).send(err)
        })
})

server.listen(port, () => {
    console.log('Server is running')
})