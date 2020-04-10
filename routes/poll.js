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


router.get('/', (req,res) => {
    res.send('POLL');
    //console.log('sent POLL');
});

router.post('/', (req,res) =>{
//console.log('REQUESTED: ', req.body);
// Save vote to Mongo DB
  const newVote = {
    os: req.body.os,
    points: 1
  };
  
  // FOR TEST because req.body is null
  // const newVote = {
  //   os: "Windows",
  //   points: 1
  // };




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

