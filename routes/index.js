const express = require('express');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sample payment using Stripe nonce flow' });
});

router.get('/api/billingtoken',function(req, res, next) {
  res.json({
    gateway: 'STRIPE',
    token: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

router.post('/api/purchase',function(req, res, next) {
  stripe.charges.create(
    {
      amount: 200,
      currency: 'usd',
      source: req.body.payment_token_nonce,
      description: 'Charge for Silent Valley',
    },
    function(err, charge) {
      if(err) {
        console.error(err);
        next(err);
        return;
      }
      res.json(charge);
    }
  );
});

module.exports = router;
