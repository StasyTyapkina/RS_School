/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
// import 'https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js'

class Map {
  constructor() {
   
    const url = 'https://corona.lmao.ninja/v2/countries';

    const mapbox_token = 'pk.eyJ1IjoidHlhcGtpbmEiLCJhIjoiY2tpc21rZHo1MHlzbTJ0bnl3dm1hcHB5dyJ9.Y-85A8m0cHc6u4PEow2Xgg';
    mapboxgl.accessToken = mapbox_token;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 1.5,
      center: [0, 20],
    });


    this.map.addControl(new mapboxgl.FullscreenControl()); // разворачивает карту на полный экран
    this.map.addControl(new mapboxgl.NavigationControl()); // кнопки масштабирования и компас
    
    let cases = [];

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        cases = data;
        
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
      .catch(() => console.log(`Can’t access ${url} response.`));
  } // end constructor

  getMarkerColorFromCount(count) {
    if (count >= 100) {
      return 'red';
    }
    if (count >= 10) {
      return 'blue';
    }
    return 'gray';
  }
}

const bigMap = new Map();

// export default Map;
