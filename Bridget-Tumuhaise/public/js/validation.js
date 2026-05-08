const form = document.getElementById("purchaseForm");

const itemName = document.getElementById("itemName");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const supplier = document.getElementById("supplier");

function validateField(field, errorId) {
  const errorText = document.getElementById(errorId);

  if (field.value.trim() === "") {
    field.classList.remove("success");
    field.classList.add("error");

    errorText.innerHTML = "Field is required";
    errorText.classList.add("red");
    errorText.classList.remove("green");

    return false;
  } else {
    field.classList.remove("error");
    field.classList.add("success");

    errorText.innerHTML = "Looks good";
    errorText.classList.add("green");
    errorText.classList.remove("red");

    return true;
  }
}

itemName.addEventListener("keyup", () => {
  validateField(itemName, "itemError");
});

quantity.addEventListener("keyup", () => {
  validateField(quantity, "quantityError");
});
