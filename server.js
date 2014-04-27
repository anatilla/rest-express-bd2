var express = require('express'),
    wine = require('./routes/orders');
     
var app = express();

 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
// available API

app.get('/orders', wine.findAll);
app.get('/orders/:id', wine.findById);
app.post('/orders', wine.addorder);
// app.put('/orders/:id', wine.updateorder);
app.delete('/orders/:id', wine.deleteorder);
 
app.listen(3000);
console.log('Listening on port 3000...');