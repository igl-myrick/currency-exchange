import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ExchangeService from "./exchange-service";

function getUSDRates(userCurrency) {
  ExchangeService.getConversion(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
    .then(function(response) {
      if (response instanceof Error) {
        const errorMessage = `Error: ${response.message}`;
        printError("usd", errorMessage);
      } else if (!response.conversion_rates[userCurrency]) {
        return printError("usd", "Please enter a valid currency.");
      }
      printConversion("usd", response.conversion_rates[userCurrency], response.base_code, userCurrency);
    });
}

function getPairRate(currency1, currency2) {
  ExchangeService.getConversion(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}`)
    .then(function(response) {
      if (!response.conversion_rate) {
        return printError("pair", "Please enter a valid currency.");
      } else if (response instanceof Error) {
        const errorMessage = `Error: ${response.message}`;
        return printError("pair", errorMessage);
      }
      printConversion("pair", response.conversion_rate, currency1, currency2);
    });
}

function printError(type, error) {
  document.querySelector(`#${type}-conversion-output`).append(error);
}

function printConversion(type, rate, currency1, currency2) {
  const amount = document.querySelector("#usd-amount").value;
  if (amount.match(/[^0-9.]/g)) {
    document.querySelector(`#${type}-conversion-output`).append("Please enter a valid number.");
  } else {
    document.querySelector(`#${type}-conversion-output`).append(`$${amount} ${currency1} is ${(parseFloat(amount) * rate).toFixed(3)} ${currency2}.`);
  }
}

function handleUSDConversion(event) {
  event.preventDefault();
  document.querySelector("#usd-conversion-output").innerText = null;
  const currency = document.querySelector("#currency-to-convert").value.toUpperCase();
  if (currency.length !== 3) {
    document.querySelector("#usd-conversion-output").innerText = "Please enter a valid 3-letter currency code.";
  } else {
    getUSDRates(currency);
  }
}

function handlePairConversion(event) {
  event.preventDefault();
  document.querySelector("#pair-conversion-output").innerText = null;
  const currency1 = document.querySelector("#currency1").value.toUpperCase();
  const currency2 = document.querySelector("#currency2").value.toUpperCase();
  if (currency1.length === 3 && currency2.length === 3) {
    getPairRate(currency1, currency2);
  } else {
    document.querySelector("#pair-conversion-output").innerText = "Please enter a valid 3-letter currency code.";
  }
}

window.addEventListener("load", function() {
  document.querySelector("#usd-conversion").addEventListener("submit", handleUSDConversion);
  document.querySelector("#pair-conversion").addEventListener("submit", handlePairConversion);
});