const express = require('express');
// const fetch = require('node-fetch');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3001/healthcheck');
        const data = await response.text();
        const { stdout } = await exec('pm2 ls | grep -q packages || pm2 start');
        console.log(stdout);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
    res.json({ status: 'ok' });
});

app.get('/host', async (req, res) => {
    const response = await fetch('http://localhost:3001/quicktunnel');
    const data = await response.json();
    res.set('Content-Type', 'text/plain');
    res.send(data.hostname);
});

app.get('/api/:name', async (req, res) => {
    const response = await fetch(`http://localhost:3001/${req.params.name}`);
    const data = await response.text();
    res.send(data);
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

