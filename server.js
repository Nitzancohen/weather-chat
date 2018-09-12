const express = require('express');
const app = express();
app.listen(8200);

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/node_modules'));