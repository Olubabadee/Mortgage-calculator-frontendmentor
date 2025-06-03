// // script.js

// // Select inputs
// const mortgageAmount = document.getElementById("mortgageAmount");
// const mortgageItem = document.getElementById("mortgageItem");
// const interestRate = document.getElementById("interestRate");

// // Select radio buttons
// const repaymentRadio = document.getElementById("repayment");
// const interestOnlyRadio = document.getElementById("interestOnly");

// // Select the calculate button
// const calculateBtn = document.querySelector(".calculate-button");

// // Select result display areas
// const monthlyPaymentOutput = document.querySelector(".monthly-payments span");
// const totalPaymentOutput = document.querySelector(".total-payment");

// // CLEAR BUTTON
// const clearButton = document.querySelector(".clear");

// clearButton.addEventListener("click", function (e) {
//   e.preventDefault(); // Prevent the default anchor link behavior

//   // Clear all input fields
//   mortgageAmount.value = "";
//   mortgageItem.value = "";
//   interestRate.value = "";

//   // Uncheck radio buttons
//   repaymentRadio.checked = false;
//   interestOnlyRadio.checked = false;

//   // Clear the result outputs
//   monthlyPaymentOutput.textContent = "0.00";
//   totalPaymentOutput.textContent = "$0.00";
// });

// function validateInputs() {
//   const mortgageAmount = document.getElementById("mortgageAmount").value.trim();
//   const mortgageItem = document.getElementById("mortgageItem").value.trim();
//   const interestRate = document.getElementById("interestRate").value.trim();
//   const repaymentChecked = document.getElementById("repayment").checked;
//   const interestOnlyChecked = document.getElementById("interestOnly").checked;

//   if (!mortgageAmount || isNaN(mortgageAmount) || Number(mortgageAmount) < 1) {
//     alert("Please enter a valid Mortgage Amount.");
//     return false;
//   }

//   if (!mortgageItem || isNaN(mortgageItem) || Number(mortgageItem) < 1) {
//     alert("Please enter a valid Mortgage Item (term in years).");
//     return false;
//   }

//   if (!interestRate || isNaN(interestRate) || Number(interestRate) <= 0) {
//     alert("Please enter a valid Interest Rate.");
//     return false;
//   }

//   if (!repaymentChecked && !interestOnlyChecked) {
//     alert("Please select a Mortgage Type.");
//     return false;
//   }

//   return true;
// }

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
