const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productName");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const quantityInput = document.getElementById("quantity");
const colorInput = document.getElementById("color");
const imageInput = document.getElementById("image");
const clearBtn = document.getElementById("clearBtn");

const validators = {
  productName: (value) => value.length >= 2,
  category: (value) => value.length >= 2,
  price: (value) => /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) > 0,
  quantity: (value) => /^\d+$/.test(value) && parseInt(value, 10) > 0,
  color: (value) => value.length >= 2,
  image: () => imageInput.files && imageInput.files.length > 0,
};

const errorMessages = {
  productName: "Product name must be at least 2 characters.",
  category: "Category must be at least 2 characters.",
  price: "Price must be a positive number.",
  quantity: "Quantity must be a positive whole number.",
  color: "Color must be at least 2 characters.",
  image: "Please upload an image.",
};

function showInvalid(field, message) {
  field.classList.remove("border-green-500");
  field.classList.add("border-red-500");
  const error = document.getElementById(`${field.id}Error`);
  if (error) {
    error.textContent = message;
    error.classList.remove("hidden");
  }
}

function showValid(field) {
  field.classList.remove("border-red-500");
  field.classList.add("border-green-500");
  const error = document.getElementById(`${field.id}Error`);
  if (error) {
    error.textContent = "";
    error.classList.add("hidden");
  }
}

function validateField(field) {
  const value = field.type === "file" ? null : field.value.trim();
  const valid = validators[field.id](value);
  if (!valid) {
    showInvalid(field, errorMessages[field.id]);
  } else {
    showValid(field);
  }
  return valid;
}

function validateImageField() {
  const valid = validators.image();
  if (!valid) {
    showInvalid(imageInput, errorMessages.image);
  } else {
    showValid(imageInput);
  }
  return valid;
}

function validateForm() {
  const checks = [
    validateField(productNameInput),
    validateField(categoryInput),
    validateField(priceInput),
    validateField(quantityInput),
    validateField(colorInput),
    validateImageField(),
  ];
  return checks.every(Boolean);
}

function resetForm() {
  productForm.reset();
  [productNameInput, categoryInput, priceInput, quantityInput, colorInput, imageInput].forEach((field) => {
    field.classList.remove("border-red-500", "border-green-500");
    const error = document.getElementById(`${field.id}Error`);
    if (error) {
      error.textContent = "";
      error.classList.add("hidden");
    }
  });
}

if (productForm) {
  [productNameInput, categoryInput, priceInput, quantityInput, colorInput].forEach((input) => {
    input.addEventListener("input", () => validateField(input));
  });

  imageInput.addEventListener("change", validateImageField);

  productForm.addEventListener("submit", (e) => {
    if (!validateForm()) {
      e.preventDefault();
    }
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", resetForm);
}
