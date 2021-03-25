import API from './api';

export default class GlobalCases {
  constructor(globalCases, newGlobalCases, globalDeaths, newDeaths, deaths,
    toggle, wrapper, nameBlock, btnDR) {
    this.api = new API();
    this.globalCases = globalCases;
    this.newGlobalCases = newGlobalCases;

    this.globalDeaths = globalDeaths;
    this.newDeaths = newDeaths;

    this.deathsByCountry = deaths;
    // this.recoveredByCountry = recovered;
    this.toggle = toggle;
    this.wrapper = wrapper;
    this.nameBlock = nameBlock;
    this.btnDR = btnDR;

    this.casesD = [];
    this.casesDNew = [];
    this.casesR = [];
    this.casesRNew = [];
  }

  renderData() {
    this.api.getSummary()
      .then((data) => {
        const cases = data.Global;
        this.globalCases.innerHTML = cases.TotalConfirmed;
        this.newGlobalCases.innerHTML = `New Cases: ${cases.NewConfirmed}`;

        this.nameBlock.innerHTML = 'Global Deaths';
        this.globalDeaths.innerHTML = cases.TotalDeaths;
        this.newDeaths.innerHTML = `New Cases: ${cases.NewDeaths}`;

        this.casesD = Array.from(data.Countries)
          .sort((a, b) => b.TotalDeaths - a.TotalDeaths);
        this.casesDNew = Array.from(data.Countries)
          .sort((a, b) => b.NewDeaths - a.NewDeaths);
        this.casesR = Array.from(data.Countries)
          .sort((a, b) => b.TotalRecovered - a.TotalRecovered);
        this.casesRNew = Array.from(data.Countries)
          .sort((a, b) => b.NewRecovered - a.NewRecovered);

        const c = this;

        for (let i = 0; i < this.toggle.length; i += 1) {
          this.toggle[i].addEventListener('change', function () {
            if (this.value === 'deaths') {
              document.querySelector('#recovered').setAttribute('checked', 'false');
              document.querySelector('#deaths').setAttribute('checked', 'true');
              c.wrapper.classList.add('globalDeaths');
              c.wrapper.classList.remove('globalRecovered');
              c.nameBlock.innerHTML = 'Global Deaths';
              c.globalDeaths.innerHTML = cases.TotalDeaths;
              c.newDeaths.innerHTML = `New Cases: ${cases.NewDeaths}`;
            }
            if (this.value === 'recovered') {
              document.querySelector('#recovered').setAttribute('checked', 'true');
              document.querySelector('#deaths').setAttribute('checked', 'false');
              c.wrapper.classList.remove('globalDeaths');
              c.wrapper.classList.add('globalRecovered');
              c.nameBlock.innerHTML = 'Global Recovered';
              c.globalDeaths.innerHTML = cases.TotalRecovered;
              c.newDeaths.innerHTML = `New Cases: ${cases.NewRecovered}`;
            }
          });
        }

        function btnHandler(event) {
          const el = event.target;

          if (el.innerHTML === 'all'
            && document.querySelector('#deaths').getAttribute('checked')) {
            el.innerHTML = 'today';
            c.showCases(c.casesD);
          } else if (el.innerHTML === 'today'
          && document.querySelector('#deaths').getAttribute('checked')) {
            el.innerHTML = 'all';
            c.showCases(c.casesDNew);
          } else if (el.innerHTML === 'all'
          && document.querySelector('#recovered').getAttribute('checked')) {
            el.innerHTML = 'today';
            c.showCases(c.casesR);
          } else if (el.innerHTML === 'today'
          && document.querySelector('#recovered').getAttribute('checked')) {
            el.innerHTML = 'all';
            c.showCases(c.casesRNew);
          }
        }

        c.btnDR.addEventListener('click', btnHandler);
        c.showCases(c.casesD);
      });
  }

  showCases(cases) {
    this.cleanBox();

    Array.from(cases).forEach((country) => {
      const line = document.createElement('div');
      const count = document.createElement('p');
      const name = document.createElement('p');

      line.classList.add('line');
      count.classList.add('count');
      if (this.btnDR.innerHTML === 'all'
        && document.querySelector('#deaths').getAttribute('checked')) {
        count.innerHTML = country.NewDeaths;
      } else if (this.btnDR.innerHTML === 'today'
      && document.querySelector('#deaths').getAttribute('checked')) {
        count.innerHTML = country.TotalDeaths;
      } else if (this.btnDR.innerHTML === 'all'
        && document.querySelector('#recovered').getAttribute('checked')) {
        count.innerHTML = country.NewRecovered;
      } else if (this.btnDR.innerHTML === 'today'
        && document.querySelector('#recovered').getAttribute('checked')) {
        count.innerHTML = country.TotalRecovered;
      }

      name.innerHTML = country.Country;

      line.append(count);
      line.append(name);
      this.deathsByCountry.append(line);
    });
  }

  cleanBox() {
    this.deathsByCountry.innerHTML = '';
  }
}
