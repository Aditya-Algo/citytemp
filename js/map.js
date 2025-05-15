const apiKey = CONFIG.WEATHERSTACK_API_KEY;

const map = L.map('map').setView([22.9734, 78.6569], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 7,
  minZoom: 5,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const cities = [
  { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
  { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
  { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
];

cities.forEach(city => {
  const marker = L.marker([city.lat, city.lon]).addTo(map);

  marker.on('click', () => {
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city.name)}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.success === false || !data.current) {
          marker.bindPopup(`<b>${city.name}</b><br>Error: ${data.error?.info || "Weather data not found."}`).openPopup();
        } else {
          const temp = data.current.temperature;
          const desc = data.current.weather_descriptions[0];
          const icon = data.current.weather_icons[0];
          marker.bindPopup(`
            <b>${city.name}</b><br>
            <img src="${icon}" width="40" height="40" /><br>
            Temperature: ${temp}°C<br>
            ${desc}
          `).openPopup();
        }
      })
      .catch(err => {
        marker.bindPopup(`<b>${city.name}</b><br>Error fetching weather.`).openPopup();
      });
  });
});