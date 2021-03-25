/* eslint-disable no-unused-vars */
class CasesByCountry {
  constructor() {
    this.url = 'https://api.covid19api.com/summary';
    this.casesByCountry = document.querySelector('#casesByCountry');
    this.btn = document.querySelector('#todayGlobal');
    this.cases = [];
    this.casesNew = [];

    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        this.cases = Array.from(data.Countries)
          .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
        this.casesNew = Array.from(data.Countries)
          .sort((a, b) => b.NewConfirmed - a.NewConfirmed);
        console.log(data.Countries);

        const c = this;

        function btnHandler() {
          if (c.btn.innerHTML === 'all') {
            c.btn.innerHTML = 'today';
            c.showCases(c.cases);
          } else if (c.btn.innerHTML === 'today') {
            c.btn.innerHTML = 'all';
            c.showCases(c.casesNew);
          }
        }

        this.btn.addEventListener('click', btnHandler);
        window.addEventListener('load', this.showCases(this.cases));
      })
      .catch(() => console.log(`Can’t access ${this.url} response.`));
  }

  showCases(cases) {
    const c = this;
    c.cleanBox();

    Array.from(cases).forEach((country) => {
      const line = document.createElement('div');
      const count = document.createElement('p');
      const name = document.createElement('p');

      line.classList.add('line');
      count.classList.add('count');
      if (c.btn.innerHTML === 'all') {
        count.innerHTML = country.NewConfirmed;
      } else if (c.btn.innerHTML === 'today') {
        count.innerHTML = country.TotalConfirmed;
      }

      name.innerHTML = country.Country;

      line.append(count);
      line.append(name);
      c.casesByCountry.append(line);
    });
  }

  cleanBox() {
    this.casesByCountry.innerHTML = '';
  }
}

const casesByCountry = new CasesByCountry();
