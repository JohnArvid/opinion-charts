
let stringData	= 'December (2023)\t7,2\t5,3\t37,0\t3,4\t2,7\t17,5\t2,6\t23,0\t1,4\nNovember (2023)\t7,3\t4,3\t38,3\t3,8\t3,2\t16,2\t2,7\t22,6\t1,6\nOktober (2023)\t8,1\t4,8\t37,9\t4,1\t2,3\t16,1\t2,9\t22,0\t1,8\nSeptember (2023)\t7,6\t5,2\t38,6\t4,0\t3,0\t18,4\t2,6\t19,0\t1,5\nJuni (2023)\t7,8\t5,0\t36,6\t4,3\t3,0\t18,5\t4,1\t18,3\t2,4\nValresultatet 2022\t6,8\t5,1\t30,3\t6,7\t4,6\t19,1\t5,3\t20,5\t1,5\n';


function createDataArrayFromString(stringData){
	// gör generell tvätt först:
	let replaced = stringData.replaceAll(',', '.').replaceAll('\t', ', ');

	if (replaced.indexOf('\n') > 0) {
		let arrOfStrings = replaced.split('\n');
		let arrOfArrs = arrOfStrings.map( item => item.split(', '));
		if (arrOfArrs[arrOfArrs.length -1].length == 1) arrOfArrs.pop();
		return arrOfArrs.map( array => convertItemsToNumber(array));
	}

	return convertItemsToNumber(replaced.split(', '));

}



function convertItemsToNumber(arr) {
	let mapped = arr.map( (item, index) => { if ( isNaN(item) ) {
		return item 
	} else {
		return +item
		}
	});
	return mapped;
}

