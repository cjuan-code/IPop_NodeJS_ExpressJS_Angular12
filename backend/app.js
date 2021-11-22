const client = require('prom-client');
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

const port = process.env.PORT || 4000;


const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const counterHomeEndpoint = new client.Counter({
    name: 'counterHomeEndpoint',
    help: 'The total number of processed requests'
});

const counterMessageEndpoint = new client.Counter({
    name: 'counterMessageEndpoint',
    help: 'The total number of processed requests to get endpoint'
});


app.get('/', (req, res) => {
    counterHomeEndpoint.inc();
    res.send('Hello world\n');
});

app.get('/message', (req, res) => {
    counterMessageEndpoint.inc();
    res.send('Message endpoint\n');
});


app.get('/metrics', (req, res) => {
   res.set('Content-Type', client.register.contentType);
   res.end(client.register.metrics());
});

app.use(cors());

app.use(express.json());

app.use(require('./routes'));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta corriendo perfectamente en el puerto ${port}`);
});
