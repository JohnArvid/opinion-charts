
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


function createDataArrayFromStringVertical(stringData){
	let replaced = stringData.replaceAll(',', '.').replaceAll('\n', ', ');
	let asArray = replaced.split(', ');
	if (asArray[asArray.length -1] == '') asArray.pop();
	return asArray.map( (item, index) => { if (index > 0) {
		return +item 
	} else {
		return item
		}
	});
}