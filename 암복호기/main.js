const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

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
})

app.get('/decrypt/', (req, res) => {
	res.send(decrypt(req.query.str));
})

app.listen(port, () => {
	console.log('Example app listening at http://localhost:${port}')
})