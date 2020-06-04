const express = require('express')
const app = express();
const port = 4000;
const swagger = require('./swagger');

app.use(express.json());
app.use('/', swagger);



/*
app.get('/', (req, res) => {
    res.send(`API auth v 0.01`);
  });
*/
app.listen(port, () => console.log(`Server listening on port ${port}!`))
