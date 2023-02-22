const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

const mongoUrl = "mongodb://127.0.0.1:27017/records"

const connection = mongoose.connect(mongoUrl,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(db => console.log('DB is connected'))
.catch(err => console.log(err));