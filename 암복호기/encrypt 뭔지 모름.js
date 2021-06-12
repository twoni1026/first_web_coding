let form; 
let dorm; 
let sorm;
let history_list;

window.onload = function() { 
	form = document.getElementById("form_1"); 
	dorm = document.getElementById("p_1"); 
	sorm = document.getElementById("p_2"); 
	document.getElementById("button").addEventListener("click", mandooo); 
	if(!localStorage.getItem('gorm2')){
		localStorage.setItem('gorm2',JSON.stringify([]));
	}
}

function mandooo(event){
	let a = form.armho.value;
	history_pyogorm(a);
	historyList();
	encrypt(a);
}

function history_pyogorm(str) { 
	let word_history = JSON.parse(localStorage.getItem('gorm2'));
	word_history.push(str); 
	if (word_history.length >= 20) { 
		word_history.shift(); 
	}
	localStorage.setItem('gorm2',JSON.stringify(word_history)); 
}


function historyList() { 
	let history_list = document.getElementById("history_list")
	let word_history = JSON.parse(localStorage.getItem('gorm2'));
	while(history_list.firstChild) {
		history_list.removeChild(history_list.firstChild)
	}
	for (var i = 0; i < word_history.length; i++) {
		let li = document.createElement("li") //크리에이티브 엘레먼트에서 빈 li를 만든다
		let txt = document.createTextNode(word_history[i]) //텍스트
		li.appendChild(txt)
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
	httpGet('/decrypt?str='+str, function(httpRequest) {
		p_2.innerHTML = httpRequest.responseText;
	});
}
  
function httpGet(url, handler) { //핸들러=처리한다
    let httpRequest = new XMLHttpRequest(); //새로운 httpRequest 요청을 생성하고 httpRequest라는 변수에 넣어줌(변수이름은 상관없음) 

    if(!httpRequest) {
      alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ');
      return false;
    } //httpRequest가 만들어지지 않았을 때 (문제가 생겼을 때) 예외상황을 대비한 코드

    httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) { //보낸 요청이 완료되었는지
			if (httpRequest.status === 200) { //요청이 완료되었다면 서버에서 성공했는지, 실패했는지 판단 (200은 성공/200인지 확인=성공했는지 확인)
				handler(httpRequest); //요청에 대한 응답이 왔을 때 이 함수를 실행시킴
			}
		} else { 
			alert('request에 뭔가 문제가 있어요.');
		}
    }

    httpRequest.open('GET', url); //GET이라는 메서드와 url을 사용해 보낼 것을 설정
    httpRequest.send(); //최종적으로 위에서 설정했던 요청을 보냄
}
