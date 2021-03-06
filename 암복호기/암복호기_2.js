let form; //전역변수
//let word_history = [];
let dorm; 
let sorm;
//참고--이렇게 바깥쪽에 만들어준 변수는 어디서든 사용할 수 있다.

window.onload = function() { //브라우저의 값을 모두 읽었을 때 실행되는 함수.(document.NN 객체는 HTML 안의 내용을 조작 할 때, window.NN 객체는 브라우저를 조작할 때 사용한다.)
	form = document.getElementById("form_1"); //변수 form 으로 ID가 form_1인 폼을 가져온다.
	document.getElementById("button").addEventListener("click", encrypt); //ID가 button(버튼)인 버튼(form)을 가져온 후 addEventListener로 브라우저에서 버튼을 클릭하는 이벤트가 실행되었을 때 encrypt(암호화)가 실행되게 지정한다.
	dorm = document.getElementById("p_1"); //getElementById로 빈 <p>태그 "p_1"을 불러오고 변수 dorm에 불러온 값을 넣어준다.
	sorm = document.getElementById("p_2"); //getElementById로 빈 <p>태그 "p_2"을 불러오고 변수 sorm에 불러온 값을 넣어준다.
	if(!localStorage.getItem('gorm2')){ //if문(만약에 ㅇㅇ한다면)으로 만들어져 있는 로컬스토리지가 있는지 확인하기 위해 'gorm2' 라는 로컬 스토리지에서 아이템을 뺄 수 있는지 시험한다. 뺄 수 있다면 빼고,'뺄 수 없다면'을 가정해 상황을 만들어 놓는다.---getItem은 로컬스토리지에서 값을 빼 주는 것
		localStorage.setItem('gorm2',JSON.stringify([])); //뺄 수 없다면 실행되는 코드. 'gorm2' 라는 로컬스토리지를 만들고, 문자열을 배열로 바꿔주는 제이슨.스트링기파이를 사용해 빈 문자열을 빈 배열로 만들어 새로 만든 'gorm2' 로컬스토리지에 넣는다.--setItem은 로컬스토리지에 값을 넣어 주는 것 
	} else{ //else(아니라면)
		historyList(); //윈도우.언로드는 맨 처음 실행되는 코드, 여기서 히스토리리스트를 불러와서 새로고침했을 때 맨 처음으로 저장된 기록이 뜨게 해준다.
	}
}
//짚고 넘어갈 것--윈도우언로드 안에서는 p_1과 p_2를 불러오기만 하고 아무것도 실행되지 않았기 때문에 여기서 불러온 p_1과 p_2를 이너HTML로 사용해줘야 한다. 그러기 위해선 변수를 만들고 연결해 적용해줘야 하는데, 윈도우 언로드 안에서 변수를 만들면 윈도우언로드 안에서만 적용되기 때문에 맨 위 바깥공간에 만들어서 어디서든 쓸 수 있게 만들어놔야 한다.(이렇게 만들어진 값이 각각 돔과 솜이다. 밑에서 이너HTML로 돔과 솜을 가져와 각각 한 번,두 번 뒤집어주는 함수를 실행시켰다)
 
function reverse(str) { //브라우저에 입력한 문자열(str)을 뒤집어주기 위해 문자열의 순서를 뒤집어주는 reverse 함수에 넣어준다.
	 return str.split("").reverse().join("") //str(입력값)을 split(글자를 하나씩 자르고),reverse(문자열을 뒤집고),join(나타내)주는 reverse 함수에 넣어 str을 뒤집는다.
} 

function history_pyogorm(str) { //히스토리_표곰이라는 함수를 만들고 str(입력값)을 넣어준다. (아래에서 str에 a를 넣었기 때문에 str을 넣으면 a값이 들어가게 된다.--> a값: 한 번 reverse된 입력값)
	let word_history = JSON.parse(localStorage.getItem('gorm2')); //변수 word_history 배열을 문자열로 바꿔주는 제이슨.펄스 를 사용해 빈 배열이었던'gorm2'를 문자열로 바꿔준다.
	word_history.push(str); //str를 word_history 안에 push(밀어넣어)준다.-> 한 번 뒤집어진 a값이 word_history 안에 저장된다. 
	if (word_history.length >= 20) { //if문으로 word_history에 넣은 값이 20보다 크거나 같은 길이가(length)된다면 (아랫줄)
		word_history.shift(); //(윗줄 이어) word_history에 있는 값을 밀어 없애준다.--> 최종적으로 20개만 남고 20개가 넘는 값이 들어오게 되면 가장 오래된 값부터 지워진다.
	}
	localStorage.setItem('gorm2',JSON.stringify(word_history)); //로컬스토리지 'gorm2'에 변수 history를 제이슨.스트링기파이(문자열을 배열로 바꿔주는)한 값을 넣어(setItem)준다.
}

function encrypt(event) { //버튼이 클릭되면 인크립트라는 함수가 실행된다.(이벤트가 실행됨)
    let a = reverse(form.armho.value); //a라는 변수를 만들고 "form_1" 이 들어있는 form,입력값 armho를 아래에 있는 rverse함수로 뒤집어서 a에 넣어준다. -> 한 번 reverse한 입력값을 a로 정의한다.	
	history_pyogorm(reverse(a));//위에서 history_pyogorm에 str을 넣었고, 여기서는 그 값(str)에 a(한 번 reverse된 입력값)을 넣어 위에서 str을 사용했을 때 a를 사용한 것과 같게 만들어준다. --> reverse(a)로 두 번 뒤집어 원래대로 나타나게 해준다.
	dorm.innerHTML = a; //innerHTML에 윈도우언로드에서 지정한 변수 dorm을 불러오고 변수 sorm 안에 a 값을 넣어준다.-> 변수 dorm은 p_1이 담겨있으니 'p_1'(빈 칸)자리에 a의 값이 나타난다.(a는 한 번 뒤집어진 값)
	sorm.innerHTML = reverse(a); //innerHTML에 윈도우언로드에서 지정한 변수 sorm을 불러오고 변수 sorm 안에 reverse(a)값을 넣어준다.-> 변수 sorm은 p_이 담겨있으니 'p_2'(빈 칸)자리에 reverse된 a의 값, 즉 원래대로 돌아온 값이 나타난다.(a는 이미 한 번 뒤집어진 값이고, 이 a를 다시 뒤집어 원래대로 돌아온다./"p_1"아래 칸인 "p_2"칸에 나타난다.)
	historyList();
}   //정리--사용자가 브라우저에서 입력창에 뒤집고싶은 문자열을 써넣고 버튼을 클릭하면 문자열을 뒤집어주는 reverse함수를 사용해 입력창 밑 빈 칸(비어있는 p태그)에 한 번 뒤집어진 값과 두 번 뒤집어 다시 돌아온 값을 두 줄로 표시해주는 encrypt함수가 실행되어 뒤집은 값을 브라우저에 나타내주고 한 번 뒤집은 값은 word_history에 저장된다.

function historyList() { //로컬 스토리지에서 꺼낸 값(저장된 행동)을 리스트에 넣어준 것 
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
	//옆에 슬래시슬래시 쳐서 주석으로 각 줄마다 하는 역할 이해한 거 써오기, 모르는 건 물음표로 2021.02.21 투니 숙제 -- 그냥 할 때마다 써놓자 2021.03.06 투니_오늘 로컬스토리지 만들고 저장하는 프로그램 써놓음
}