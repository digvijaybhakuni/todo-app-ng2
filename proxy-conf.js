const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/many",
            "/endpoints",
            "/i",
            "/need",
            "/proxy"
        ],
        target: "http://localhost:3000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;