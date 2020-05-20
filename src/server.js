const express = require('express');
const config = require('./config/index');

const app = express();
app.use(express.json());

app.use('/', (req, res)=>{
    res.status(200).send('Hola mundo')
});

app.listen(config.port, function (){
    console.log(`Server is listening in: http://localhost:${config.port}`);
});