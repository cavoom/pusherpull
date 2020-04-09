const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');

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
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
      });
      //console.log('said thanks for voting');

      return res.json({ success: true, message: 'Thanks for voting'});

})
//console.log('at Poll.js and have ',router);
module.exports = router;

