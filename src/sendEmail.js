require("dotenv").config()
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass
    }
})

function sendEmail(req, res) {
    const formData = req.body
    const recipientEmail = req.params.email
    let mailBody = "" // Inicializa o corpo do e-mail

    // Verifica se há campos no formulário
    if (Object.keys(formData).length === 0) {
        return res.status(400).json({ 
            success: false,
            message: "Nenhum campo foi enviado." 
        })
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
            return res.status(500).json({ 
                success: false,
                message: "Erro ao enviar o e-mail." 
            })
        }
        console.log("E-mail enviado:", info.response)
        res.status(200).json({ 
            success: true, 
            message: "E-mail enviado com sucesso!" 
        })
    })
}

module.exports = sendEmail