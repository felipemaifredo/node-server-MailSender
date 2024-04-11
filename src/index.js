require("dotenv").config()
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const express = require("express")
const server = express()
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const port = process.env.PORT || 3000

server.use(bodyParser.urlencoded({ extended: true }))

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass
    }
})

server.get("/", (_req, res) => {
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

server.post("/send-email/:email", (req, res) => {
    const formData = req.body
    const recipientEmail = req.params.email
    let mailBody = "" // Inicializa o corpo do e-mail

    // Verifica se há campos no formulário
    if (Object.keys(formData).length === 0) {
        return res.status(400).json({ message: "Nenhum campo foi enviado." })
    }

    // Itera sobre os campos recebidos no corpo da requisição
    Object.keys(formData).forEach(key => {
        mailBody += `
            <div>
                <p style="color: white"> 
                    <strong>${key}:</strong> ${formData[key]} 
                </p>
            </div>
        `
    })

    const mailOptions = {
        from: `Felipe <${user}>`,
        to: recipientEmail,
        subject: "Novo Contato Recebido!",
        text: formData.message,
        html: `
            <div style="background-color: black">
                ${mailBody}
            </div>
        `
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Erro ao enviar o e-mail:", err)
            return res.status(500).json({ success: false, message: "Erro ao enviar o e-mail." })
        }
        console.log("E-mail enviado:", info.response)
        res.status(200).json({ success: true, message: "E-mail enviado com sucesso!" })
    })
})

server.use((_req, res) => {
    res.status(404).send("Página não encontrada")
})

server.listen(port, () => {
    console.log("Server is running")
})