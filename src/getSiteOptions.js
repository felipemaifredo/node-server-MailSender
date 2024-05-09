function getSiteOptions(req, res) {
    const domain = req.params.domain
    
    // Mapeamento de domínios para configurações
    const siteConfigs = {
        "localhost:3000": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
            siteConfigs:{
                lang: "pt", classToCss: "ebo",
            },
            colors: {
                primary: { key: '--c-primary', color: '#ff8531' },
                secondary: { key: '--c-secondary', color: '#0069d9' },
                third: { key: '--c-third', color: '#9f9d96' },
                fourty: { key: '--c-fourty', color: '#f0efe9' },
                fifty: { key: '--c-fifty', color: '#f0efe9' },
                sixty: { key: '--c-sixty', color: '#000' },
                seventy: { key: '--c-seventy', color: '#000' }
            },
            products: ["product1", "product2", "product3"]
        },
        "new-ebordados-app-nextjs.vercel.app": {
            logo: "https://e-bordados.net/assets/images/e-bordados.png",
            siteConfigs: {
                lang: "pt", classToCss: "ebo",
            },
            colors: {
                primary: { key: '--c-primary', color: '#ff8531' },
                secondary: { key: '--c-secondary', color: '#0069d9' },
                third: { key: '--c-third', color: '#9f9d96' },
                fourty: { key: '--c-fourty', color: '#f0efe9' },
                fifty: { key: '--c-fifty', color: '#f0efe9' },
                sixty: { key: '--c-sixty', color: '#000' },
                seventy: { key: '--c-seventy', color: '#000' }
            },
            products: ["product1", "product2", "product3"]
        },
        "localhost:3001": {
            logo: "https://embforlife.com/src/images/embforlife_logo.png",
            siteConfigs: {
                lang: "en", classToCss: "emb",
            },
            colors: {
                primary: { key: '--c-primary', color: '#0069d9' },
                secondary: { key: '--c-secondary', color: '#ff8531' },
                third: { key: '--c-third', color: '#9f9d96' },
                fourty: { key: '--c-fourty', color: '#f0efe9' },
                fifty: { key: '--c-fifty', color: '#f0efe9' },
                sixty: { key: '--c-sixty', color: '#000' },
                seventy: { key: '--c-seventy', color: '#000' }
            },
            products: ["product7", "product8", "product9"]
        },
        "new-ebordados-app-nextjs-7ly8.vercel.app": {
            logo: "https://embforlife.com/src/images/embforlife_logo.png",
            siteConfigs: {
                lang: "en", classToCss: "emb",
            },
            colors: {
                primary: { key: '--c-primary', color: '#0069d9' },
                secondary: { key: '--c-secondary', color: '#ff8531' },
                third: { key: '--c-third', color: '#9f9d96' },
                fourty: { key: '--c-fourty', color: '#f0efe9' },
                fifty: { key: '--c-fifty', color: '#f0efe9' },
                sixty: { key: '--c-sixty', color: '#000' },
                seventy: { key: '--c-seventy', color: '#000' }
            },
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