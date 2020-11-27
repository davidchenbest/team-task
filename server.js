require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const authRoute = require('./routes/authRoute');
app.use(authRoute);

app.listen(process.env.PORT, () => console.log(process.env.PORT));
