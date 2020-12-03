require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

// ROUTES
const authRoute = require('./routes/authRoute');
const graphqlRoute = require('./routes/graphqlRoute');
// app.use(authRoute);
app.use(graphqlRoute);

app.listen(process.env.PORT, () => console.log(process.env.PORT));
