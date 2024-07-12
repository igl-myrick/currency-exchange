import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ExchangeService from "./exchange-service";

function getRates(userCurrency) {
  ExchangeService.getConversion()
    .then(function(response) {
      if (response instanceof Error) {
        const errorMessage = `Error: ${response.message}`;
        document.querySelector("#output").append(errorMessage);
      }
      printElements(response.conversion_rates[userCurrency], userCurrency);
    });
}

function printElements(rate, currency) {
  const amount = parseFloat(document.querySelector("#usd-amount").value);
  document.querySelector("#output").append(`$${amount} USD is ${amount * rate} ${currency}`);
}

function handleUSDConversion(event) {
  event.preventDefault();
  document.querySelector("#output").innerText = null;
  const currency = document.querySelector("#currency-to-convert").value.toUpperCase();
  getRates(currency);
}

window.addEventListener("load", function() {
  document.querySelector("#usd-conversion").addEventListener("submit", handleUSDConversion);
});