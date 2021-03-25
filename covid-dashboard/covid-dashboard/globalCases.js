/* eslint-disable no-unused-vars */
class GlobalCases {
  constructor() {
    this.url = 'https://api.covid19api.com/summary';
    this.globalCases = document.querySelector('#globalCases');
    this.newGlobalCases = document.querySelector('#newGlobalCases');
    this.globalDeaths = document.querySelector('#globalDeaths');
    this.globalRecovered = document.querySelector('#globalRecovered');
    this.newDeaths = document.querySelector('#newDeaths');
    this.newRecovered = document.querySelector('#newRecovered');

    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        const cases = data.Global;
        // console.log(data);
        this.globalCases.innerHTML = cases.TotalConfirmed;
        this.newGlobalCases.innerHTML = `New Cases: ${cases.NewConfirmed}`;
        this.globalDeaths.innerHTML = cases.TotalDeaths;
        this.newDeaths.innerHTML = `New Cases: ${cases.NewDeaths}`;
        this.globalRecovered.innerHTML = cases.TotalRecovered;
        this.newRecovered.innerHTML = `New Cases: ${cases.NewRecovered}`;
      })
      .catch(() => console.log(`Can’t access ${this.url} response.`));
  }
}

const global = new GlobalCases();
