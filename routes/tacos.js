var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://@localhost/taco_types";


router.get('/', function(req, res, next){

     pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM tacos', function(err, result) {
    done();
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result)
    console.log(result.rows[0].number);
    console.log('connected to database')
    res.render('/index',{tacos: result.rows})
  });

});
})

module.exports = router;
