const mongoose = require('mongoose');

const Vote = require('../models/Vote.js');

const newVote = {
    os: "STuffz",
    points: 1
  };

// Save it to Mongo
  new Vote(newVote).save().then(vote => {
    console.log('SAVED IT to MONGO');
    return res.json({success: true, message: 'Thanks for voting'});
  });
