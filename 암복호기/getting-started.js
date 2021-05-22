
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

const kittySchema = new mongoose.Schema({
  name: String,
  color: String
});

kittySchema.methods.speak = function () {
const greeting = this.name
	? `Meow name is ${this.name} and ${this.name} color is darkblue`
    : "I don't have a name";
  console.log(greeting);
}

const Kitten = mongoose.model('Kitten', kittySchema);

const fluffy = new Kitten({ name: 'fluffy', color: 'darkblue'});

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });
  
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})

