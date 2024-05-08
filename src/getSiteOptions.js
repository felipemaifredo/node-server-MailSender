function getSiteOptions(req, res) {
    const domain = req.params.domain
    
    // Mapeamento de domínios para configurações
    const siteConfigs = {
        "localhost:3000": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
            siteConfigs: [
                {lang: "pt"}, {classToCss: "ebo"},
            ],
            colors: ["#ff7101", "#fff"],
            products: ["product1", "product2", "product3"]
        },
        "new-ebordados-app-nextjs.vercel.app": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
            siteConfigs: [
                {lang: "pt"}, {classToCss: "ebo"},
            ],
            colors: ["#ff7101", "#fff"],
            products: ["product1", "product2", "product3"]
        },
        "localhost:3001": {
            logo: "https://embforlife.com/src/images/embforlife_logo.png",
            siteConfigs: [
                {lang: "en"}, {classToCss: "emb"},
            ],
            colors: ["#ff00ff", "#00ffff"],
            products: ["product7", "product8", "product9"]
        },
        "new-ebordados-app-nextjs-7ly8.vercel.app": {
            logo: "https://embforlife.com/src/images/embforlife_logo.png",
            siteConfigs: [
                {lang: "en"}, {classToCss: "emb"},
            ],
            colors: ["#ff00ff", "#00ffff"],
            products: ["product7", "product8", "product9"]
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