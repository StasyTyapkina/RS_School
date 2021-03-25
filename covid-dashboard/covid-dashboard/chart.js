/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import Chart from 'chart.js';
// import ChartDataLabels from 'chart.js';

const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  // plugins: [ChartDataLabels],
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels: ['Feb.', 'March', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
    datasets: [{
      label: 'Daily cases',
      backgroundColor: 'rgb(233, 161, 161);',
      borderColor: ' rgb(233, 161, 161)',
      data: [0, 10, 5, 15, 20, 25, 30, 35, 40, 35, 45],
    }],
  },

  // Configuration options go here
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (val) => `€ ${val}`,
      },
    },
  },
});
