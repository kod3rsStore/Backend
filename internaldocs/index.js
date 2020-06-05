const express = require('express')
const app = express();
const port = 5000;

app.use(express.json());
/*
app.get('/', (req, res) => {
    res.send(`API Internal Documentation v 0.01`);
  });
  */
app.use('/', express.static(__dirname + '/public'));
app.listen(port, () => console.log(`Server listening on port ${port}!`))
