let form; //전역변수
let word_history = [];

window.onload = function() {
		form = document.getElementById("form_1");
		document.getElementById("button").addEventListener("click", encrypt);
}

function reverse(str) {
	 return str.split("").reverse().join("")
} 
		
function encrypt(event) {
	let a = reverse(form.armho.value);
	document.getElementById("p_1").innerHTML = a;
	document.getElementById("p_2").innerHTML = reverse(a);
	word_history.push(reverse(a));
	historyList();
}
		
function historyList() {
	let history_list = document.getElementById("history_list")
	while(history_list.firstChild) {
		history_list.removeChild(history_list.firstChild)
	}
	for (var i = 0; i < word_history.length; i++) {
		let li = document.createElement("li")
		let txt = document.createTextNode(word_history[i])
		li.appendChild(txt)
		history_list.appendChild(li)
	}
	if (word_history.length >= 20) {
		word_history.shift();
	}
}