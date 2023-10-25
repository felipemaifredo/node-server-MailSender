const nodemailer = require('nodemailer');
require('dotenv').config();

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

const sendEmail = async (formData, recipientEmail) => {
    let { name, email, message } = formData;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: user,
            pass: pass,
        }
    });

    const mailOptions = ({
        from: `Felipe <${user}>`,
        to: recipientEmail,
        subject: 'Novo Contato Recebito!',
        text: message,
        html: `<P>a Pessoa ${name}, enviou: ${message}, o email dele é: ${email}<p>`
    });

    try {
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: 'E-mail enviado com sucesso!'
        };
    } catch(err) {
        return {
            success: false,
            message: `Erro ao enviar o e-mail. ${err}`
        }; 
    }
}

module.exports = sendEmail;
