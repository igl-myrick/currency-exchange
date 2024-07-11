import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ExchangeService from "./exchange-service";

function getRates(userCurrency) {
  ExchangeService.getConversion()
    .then(function(response) {
      if (response instanceof Error) {
        const errorMessage = `Error: ${response.message}`;
        throw new Error(errorMessage);
      }
      return response.conversion_rates[userCurrency];
    });
}

function handleUSDConversion(event) {
  event.preventDefault();
  document.querySelector("#output").innerText = null;
  const selectedAmount = parseFloat(document.querySelector("#usd-amount").value);
  const selectedCurrency = document.querySelector("#currency-to-convert").value;
  const outputP = document.createElement("p");
  outputP.append(`$${selectedAmount} USD is ___ ${selectedCurrency}`);
  document.querySelector("#output").append(outputP);
  getRates(selectedCurrency);
}

window.addEventListener("load", function() {
  document.querySelector("#usd-conversion").addEventListener("submit", handleUSDConversion);
});