import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import API from './api';

export default class StatisticsChart {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.chart = null;
    this.api = new API();
    this.data = null;
  }

  getData() {
    this.api.getAll()
      .then((data) => {
        this.data = data;
        console.log(this.data);
      });
  }

  renderChart() {
    this.chart = new Chart(this.ctx, {
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
            color: 'rgb(233, 161, 161);',
            anchor: 'end',
            align: 'start',
            formatter: (val) => `${val}`,
          },
        },
      },
    });
  }
}