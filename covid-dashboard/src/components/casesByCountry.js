import API from './api';

export default class CasesByCountry {
  constructor(casesByCountry, btn) {
    this.api = new API();
    this.casesByCountry = casesByCountry;
    this.btn = btn;
    this.cases = [];
    this.casesNew = [];

    this.addFullScreen();
  }

  render() {
    this.api.getSummary()
      .then((data) => {
        this.cases = Array.from(data.Countries)
          .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
        this.casesNew = Array.from(data.Countries)
          .sort((a, b) => b.NewConfirmed - a.NewConfirmed);

        const c = this;

        c.btn.addEventListener('click', c.btnHandler.bind(this));
        window.addEventListener('load', c.showCases(c.cases));
      });
  }

  btnHandler() {
    if (this.btn.innerHTML === 'all') {
      this.btn.innerHTML = 'today';
      this.showCases(this.cases);
    } else {
      this.btn.innerHTML = 'all';
      this.showCases(this.casesNew);
    }
  }

  showCases(cases) {
    this.cleanBox();

    Array.from(cases).forEach((country) => {
      const line = document.createElement('div');
      const count = document.createElement('p');
      const name = document.createElement('p');

      line.classList.add('line');
      count.classList.add('count');
      if (this.btn.innerHTML === 'all') {
        count.innerHTML = country.NewConfirmed;
      } else if (this.btn.innerHTML === 'today') {
        count.innerHTML = country.TotalConfirmed;
      }

      name.innerHTML = country.Country;

      line.append(count);
      line.append(name);
      this.casesByCountry.append(line);
    });
  }

  cleanBox() {
    this.casesByCountry.innerHTML = '';
  }

  addFullScreen() {
    let buttonElement = document.querySelectorAll('.bttn_full_screen');
    let elem = document.querySelectorAll('.cases');
    for (let i = 0; i < buttonElement.length; i += 1) {
      buttonElement[i].addEventListener('click', () => {
        if (!document.fullscreenElement) {
          elem.[i].requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      });
    }
  }
}
