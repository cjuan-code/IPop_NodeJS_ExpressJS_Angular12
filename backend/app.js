const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.use('/items', require('./routes/item'));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta corriendo perfectamente en el puerto ${port}`);
});