import mapboxgl from 'mapbox-gl';
import { MAPBOX_TOKEN, MAP_COLORS } from './constants';

/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable camelcase */

const DATA_URL = 'https://corona.lmao.ninja/v2/countries';

export default class Map {
  constructor() {
    // this.containerForMap = document.createElement('div');
    // this.containerForMap.id = 'map';
    // this.wrapper = document.querySelector('.map');
    // this.wrapper.append(this.containerForMap);

    mapboxgl.accessToken = MAPBOX_TOKEN;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 1.5,
      center: [0, 20],
    });

    this.map.addControl(new mapboxgl.FullscreenControl()); // разворачивает карту на полный экран
    this.map.addControl(new mapboxgl.NavigationControl()); // кнопки масштабирования и компас

    let cases = [];

    fetch(DATA_URL)
      .then((response) => response.json())
      .then((data) => {
        cases = data;
        // console.log(data);

        cases.forEach((country) => {
          const {
            active,
            countryInfo,
          } = country;
          const {
            lat,
            long: lng,
          } = countryInfo;

          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });

          const updatedFormatted = new Date(country.updated).toLocaleString();

          popup.setHTML(`
              <h2>${country.country}</h2>
              <li><strong>Confirmed:</strong> ${country.cases}</li>
              <li><strong>Active cases:</strong> ${active}</li>
              <li><strong>Recovered:</strong> ${country.recovered}</li>
              <li><strong>Deaths:</strong> ${country.deaths}</li> 
              <li><strong>Last Update:</strong> ${updatedFormatted}</li>
            `);

          const marker = new mapboxgl.Marker({
            color: this.getMarkerColorFromCount(active),
          })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(this.map);

          const markerDiv = marker.getElement();

          markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
          markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
        });
      })
      .catch(() => {
        throw new Error(`Can’t access ${DATA_URL} response.`);
      });
  } // end constructor

  getMarkerColorFromCount(count) {
    if (count >= 10000) {
      return MAP_COLORS.red;
    }
    if (count >= 1000) {
      return MAP_COLORS.blue;
    }
    return MAP_COLORS.gray;
  }
}
