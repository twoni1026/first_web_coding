
const mongoose = require('mongoose'); //mongoose몽구스 모듈을 쓰겠다 정의

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true}); //몽구스를 MongoDB몽고디비에 연결(어떤 몽고디비에 연결할지 지정,여기서는 이 컴퓨터에 서버가 있으니 로컬호스트에 연결)

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); //에러가 난다면
db.once('open', function() { //접속이 시작되고 연결됨
  console.log("we're connected!"); //연결이 성공되었을 때 문구를 띄워줌
});

const crypt_logSchema = new mongoose.Schema({ //Schema스키마: 데이터의 구조,타입을 알려줌-> Schema 만듦(crypt_logSchema)
  text: String,
  date: Date
});

crypt_logSchema.methods.speak = function () { //Schema에 메소드를 정의(speak스피크)
const greeting = this.name
	? `Meow name is ${this.text} and ${this.text} date is Date`
    : "I don't have a name"
  console.log(greeting);
}

const Cry = mongoose.model('Cry', crypt_logSchema); //Schema를 가지고 모델을 만듦 (Cry)->모델을 구분하기 위해 대문자로 시작

const flucry = new Cry({ text: 'flucry', date: new Date }); //모델의 instance인스턴스(실제 데이터)를 만들고 (flucry)
flucry.save(function (err, flucry) { //모델 데이터를 저장(flucry.Save)
    if (err) return console.error(err);
});

Cry.find().select({_id:0, text:1, date:1}).exec(function (err, crys) { //find: 모든 데이터를 가져옴/select: 데이터를 선택해서 가져옴--> 가져올 데이터를 선택함
	if (err) return console.error(err);
	console.log(crys);
});

