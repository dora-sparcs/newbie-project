const mongoose = require('mongoose')

mongoose.set("useFindAndModify", false);

mongoose.connect('mongodb://localhost:27017/newbie-project', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
          })
          .then(() => {
            console.log('Connected to MongoDB');
          }).catch((error) => {
            console.error(error);
          });

const db = mongoose.connection;

module.exports = db;
