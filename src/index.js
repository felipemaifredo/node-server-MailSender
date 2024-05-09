const sendEmail = require("./sendEmail")
const getSiteOptions = require("./getSiteOptions")
require("dotenv").config()
const bodyParser = require("body-parser")
const express = require("express")
const server = express()

const port = process.env.PORT || 3000

server.use(bodyParser.urlencoded({ extended: true }))

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

server.post("/send-email/:email", sendEmail)
server.get("/ebordados-next/get-side-options/:domain", getSiteOptions)

server.use((_req, res) => {
    res.status(404).send("Página não encontrada")
})

server.listen(port, () => {
    console.log("Server is running")
})