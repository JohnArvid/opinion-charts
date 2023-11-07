

const partyData = {
  results: [ 
    8.1, 
    4.2,  
    37.9,  
    4.1,  
    2.3,  
    16.1,  
    2.9, 
    22.0,  
    1.8, ],
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
  changeSinceLast: [
    0.5,
    -0.4, 
    -0.7,
    0.1,
    -0.7,
    -2.3,
    0.3,
    3.0,
    0.3 ],
  month: "Oktober",
  year: 2023,
  history: [
    ['Valresultatet 2022',6.8,5.1,30.3,6.7,4.6,19.1,5.3,20.5,1.5],
    ['Juni (2023)', 7.8,5.0,36.6,4.3,3.0,18.5,4.1,18.3,2.4],
    ['September (2023)',7.6,5.2,38.6,4.0,3.0,18.4,2.6,19.0,1.5],
    ['Oktober (2023)',8.1,4.8,37.9,4.1,2.3,16.1,2.9,22.0,1.8],
  ],
}

const blockData = {
  results: [ 43.3, 54.9 ], 
  seriesNames:  [ 'M/L/KD/SD', 'S/V/MP/C', ],
  seriesColors : {
    m:  partyData.seriesColors.m,
    s:  partyData.seriesColors.s,
  },
  history: [
    ['Valresultatet 2022', 49.5, 48.9],
    ['Juni (2023)', 43.9, 53.7],
    ['September (2023)', 43.0, 55.4],
    ['Oktober (2023)', 43.3, 54.9],
  ],
}

const ministerData = {
  results: [45,  18,  17,  20],
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
  history: [
    ['September (2023)',  48,  22,  13,  17],
    ['Oktober (2023)',  45,  18,  17,  20],
    ],
}


// Constructor for options object
function Options() {
  this.title = `Väljarbarometer ${partyData.month} ${partyData.year}`,
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
  drawChange(partyData, 'changeChart');
  drawStacked(partyData, 'stackedChart');
  drawBarsV(partyData, 'barChartV');
  drawLines(partyData, 'lineChart');
  drawLines(blockData, 'lineChartByBlock');
  drawLines(ministerData, 'lineChartByMinister');
  drawTable(partyData, 'table', true);
  drawTable(partyData, 'table2', false);
}

// Listen for window resize and redraw charts 
window.onresize = drawCharts;


// FUNCTIONS TO DRAW CHARTS

// Columns for change since last
function drawChange(dataObject, chartId) {

  const options = new Options();
  options.legend = {position: 'none'};
  
  const data = new google.visualization.arrayToDataTable([
    ['', ...dataObject.seriesNames],
    ['Förändring sedan senaste mätning ', ...dataObject.changeSinceLast],
  ]);

  const chart = new google.visualization.ColumnChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}

// Stacked for spread across categories
function drawStacked(dataObject, chartId) {

  const options = new Options();
  options.isStacked = 'percent';
  
  const data = new google.visualization.arrayToDataTable([
    ['', ...dataObject.seriesNames],
    ['', ...dataObject.results],
  ]);

  const chart = new google.visualization.BarChart(
    document.getElementById(chartId)
    );

  chart.draw(data, options);
}



// Columns for spread across categories
function drawBarsV(dataObject, chartId) {

  const options = new Options();
  options.legend = {position: 'none'};

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
function drawLines(dataObject, chartId) {

  const options = new Options();
  options.colors = Object.values(dataObject.seriesColors);
 
  const data = new google.visualization.arrayToDataTable([
    ['', ...(
      dataObject.longSeriesNames ? 
      dataObject.longSeriesNames : 
      dataObject.seriesNames)],
    ...dataObject.history
    ]);

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
    ...dataObject.history
    ]));
  } else {
    data = new google.visualization.arrayToDataTable([
    ['', ...dataObject.seriesNames],
    ...dataObject.history
    ]);
  }

  const table = new google.visualization.Table(
    document.getElementById(chartId)
    );
  
  table.draw(data, options);
}
