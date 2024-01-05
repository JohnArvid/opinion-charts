function lineBreakTh() {
	let selectorString = "#table thead tr th:last-child";
	let node = document.querySelector(selectorString);
	let wordArr = node.textContent.split(' ');
	let span1 = document.createElement('span');
	let span2 = document.createElement('span');
	span1.textContent = `${wordArr[0]} ${wordArr[1]}`;
	span2.textContent = `${wordArr[2]} ${wordArr[3]}`;
	let lineBreak = document.createElement('br');
	node.textContent = '';

	node.appendChild(span1);
	node.appendChild(lineBreak);
	node.appendChild(span2);
}