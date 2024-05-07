function getSiteOptions(req, res) {
    const domain = req.params.domain
    
    // Mapeamento de domínios para configurações
    const siteConfigs = {
        "localhost:3000": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
            colors: ["#ff7101", "#fff"],
            products: ["product1", "product2", "product3"]
        },
        "new-ebordados-app-nextjs.vercel.app": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
            colors: ["#ff7101", "#fff"],
            products: ["product4", "product5", "product6"]
        },
        "localhost:3001": {
            logo: "https://embforlife.com/src/images/embforlife_logo.png",
            colors: ["#ff00ff", "#00ffff"],
            products: ["product7", "product8", "product9"]
        },
        "new-ebordados-app-nextjs-7ly8.vercel.app": {
            logo: "https://embforlife.com/src/images/embforlife_logo.png",
            colors: ["#000000", "#ffffff"],
            products: ["product10", "product11", "product12"]
        }
    }

    // Verifica se o domínio está mapeado
    if (domain in siteConfigs) {
        return siteConfigs[domain]
    } else {
        // Domínio não encontrado
        return { error: "Dominio não encontrado" }
    }
}

module.exports = getSiteOptions