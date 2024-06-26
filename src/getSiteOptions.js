function getSiteOptions(req, res) {
    const domain = req.params.domain
    
    // Mapeamento de domínios para configurações
    const siteConfigs = {
        "localhost:3000": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
            colors: {
                primary: { key: "--c-primary", color: "#fd6f03" },
                secondary: { key: "--c-secondary", color: "#3479b8" },
                third: { key: "--c-third", color: "#0069d9" },
                fourty: { key: "--c-fourty", color: "#9f9d96" },
                fifty: { key: "--c-fifty", color: "#f0efe9" },
            }
        },
        "localhost:3001": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
            colors: {
                primary: { key: "--c-primary", color: "#fd6f03" },
                secondary: { key: "--c-secondary", color: "#ff8531" },
                third: { key: "--c-third", color: "#9f9d96" },
                fourty: { key: "--c-fourty", color: "#9f9d96" },
                fifty: { key: "--c-fifty", color: "#f0efe9" },
            }
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