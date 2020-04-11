const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote.js');

// const Vote = require('../models/Vote);

const Pusher = require('pusher');

// const keys = require('pusher');

var pusher = new Pusher({
  appId: '979485',
  key: 'd8f1ab915ef59863b905',
  secret: 'ea4e18cb4f760d341fb8',
  cluster: 'us2',
  encrypted: true
});

// This is going to fetch the votes database and return the votes array from Mongoose
router.get('/', (req,res) => {
  Vote.find().then(votes=> res.json({success: true,votes: votes}))
});

// This one gets the vote and stores it
router.post('/', (req,res) =>{
//BROKEN: req.body.os is NULL
// I have placed a dummy value in here;
// Save vote to Mongo DB
  const newVote = {
    os: 'Linux',
    points: 1
  };

// Saves vote and then calls Pusher
  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
    points: parseInt(vote.points),
    os: vote.os
  });


  return res.json({success: true, message: 'Thanks for voting'});
  });
});

module.exports = router;