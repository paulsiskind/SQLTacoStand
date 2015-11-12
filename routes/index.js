var express = require('express');
var router = express.Router();

/* GET home page. */

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
    res.render('index',{tacos: result.rows})
  });

});
})

router.get('/new',function(req, res, next){
  res.render('new')
})

router.post('/', function(req, res, next){

     pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('INSERT INTO tacos(shell, taste) VALUES($1, $2) returning id',[req.body.shell, req.body.taste],
   function(err, result) {
    done();
    res.redirect('/')
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result)
    console.log(result.rows[0].number);
    console.log('connected to database')
   
  });

});
})

router.get('/:id', function(req, res, next){
pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * from tacos WHERE id=$1',[req.params.id],
   function(err, result) {
    done();
    res.render('show', {tacos: result.rows[0]})
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result)
    console.log(result.rows[0].number);
    console.log('connected to database')
   
  });

});
//$ DELETE * FROM cities WHERE city = 'Boulder'; Something like this
})
router.post('/:id/delete', function(req, res, next){

     pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('DELETE FROM tacos where id=($1)',[req.params.id],
   function(err, result) {
    done();
    res.redirect('/')
    if (err) {
      return console.error('error running query', err);
    }
    // console.log(result)
    // console.log(result.rows[0].number);
    // console.log('connected to database')
   
  });

});
})



router.get('/:id/update', function(req, res, next){

     pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * from tacos WHERE id=$1',[req.params.id],
   function(err, result) {
    done();
    res.render('update',{tacos: result.rows[0]})
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result)
    console.log(result.rows[0].number);
    console.log('connected to database')
   
  });

});
})
//(shell, taste) VALUES($1, $2) returning id',[req.body.shell, req.body.taste],
//"UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);
router.post('/:id/update', function(req, res, next){

     pg.connect(conString, function(err, client, done) {

  if (err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('UPDATE tacos SET shell=($1), taste=($2) where id=($3)',[req.body.shell, req.body.taste, req.params.id],
   function(err, result) {
    done();
    res.redirect('/')
    if (err) {
      return console.error('error running query', err);
    }
    // console.log(result)
    // console.log(result.rows[0].number);
    // console.log('connected to database')
   
  });

});
})
module.exports = router;
