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
      } else if (!response.conversion_rates[userCurrency]) {
        return document.querySelector("#output").append("Please enter a valid currency.");
      }
      printElements(response.conversion_rates[userCurrency], userCurrency);
    });
}

function printElements(rate, currency) {
  const amount = document.querySelector("#usd-amount").value;
  if (amount.match(/[^0-9.]/g)) {
    document.querySelector("#output").append("Please enter a valid number.");
  } else {
    document.querySelector("#output").append(`$${amount} USD is ${(parseFloat(amount) * rate).toFixed(3)} ${currency}`);
  }
}

function handleUSDConversion(event) {
  event.preventDefault();
  document.querySelector("#output").innerText = null;
  const currency = document.querySelector("#currency-to-convert").value.toUpperCase();
  if (currency.length !== 3) {
    document.querySelector("#output").innerText = "Please enter a valid 3-letter currency code.";
  } else {
    getRates(currency);
  }
}

window.addEventListener("load", function() {
  document.querySelector("#usd-conversion").addEventListener("submit", handleUSDConversion);
});