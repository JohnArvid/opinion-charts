let dataAsString  = 'December (2023)\t7,2\t5,3\t37,0\t3,4\t2,7\t17,5\t2,6\t23,0\t1,4\nNovember (2023)\t7,3\t4,3\t38,3\t3,8\t3,2\t16,2\t2,7\t22,6\t1,6\nOktober (2023)\t8,1\t4,8\t37,9\t4,1\t2,3\t16,1\t2,9\t22,0\t1,8\nSeptember (2023)\t7,6\t5,2\t38,6\t4,0\t3,0\t18,4\t2,6\t19,0\t1,5\nJuni (2023)\t7,8\t5,0\t36,6\t4,3\t3,0\t18,5\t4,1\t18,3\t2,4\nValresultatet 2022\t6,8\t5,1\t30,3\t6,7\t4,6\t19,1\t5,3\t20,5\t1,5\n';
let blockDataAsString = 'December (2023)\t45,8\t52,9\nNovember (2023)\t44,7\t53,7\nOktober (2023)\t43,3\t54,9\nSeptember (2023)\t43\t55,4\nJuni (2023)\t43,9\t53,7\nValet 2022\t49,5\t48,9\n'; 
let ministerDataAsString = 'December (2023)\t44\t18\t18\t20\nNovember (2023)\t43\t17\t18\t22\nOktober (2023)\t45\t18\t17\t20\nSeptember (2023)\t48\t22\t13\t17\n';
// Utility for table
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

// Utility for single columns
function createDataArrayFromStringVertical(stringData){
  let replaced = stringData.replaceAll(',', '.').replaceAll('\n', ', ');
  let asArray = replaced.split(', ');
  if (asArray[asArray.length -1] == '') asArray.pop();
  return asArray.map( (item, index) => { if ( isNaN(item) ) {
    return item 
  } else {
    return +item
    }
  });
}


const currentData = createDataArrayFromString(dataAsString);
const currentBlockData = createDataArrayFromString(blockDataAsString);
const currentMinisterData = createDataArrayFromString(ministerDataAsString);

const partyData = {
  results: currentData[0].slice(1),
  seriesNames:  [
    'V',  
    'MP',
    'S', 
    'C', 
    'L', 
    'M',  
    'KD', 
    'SD', 
    'Övr', ],
  longSeriesNames: [
    'Vänsterpartiet',
    'Miljöpartiet',
    'Socialdemokraterna', 
    'Centerpartiet', 
    'Liberalerna', 
    'Moderaterna', 
    'Kristdemokraterna', 
    'Sverigedemokraterna', 
    'Övriga'
    ],
  seriesColors : {
    v:  '#ed1c24',
    mp: '#53a045',
    s:  '#ed1b34',
    c:  '#046a38',
    l:  '#006ab3',
    m:  '#0d9ddb',
    kd: '#005ea1',
    sd: '#e2b404',
    ovr:  '#808080',
  },
  changeSinceLast: createDataArrayFromStringVertical(`-0,1
1,0
-1,3
-0,4
-0,5
1,3
-0,1
0,4
-0,2
`),
    changeSinceElection: createDataArrayFromStringVertical(`0,4
0,2
6,7
-3,3
-1,9
-1,6
-2,7
2,5
-0,1
`),
  month: currentData[0][0].slice(0, currentData[0][0].length - 7),
  year: currentData[0][0].slice(currentData[0][0].length - 5, currentData[0][0].length - 1),
  history: currentData.toReversed(),
}

const blockData = {
  results: currentBlockData[0].slice(1), 
  seriesNames:  [ 'M/L/KD/SD', 'S/V/MP/C', ],
  seriesColors : {
    m:  partyData.seriesColors.m,
    s:  partyData.seriesColors.s,
  },
  history: currentBlockData.toReversed(),
}

const ministerData = {
  results: currentMinisterData[0].slice(1),
  seriesNames: [
    'Magdalena Andersson', 
    'Ulf Kristersson', 
    'Jimmie Åkesson',  
    'Inget av alternativen',
    ],
  seriesColors: {
    s: partyData.seriesColors.s,
    m: partyData.seriesColors.m,
    sd: partyData.seriesColors.sd,
    ovr: partyData.seriesColors.ovr,
  },
  history: currentMinisterData.toReversed(),
}


// Constructor for options object
function Options() {
  this.colors = Object.values(partyData.seriesColors);
  this.fontName = 'Questrial'
}

// Function for transposing data
function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

// Load the Visualization API and the corechart package.
google.charts.load(
  'current', {'packages':['corechart', 'table'],'language': 'sv'}
  );

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  // drawChange(partyData, 'changeChart', 'Förändring sedan senaste mätning');
  drawChangeAnnot(partyData, 'changeSinceLast', 'changeChart', 'Förändring sedan senaste mätning');
  drawChangeAnnot(partyData, 'changeSinceElection', 'electionChange', 'Förändring sedan valet');
  // drawElectionChange(partyData, 'electionChange', 'Förändring sedan valet 2022');
  drawStacked(partyData, 'stackedChart', 'Spridningsdiagram');
  drawBarsV(partyData, 'barChartV', 'Stående kolumner med tooltips'); 
  drawBarsH(partyData, 'barChartH', 'Liggande kolumner');
  drawLines(partyData, 'lineChart', 'Trend per parti');
  drawLines(blockData, 'lineChartByBlock', 'Trend per block');
  drawLines(ministerData, 'lineChartByMinister', 'Trend per statsministerkandidat');
  drawTable(partyData, 'table', true);
  drawTable(partyData, 'table2', false);
  addLogo();
  lineBreakTh();
}

// Listen for window resize and redraw charts 
window.onresize = drawCharts;


// FUNCTIONS TO DRAW CHARTS

// Columns for change since last
function drawChange(dataObject, chartId, title) {

  const options = new Options();
  options.legend = {position: 'none'};
  options.title = title;
  options.vAxis = {
    ticks: [-8, -6, -4, -2, 0, +2, +4, +6, +8]
  };
  
  
  const data = new google.visualization.arrayToDataTable([
    ['', ...dataObject.seriesNames],
    ['', ...dataObject.changeSinceLast],
  ]);

  const chart = new google.visualization.ColumnChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}

// Columns for change since last
function drawChangeStroke(dataObject, chartId, title) {

  const options = new Options();
  options.legend = {position: 'none'};
  options.title = title;
  options.vAxis = {
    ticks: [-8, -6, -4, -2, 0, +2, +4, +6, +8]
  };
  
  
  const dataArray = dataObject.seriesNames.map( (party, i) => {
    return (
      [party, dataObject.changeSinceLast[i], 
        dataObject.changeSinceLast[i], 
        // `stroke-color: #333; stroke-width: 2; fill-color: ${Object.values(dataObject.seriesColors)[i]}`, 
        `fill-color: ${Object.values(dataObject.seriesColors)[i]}`, 

        ]
      );
  })
  
  const data = google.visualization.arrayToDataTable([
    ['Parti', 'Förändring sedan senaste mätning%', 
      {role: 'annotation'}, 
      {role: 'style'}, 
      ],
    ...dataArray 
    ]);

  const chart = new google.visualization.ColumnChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}

// Columns for change since last
function drawChangeAnnot(dataObject, changeSeries, chartId, title) {

  const options = new Options();
  options.legend = {position: 'none'};
  options.title = title;
  options.vAxis = {
    ticks: [-8, -6, -4, -2, 0, +2, +4, +6, +8]
  };
  
  
  const dataArray = dataObject.seriesNames.map( (party, i) => {
    return (
      [party, dataObject[changeSeries][i], 
        dataObject[changeSeries][i], 
        // `stroke-color: #333; stroke-width: 2; fill-color: ${Object.values(dataObject.seriesColors)[i]}`, 
        `fill-color: ${Object.values(dataObject.seriesColors)[i]}`, 

        ]
      );
  })
  
  const data = google.visualization.arrayToDataTable([
    ['Parti', changeSeries == 'changeSinceLast' ? 'Förändring sedan senaste mätning %'
      :'Förändring sedan valet %', 
      {role: 'annotation'}, 
      {role: 'style'}, 
      ],
    ...dataArray 
    ]);

  const chart = new google.visualization.ColumnChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}

// Columns for change since election
function drawElectionChange(dataObject, chartId, title = "") {

  const options = new Options();
  // options.legend = {position: 'none'};
  options.title = title;
  options.vAxis = {
    ticks: [-8, -6, -4, -2, 0, +2, +4, +6, +8]
  }
  
  const data = new google.visualization.arrayToDataTable([
    ['', ...dataObject.seriesNames],
    ['', ...dataObject.changeSinceElection],
  ]);

  const chart = new google.visualization.ColumnChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}

// Stacked for spread across categories
function drawStacked(dataObject, chartId, title = "") {

  const options = new Options();
  options.isStacked = 'percent';
  options.title = title;
  options.hAxis = {
    gridlines: {
      color: '#333', 
      minSpacing: 500
    },
    minorGridlines: {
      color: '#ddd', 
      minSpacing: 50
    },
   }
  
  const data = new google.visualization.arrayToDataTable([
    ['', ...dataObject.seriesNames],
    ['', ...dataObject.results],
  ]);

  const chart = new google.visualization.BarChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}

function drawBarsH(dataObject, chartId, title = "") {

  const options = new Options();
  options.legend = {position: 'none'};
  options.title = title;
  options.hAxis = {
    ticks: [0, 4, 10, 20, 30, 40, 50]
  }

  const dataArray = dataObject.seriesNames.map( (party, i) => {
    return (
      [party, dataObject.results[i], 
        dataObject.results[i], 
        Object.values(dataObject.seriesColors)[i], 
        // `Förändring sedan senaste mätning ${dataObject.changeSinceLast[i]}` 
        ]
      );
  })
  
  const data = google.visualization.arrayToDataTable([
    ['', 'Andel %', 
      {role: 'annotation'}, 
      {role: 'style'}, 
      // {role: 'tooltip'}
      ],
    ...dataArray 
    ]);


  const chart = new google.visualization.BarChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}

// Columns for spread across categories
function drawBarsV(dataObject, chartId, title = "") {

  const options = new Options();
  options.legend = {position: 'none'};
  options.title = title;
  options.vAxis = {
    ticks: [0, 4, 10, 20, 30, 40, 50]
  }

  const dataArray = dataObject.seriesNames.map( (party, i) => {
    return (
      [party, dataObject.results[i], 
        dataObject.results[i], 
        Object.values(dataObject.seriesColors)[i], 
        `Förändring sedan senaste mätning ${dataObject.changeSinceLast[i]}` ]
      );
  })
  
  const data = google.visualization.arrayToDataTable([
    ['Parti', 'Andel %', 
      {role: 'annotation'}, 
      {role: 'style'}, 
      {role: 'tooltip'}
      ],
    ...dataArray 
    ]);

  const chart = new google.visualization.ColumnChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}


// Line chart for history/trendlines
function drawLines(dataObject, chartId, title = "") {

  const options = new Options();
  options.colors = Object.values(dataObject.seriesColors);
  options.title = title;
  options.pointSize = 5;
  
  const data = new google.visualization.arrayToDataTable([
  ['', ...(
    dataObject.longSeriesNames ? 
    dataObject.longSeriesNames : 
    dataObject.seriesNames)],
  ...dataObject.history
  ]);
  // if (dataObject == ministerData) console.log(data);

  const chart = new google.visualization.LineChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}

// Table
function drawTable(dataObject, chartId, transposeTable) {

  const options = new Options();
  options.frozenColumns = 1;

  let data;
  if(transposeTable) {
    data = new google.visualization.arrayToDataTable(transpose([
    ['', ...dataObject.seriesNames],
    ...dataObject.history,
    ['Förändring sedan föregående mätning', ...dataObject.changeSinceLast]
    ]));
  } else {
    data = new google.visualization.arrayToDataTable([
    ['', ...dataObject.seriesNames],
    ...dataObject.history,
    ['Förändring sedan föregående mätning', ...dataObject.changeSinceLast]
    ]);
  }

  const table = new google.visualization.Table(
    document.getElementById(chartId)
    );
  
  table.draw(data, options);
}



