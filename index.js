document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#state-input')
  const button = document.querySelector('#fetch-alerts')
  const alertsDisplay = document.querySelector('#alerts-display')
  const errorDiv = document.querySelector('#error-message')

  button.addEventListener('click', () => {
    const state = input.value.trim().toUpperCase()

    fetchWeatherAlerts(state)

    // Clear input immediately after click
    input.value = ''
  })

  function fetchWeatherAlerts(state) {
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log(data)

        // Clear any previous errors
        errorDiv.textContent = ''
        errorDiv.classList.add('hidden')

        displayAlerts(data)
      })
      .catch(error => {
        alertsDisplay.innerHTML = ''
        errorDiv.textContent = error.message
        errorDiv.classList.remove('hidden')
        console.log(error.message)
      })
  }

  function displayAlerts(data) {
    // Clear previous alerts
    alertsDisplay.innerHTML = ''

    const alertCount = data.features.length

    const summary = document.createElement('h3')
    summary.textContent = `${data.title}: ${alertCount}`
    alertsDisplay.appendChild(summary)

    data.features.forEach(alert => {
      const p = document.createElement('p')
      p.textContent = alert.properties.headline
      alertsDisplay.appendChild(p)
    })
  }
})

fetch(`https://api.weather.gov/alerts/active?area=${state}`)

Weather Alerts: 2
Flood warning in your area
Tornado watch for the region

input.value = ''




