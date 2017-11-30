
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
const keyPublishable = require('../stripeConfig').PUBLISHABLE_KEY
const keySecret = require('../stripeConfig').SECRET_KEY
const stripe = require("stripe")(keySecret);


app.use(bodyParser.urlencoded({ extended: false }))
//GET stripe route to display paymnent form

app.get("/", (req, res) =>
  res.render("index.pug", {keyPublishable}));

// POST stripe  route to recieve payment token ID and create charge


app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"));
});


app.listen(4567, function() {
  console.log('Payment Server')
})
