
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

const crypt_logSchema = new mongoose.Schema({
  text: String,
  date: Date
});

crypt_logSchema.methods.speak = function () {
const greeting = this.name
	? `Meow name is ${this.text} and ${this.text} date is Date`
    : "I don't have a name"
  console.log(greeting);
}

const cry = mongoose.model('cry', crypt_logSchema);

const flucry = new cry({ text: 'flucry', date: new Date });

  flucry.save(function (err, flucry) {
    if (err) return console.error(err);
  });
 
cry.find().select({_id:0, text:1, date:1}).exec(function (err, crys) {
  if (err) return console.error(err);
  console.log(crys);
});

