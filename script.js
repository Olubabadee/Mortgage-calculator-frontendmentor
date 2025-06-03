// script.js

// DOM Elements

const mortgageAmountInput = document.getElementById("mortgageAmount");
const mortgageItemInput = document.getElementById("mortgageItem");
const interestRateInput = document.getElementById("interestRate");
const repaymentRadio = document.getElementById("repayment");
const interestOnlyRadio = document.getElementById("interestOnly");
const clearButton = document.querySelector(".clear");
const calculateButton = document.querySelector(".calculate-button");
const resultPlaceholder = document.querySelector(".content-1");
const resultDisplay = document.querySelector(".content-2");
const monthlyPaymentsDisplay = document.querySelector(".monthly-payments span");
const totalPaymentDisplay = document.querySelector(".total-payment");

// Clear Form
function clearForm() {
  mortgageAmountInput.value = "";
  mortgageItemInput.value = "";
  interestRateInput.value = "";
  repaymentRadio.checked = false;
  interestOnlyRadio.checked = false;
  resultPlaceholder.style.display = "block";
  resultDisplay.style.display = "none";
}

function showError(input) {
  // Add red outline to the input
  input.style.outline = "2px solid red";

  // If no error message exists yet, insert it
  if (
    !input.nextElementSibling ||
    !input.nextElementSibling.classList.contains("error-message")
  ) {
    const message = document.createElement("small");
    message.textContent = "The field is required";
    message.classList.add("error-message");
    message.style.color = "red";
    message.style.fontSize = "0.75rem";
    message.style.marginTop = "4px";

    input.insertAdjacentElement("afterend", message);
  }
}

function clearError(input) {
  input.style.outline = "none";

  // Remove error message if it exists
  if (
    input.nextElementSibling &&
    input.nextElementSibling.classList.contains("error-message")
  ) {
    input.nextElementSibling.remove();
  }
}

// Validate Inputs
function validateInputs() {
  const errors = [];

  if (!mortgageAmountInput.value || isNaN(mortgageAmountInput.value)) {
    errors.push("Please enter a valid mortgage amount.");
  }

  if (!mortgageItemInput.value || isNaN(mortgageItemInput.value)) {
    errors.push("Please enter a valid mortgage item (in years).");
  }

  if (!interestRateInput.value || isNaN(interestRateInput.value)) {
    errors.push("Please enter a valid interest rate.");
  }

  if (!repaymentRadio.checked && !interestOnlyRadio.checked) {
    errors.push("Please select a mortgage type.");
  }

  return errors;
}

// Calculate Repayment
function calculateRepayment() {
  const errors = validateInputs();

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  const P = parseFloat(mortgageAmountInput.value);
  const years = parseFloat(mortgageItemInput.value);
  const annualRate = parseFloat(interestRateInput.value);
  const isRepayment = repaymentRadio.checked;

  const n = years * 12;
  const r = annualRate / 100 / 12;

  let monthly = 0;
  let total = 0;

  if (isRepayment) {
    const numerator = r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    monthly = P * (numerator / denominator);
  } else {
    monthly = P * r;
  }

  total = monthly * n;

  monthlyPaymentsDisplay.textContent = monthly.toFixed(2);
  totalPaymentDisplay.textContent = `€${total.toFixed(2)}`;

  resultPlaceholder.style.display = "none";
  resultDisplay.style.display = "block";
}

// Event Listeners
clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearForm();
});

calculateButton.addEventListener("click", (e) => {
  e.preventDefault();
  calculateRepayment();
});
