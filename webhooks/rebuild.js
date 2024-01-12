const { exec } = require("child_process");
const { createServer } = require("http");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const util = require("util");

const nextConfig = require("../next.config");
const pm2Config = require("../ecosystem.config"); // pm2 config !required
require("dotenv").config({
    path: path.join(__dirname, "./hooks.env"),
});

// Use environment variable for the server port or default to 7000
const port = process.env.PORT || 7000;

const file = "webhook_path";
const regex = /^\/webhook.*/g;

// Use environment variable for the build command or default
const pm2ReloadCmd = `pm2 reload ${pm2Config.apps[0].name}`;
const buildCmd = process.env.BUILD_COMMAND || "npm run build";
const disDir = nextConfig.distDir ? nextConfig.distDir : ".next";
const clearDistCmd = `rm -rf ${path.join(__dirname, "..", disDir)}`;

// Store a secret key for generating unique URLs
const secretKey = process.env.SECRET_KEY || "your-secret-key";

let SECRET_URL;

async function generateSecretUrl() {
    try {
        const fd = await fs.open(path.join(__dirname, file), "a+");

        const data = await fs.readFile(fd);
        const oneTimeGeneratedWebhookPath = data.toString();

        if (
            oneTimeGeneratedWebhookPath == "" ||
            !regex.test(oneTimeGeneratedWebhookPath)
        ) {
            const timestamp = Date.now().toString();
            const signature = crypto
                .createHmac("sha256", secretKey)
                .update(timestamp)
                .digest("hex");

            // Construct the secret URL with the generated token
            const secretUrl = `/webhook?timestamp=${timestamp}&signature=${signature}`;
            await fd.write(secretUrl);
            SECRET_URL = secretUrl;
        } else {
            SECRET_URL = oneTimeGeneratedWebhookPath;
        }

        fd.close();
    } catch (e) {
        throw e;
    }
}

async function asyncExecCommand(command) {
    try {
        return await util.promisify(exec)(command);
    } catch (e) {
        console.error(`Build process error: ${e.message}`);
        throw e;
    }
}

const server = createServer(async (req, res) => {
    // Validate the request method
    if (req.method !== "POST") {
        res.statusCode = 405;
        res.end("Method Not Allowed");
        return;
    }
    const url = new URL(req.url, `http://localhost:${port}`);

    if (url.pathname + url.search !== SECRET_URL) {
        req.statusCode = 404;
        res.end("Invalid Path");
        return;
    }

    // Execute the build command
    try {
        // Prismic will issue another request -- need to acknowledge the request
        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(
            JSON.stringify({
                job: { state: "PENDING", createdAt: 1705071697641 },
            }),
        );

        const { stderr: clearDir } = await asyncExecCommand(clearDistCmd);
        const { stdout: buildOut, stderr: buildErr } =
            await asyncExecCommand(buildCmd);
        const { stdout: deployOut, stderr: deployErr } =
            await asyncExecCommand(pm2ReloadCmd);
    } catch (e) {
        res.statusCode = 500;
        return res.end("Internal Server Error");
    }
});

server.listen(port, async () => {
    await generateSecretUrl();
    console.log(`Server running on http://localhost:${port}`);
});
