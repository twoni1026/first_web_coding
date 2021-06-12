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
		let li = document.createElement("li")
		let txt = document.createTextNode(word_history[i])
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
  
function httpGet(url, handler) {
    let httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
      alert('XMLHTTP 인스턴스를 만들 수가 없어요 ㅠㅠ');
      return false;
    }

    httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				handler(httpRequest); 
			}
		} else { 
			alert('request에 뭔가 문제가 있어요.');
		}
    }

    httpRequest.open('GET', url);
    httpRequest.send();
}
