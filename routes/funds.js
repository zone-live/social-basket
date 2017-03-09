var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin_user:abc123@ds119380.mlab.com:19380/social-share', ['funds']);

// Get all funds
router.get('/funds', function(req, res, next) {
  db.funds.find(function(err, funds) {
    if (err) {
      res.send(err);
    }
    res.json(funds);
  });
});

// Get single fund
router.get('/fund/:id', function(req, res, next) {
  db.funds.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, fund) {
    if (err) {
      res.send(err);
    }
    res.json(fund);
  });
});

// Save fund
router.post('/fund', function(req, res, next) {
  var fund = req.body;
  console.log(fund);
  if (!fund.name || !fund.isin) {
    res.status(400);
    res.json({
      'error': 'bad data'
    });
  } else {
    db.funds.save(fund, function(err, fund) {
      if (err) {
        res.send(err);
      }
      res.json(fund);
    })
  }
});

// Delete fund
router.delete('/fund/:id', function(req, res, next) {
  db.funds.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, fund) {
    if (err) {
      res.send(err);
    }
    res.json(fund);
  });
});

// Update fund
router.put('/fund/:id', function(req, res, next) {
  var fund = req.body;
  var updFund = {};

  if (fund.name) { updFund.name = fund.name; }
  if (fund.isin) { updFund.isin = fund.isin; }
  if (fund.subs_date) { updFund.subs_date = fund.subs_date; }
  if (fund.up_number) { updFund.up_number = fund.up_number; }
  if (fund.up_quote) { updFund.up_quote = fund.up_quote; }
  if (fund.value_bought) { updFund.value_bought = fund.value_bought; }
  if (fund.up_price) { updFund.up_price = fund.up_price; }
  if (fund.at_date) { updFund.at_date = fund.at_date; }
  if (fund.todays_value) { updFund.todays_value = fund.todays_value; }
  if (fund.earnings) { updFund.earnings = fund.earnings; }
  if (fund.gross_proff) { updFund.gross_proff = fund.gross_proff; }
  if (fund.liquid_proff) { updFund.liquid_proff = fund.liquid_proff; }
  if (fund.days_passed) { updFund.days_passed = fund.days_passed; }

  if (!updFund) {
    res.status(400);
    res.json({
      'error': 'bad data'
    });
  } else {
    db.funds.update({_id: mongojs.ObjectId(req.params.id)},updFund, {}, function(err, fund) {
      if (err) {
        res.send(err);
      }
      res.json(fund);
    });
  }
});


module.exports = router;
