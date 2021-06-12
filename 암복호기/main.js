const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000

app.use(express.static('public'));
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("연결 성공");
});

const crypt_logSchema = new mongoose.Schema({
  text: String,
  date: Date
});

const Cry = mongoose.model('Cry', crypt_logSchema);
function encrypt(str) {
	return reverse(str);
}

function decrypt(str) {
	return reverse(str);
}

function reverse(str) {
	return str.split("").reverse().join("");
}

app.get('/encrypt/', (req, res) => {
	res.send(decrypt(req.query.str));
	const flucry = new Cry({ text: req.query.str, date: new Date }); 
flucry.save(function (err, flucry) {
    if (err) return console.error(err);
});
});


app.get('/decrypt/', (req, res) => {
	res.send(decrypt(req.query.str));
});

app.get('/Cry/',(req, res) => {
	Cry.find().select({_id:0, text:1, date:1}).limit(20).sort({_id: -1}).exec(function (err, log) {
	if (err) return console.error(err);
	console.log(log);
	res.send(log);
	});
});

app.listen(port, () => {
	console.log('Example app listening at http://localhost:${port}')
})