module.exports = {
    apps: [
        {
            name: "Portfolio",
            script: "npm start",
        },
        {
            name: "Webhook-portfolio",
            script: "node ./webhooks/rebuild.js",
        },
    ],
};
