const express = require('express');
const config = require('./config/index');

const user = require('./routes/users/network.js');

const app = express();
app.use(express.json());

app.use('/api/user', user);

app.listen(config.port, function (){
    console.log(`Server is listening in: http://localhost:${config.port}`);
});