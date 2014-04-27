var express = require('express'),
    orders_routes = require('./routes/orders');
     
var app = express();

 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
// available API

app.get('/orders', orders_routes.findAll);
app.get('/orders/:id', orders_routes.findById);
app.post('/orders', orders_routes.addorder);
// app.put('/orders/:id', orders_routes.updateorder);
app.delete('/orders/:id', orders_routes.deleteorder);
 
app.listen(3000);
console.log('Listening on port 3000...');
