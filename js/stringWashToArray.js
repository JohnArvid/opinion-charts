function stringWashToArray(stringData){
	let replaced = stringData.replaceAll(',', '.').replaceAll('\n', ', ');
	let asArray = replaced.split(', ');
	asArray.pop()
	return asArray;
}