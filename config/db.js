const mongoose = require('mongoose');

// Map Global Promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect('mongodb+srv://dave:Bigdog54@cluster0-gzjpb.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>console.log('MongoDB Connected'))
.catch(err => console.log(err));