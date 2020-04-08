const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

//var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '978034',
  key: 'cfa9af14862797154341',
  secret: '233e79e5fd27f0b26490',
  cluster: 'us2',
  encrypted: true
});


router.get('/', (req,res)=>{
    res.send('POLL');
});

router.post('/', (req,res) =>{
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
      });

      return res.json({ success: true, message: 'Thanks for voting'});

})

module.exports = router;

