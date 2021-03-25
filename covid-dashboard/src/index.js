/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import './css/main.css';
import './scss/main.scss';
import Map from './components/map.js';
import GlobalCases from './components/globalCases.js';
import CasesByCountry from './components/casesByCountry.js';
import StatisticsChart from './components/chart.js';

const globalCases = document.querySelector('#globalCases');
const newGlobalCases = document.querySelector('#newGlobalCases');

const casesByCountry = document.querySelector('#casesByCountry');
const btn = document.querySelector('#todayGlobal');

const globalDeaths = document.querySelector('#globalDeaths');
const newDeaths = document.querySelector('#newDeaths');
const toggle = document.querySelectorAll('input[name="dr"]');
const wrapper = document.querySelector('.globalDeaths');
const nameBlock = document.querySelector('#nameBlock');

const deaths = document.querySelector('#deathsCasesByCountry');
// const recovered = document.querySelector('#recoveredCasesByCountry');
const btnDR = document.querySelector('.global-deaths-recovered');

const canvas = document.querySelector('#myChart');

const global = new GlobalCases(globalCases, newGlobalCases,
  globalDeaths, newDeaths, deaths, toggle,
  wrapper, nameBlock, btnDR);
global.renderData();

const casesByCountryTable = new CasesByCountry(casesByCountry, btn);
casesByCountryTable.render();

const chart = new StatisticsChart(canvas);
chart.renderChart();
// chart.getData();

const bigMap = new Map();
