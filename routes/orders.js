    var pg = require('pg');
    var conString = "postgres://postgres:''@localhost/dellstore2";
    // var express = require('express');

    // var client = new pg.Client({user: 'postgres', database: 'dellstore2', host: 'localhost'});
    // client.on('drain', client.end.bind(client)); //disconnect client when all queries are finished
    // client.connect();	



    exports.findAll = function(req, res) {
      pg.connect(conString, function(err, client, done) {

	if (err) {
	  res.send(JSON.stringify({
	    status: err
	  }));
	}
	
	client.query({
	  text: 'SELECT * from orders limit 10'
	}, function(err, result) {
	  done(); //call `done()` to release the client back to the pool

	  if (!err) {
	    res.send(JSON.stringify(result.rows));
	  } else res.send(JSON.stringify({
	      status: err
	    }));
	});

      });
    };

    exports.findById = function(req, res) {
      var id = req.params.id;

      pg.connect(conString, function(err, client, done) {

	if (err) {
	  res.send(JSON.stringify({
	    status: err
	  }));
	}

	client.query({
	  text: 'SELECT * from orders where orderid = $1',
	  values: [id]
	}, function(err, result) {

	  done();

	  if (!err) {
	    res.send(JSON.stringify(result.rows));
	  } else res.send(JSON.stringify({
	      status: err
	    }));

	});
      });
    };

    exports.addorder = function(req, res) {
      var obj = req.body;

      pg.connect(conString, function(err, client, done) {

	if (err) {
	  res.send(JSON.stringify({
	    status: err
	  }));
	}

	client.query({
	  text: 'INSERT INTO orders (orderid, orderdate, customerid, netamount, tax, totalamount) VALUES ($1, $2, $3, $4, $5, $6);',
	  values: [obj.orderid, obj.orderdate, obj.customerid, obj.netamount, obj.tax, obj.totalamount]
	}, function(err, result) {

	  done();

	  if (!err) {
	    res.send(JSON.stringify({status: 'OK'}));
	  } else res.send(JSON.stringify({
	      status: err
	    }));


	});
      });
    };

    exports.deleteorder = function(req, res) {
      var id = req.params.id;

      pg.connect(conString, function(err, client, done) {

	if (err) {
	  res.send(JSON.stringify({
	    status: err
	  }));
	}

	client.query({
	  text: 'DELETE FROM orders WHERE orderid = $1',
	  values: [id]
	}, function(err, result) {

	  done();

	  if (!err) {
	    res.send(JSON.stringify({
	      status: 'OK'
	    }));
	  } else res.send(JSON.stringify({
	      status: err
	    }));

	});
      });
    };
