
const stringData = `November (2023)
7,3
4,3
38,3
3,8
3,2
16,2
2,7
22,6
1,6
`


function stringWashToArray(stringData){
	let replaced = stringData.replaceAll(',', '.').replaceAll('\n', ', ');
	let asArray = replaced.split(', ');
	asArray.pop()
	return asArray;
}