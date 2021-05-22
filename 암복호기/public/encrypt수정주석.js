let form; //전역변수
let dorm; 
let sorm;
let history_list;
//참고--이렇게 바깥쪽에 만들어준 변수는 모든 함수에서 사용할 수 있다.

window.onload = function() { //브라우저의 값을 모두 읽었을 때 실행되는 함수.(document.NN 객체는 HTML 안의 내용을 조작 할 때, window.NN 객체는 브라우저를 조작할 때 사용한다.)
	form = document.getElementById("form_1");  //변수 form 으로 ID가 form_1인 폼을 가져온다.
	dorm = document.getElementById("p_1"); //getElementById로 빈 <p>태그 "p_1"을 불러오고 변수 dorm에 불러온 값을 넣어준다.
	sorm = document.getElementById("p_2"); //getElementById로 빈 <p>태그 "p_2"을 불러오고 변수 sorm에 불러온 값을 넣어준다.
	document.getElementById("button").addEventListener("click", mandooo); //ID가 button(버튼)인 버튼(form)을 가져온 후 addEventListener로 브라우저에서 버튼을 클릭하는 이벤트가 실행되었을 때 mandooo 함수가 실행되게 지정한다.
	historyList();
	//if(!localStorage.getItem('gorm2')){ //if문(만약에 ㅇㅇ한다면)으로 만들어져 있는 로컬스토리지가 있는지 확인하기 위해 'gorm2' 라는 로컬 스토리지에서 아이템을 뺄 수 있는지 시험한다. 뺄 수 있다면 빼고,'뺄 수 없다면'을 가정해 상황을 만들어 놓는다.---getItem은 로컬스토리지에서 값을 빼 주는 것
		//localStorage.setItem('gorm2',JSON.stringify([])); //뺄 수 없다면 실행되는 코드. 'gorm2' 라는 로컬스토리지를 만들고, 문자열을 배열로 바꿔주는 제이슨.스트링기파이를 사용해 빈 문자열을 빈 배열로 만들어 새로 만든 로컬스토리지 'gorm2'에 넣는다.--setItem은 로컬스토리지에 값을 넣어 주는 것 
	//}
}

function mandooo(event){ //버튼이 클릭되었을 때 mandooo라는 함수가 실행된다.(이벤트가 실행된다)
	let a = form.armho.value; //a가
	history_pyogorm(a); //함수 history_pyogorm에 한번 뒤집어진 문자열 a를 넣어준다.
	historyList(); //히스토리리스트
	encrypt(a);
}

//str-브라우저에 입력한 문자열 = 순수 입력값 원래 입력값
//a-한번 reverse한 입력값 (뒤집어진 문자열) --- a라는 변수에 reverse한 str값을 넣어준거
//armho-입력창(input)
//mandooo 가 뭔지 알아내야 함 이게 뭐지 암호화긴한데

function history_pyogorm(str) { //히스토리_표곰이라는 함수를 만들고 str(입력값)을 넣어준다. (아래에서 str에 a를 넣었기 때문에 str을 넣으면 a값이 들어가게 된다.--> a값: 한 번 reverse된 입력값)
	let word_history = JSON.parse(localStorage.getItem('gorm2')); //변수 word_history를 만들고 배열을 문자열로 바꿔주는 제이슨.펄스 를 사용해 빈 배열이었던'gorm2'를 문자열로 바꿔준 것을 넣어준다.
	let dt = new Date;
	
	word_history.push({'text':str, 'date':dt}); //word_history에 text(문자열 str)와 date가 같이 들어있는 객체를 밀어넣어(push)준다.
	if (word_history.length > 20) { //if문으로 word_history에 넣은 값이 20보다 크거나 같은 길이가(length)된다면,
		word_history.shift(); //word_history에 있는 값을 밀어 없애준다.--> 최종적으로 20개만 남고 20개가 넘는 값이 들어오게 되면 가장 오래된 값부터 지워진다.
	}
	localStorage.setItem('gorm2',JSON.stringify(word_history)); //로컬스토리지 'gorm2'에 변수 history를 제이슨.스트링기파이(문자열을 배열로 바꿔주는)한 값을 넣어(setItem)준다.
}

function historyList() { 
	let history_list = document.getElementById("history_list") //
	let word_history = JSON.parse(localStorage.getItem('gorm2'));
	while(history_list.firstChild) {
		history_list.removeChild(history_list.firstChild)
		
	}
	for (var i = 0; i < word_history.length; i++) {
		let dt = new Date (word_history[i].date);
		let li = document.createElement("li") //크리에이트 엘레먼트에서 li를 만든다 ----- li는 비어있음
		li.innerHTML = `<span class="history_item"> <span class="history_text">  ${word_history[i].text}  </span> <span class="history_date">  ${dt.getMonth()+1}/${dt.getDate()}  ${dt.getHours()}:${dt.getMinutes()} </span> </span>`;
		//li.innerHTML = '<span class="history_item"> <span class="history_text">' + word_history[i].text + '</span> <span class="history_date">' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + '</span> </span>';
		history_list.appendChild(li) 
	}
}

function encrypt(str) {
	httpGet('/encrypt?str='+str, function(httpRequest) {
		p_1.innerHTML = httpRequest.responseText; 
		decrypt(httpRequest.responseText);
	});
}
  
function decrypt(str) {
	httpGet('/decrypt?str='+str, function(httpRequest) { //변수 앞에 let을 쓰지 않으면 맨 위의 전역변수와 똑같이 모든 곳에서 사용할 수 있다.-> let을 붙이면 httpGet을 사용한 다른곳의 코드가 실행되지 않고 오류남
		p_2.innerHTML = httpRequest.responseText;
	});
}
  
function httpGet(url, handler) { //핸들러=처리한다 / httpGet 함수를 url을 사용해 처리한다?
    let httpRequest = new XMLHttpRequest(); //새로운 XMLHttpRequest 요청을 생성하고 httpRequest라는 변수에 넣어준다.(변수이름은 상관없음) 

    if(!httpRequest) { //if문(만약 ㅇㅇ한다면) 으로 httpRequest를 생성할 수 있는지 확인한다...?
      alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ') //만들 수 없다면 'XMLHTTP 인스턴스를 만들 수가 없어요ㅠㅠ'라는 창이 뜨게 한다.
      return false;
    } //httpRequest가 만들어지지 않았을 때 (문제가 생겼을 때) 예외상황을 대비한 코드

    httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) { //보낸 요청이 완료되었는지 판단한다.
			if (httpRequest.status === 200) { //요청이 완료되었다면 서버에서 성공했는지, 실패했는지 판단한다. (200은 성공/200인지 확인=성공했는지 확인)
				handler(httpRequest); //요청에 대한 응답이 왔을 때 이 함수를 실행시킴 (핸들러에 httpRequest를 넣어줬다)
			} else { 
			alert('request에 뭔가 문제가 있는데요!'); //만약 실패했다면 이 코드를 실행시켜 'request에 뭔가 문제가 있는데요!' 라는 창이 뜨게 한다.
			}
		}
	}
    httpRequest.open('GET', url); //GET이라는 메서드와 url을 사용해 보낼 것을 설정한다.
    httpRequest.send(); //최종적으로 위에서 설정했던 요청을 보낸다.
}

// ㅣ문장ㅣ----------ㅣ날짜ㅣ 를 브라우저에 표기할 수 있게)    날짜 형식-----mm/dd hh:mm (월/일 시간:분)