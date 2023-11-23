function lineBreakTh() {
	let selectorString = "#table thead tr th:last-child";
	let element = document.querySelector(selectorString);
	let htmlString = 'Förändring sedan <br>föregående mätning<span class="google-visualization-table-sortind"></span>';
	element.innerHTML = htmlString;
}