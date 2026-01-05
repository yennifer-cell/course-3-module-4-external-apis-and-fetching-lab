const fetchBtn = document.getElementById('fetch-btn');
const stateInput = document.getElementById('state-input');
const alertsDiv = document.getElementById('alerts');
const errorDiv = document.getElementById('error-message');

fetchBtn.addEventListener('click', () => {
  const state = stateInput.value.trim().toUpperCase();

  // Input validation: must be two letters
  if (!/^[A-Z]{2}$/.test(state)) {
    showError('Please enter a valid two-letter state abbreviation.');
    return;
  }

  fetchWeatherAlerts(state);
});

function fetchWeatherAlerts(state) {
  // Clear previous data and errors
  alertsDiv.innerHTML = '';
  errorDiv.style.display = 'none';
  errorDiv.textContent = '';

  // Show loading message
  alertsDiv.innerHTML = '<p class="loading">Loading alerts...</p>';

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // For testing
      displayAlerts(data, state);
    })
    .catch(error => {
      showError(error.message);
      alertsDiv.innerHTML = '';
    });

  // Clear input
  stateInput.value = '';
}

function displayAlerts(data, state) {
  const alerts = data.features;
  alertsDiv.innerHTML = '';

  if (alerts.length === 0) {
    alertsDiv.textContent = `No active alerts for ${state}.`;
    return;
  }

  // Summary
  const summary = document.createElement('p');
  summary.textContent = `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
  alertsDiv.appendChild(summary);

  // List of alert headlines
  const ul = document.createElement('ul');
  alerts.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline || 'No headline available';
    ul.appendChild(li);
  });
  alertsDiv.appendChild(ul);
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}
