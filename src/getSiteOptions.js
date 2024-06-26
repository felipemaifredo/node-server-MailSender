function getSiteOptions(req, res) {
    const domain = req.params.domain
    
    // Mapeamento de domínios para configurações
    const siteConfigs = {
        "localhost:3000": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
        },
        "new-ebordados-app-nextjs.vercel.app": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
        },
    }

    // Verifica se o domínio está mapeado
    if (domain in siteConfigs) {
        return res.status(200).json({ success: true, siteOptions: siteConfigs[domain] })
        
    } else {
        // Domínio não encontrado
        return res.status(500).json({ success: false, error: "Dominio não encontrado" })
    }
}

module.exports = getSiteOptions