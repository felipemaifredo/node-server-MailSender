const credenciais = {
    email: 'usuario@example.com',
    password: 'senha123'
}

function verifyUser(req, res) {
    const { email, password } = req.body
    // Verificar se o email e a senha fornecidos correspondem às credenciais
    if (email === credenciais.email && password === credenciais.password) {
        // Se as credenciais estiverem corretas, retornar um status de sucesso
        res.status(200).json({
            valid: true,
            message: "Usuário válido",
            user: {
                id: "123456",
                name: "exemplo_usuario",
                email: "exemplo@email.com"
            }
        })
    } else {
        // Se as credenciais estiverem incorretas, retornar um status de erro
        res.status(401).json({ valid: false, message: "Credenciais inválidas" })
    }
}

module.exports = verifyUser