document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("state-input");
  const button = document.getElementById("fetch-alerts");
  const display = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  button.addEventListener("click", async () => {
    const state = input.value.trim().toUpperCase();

    const url = `https://api.weather.gov/alerts/active?area=${state}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      const alerts = data.features || [];

      // Clear error message on success
      errorDiv.textContent = "";
      errorDiv.classList.add("hidden");

      // Render alerts
      display.innerHTML = `
        Weather Alerts: ${alerts.length}
        <ul>
          ${alerts.map(a => `<li>${a.properties.headline}</li>`).join("")}
        </ul>
      `;

      // Clear input field
      input.value = "";

    } catch (error) {
      // Show error message
      errorDiv.classList.remove("hidden");
      errorDiv.textContent = error.message;
    }
  });
});




