// handle vehicle form submission
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", async (e) => {
  const productName = document.getElementById("productName").value.trim();
  const category = document.getElementById("category").value.trim();
  const price = document.getElementById("price").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const color = document.getElementById("color").value.trim();
  const image = document.getElementById("image").value;

  if (!validateName(productName)) {
    e.preventDefault();
    showError("productName", "Please enter a valid Product Name).");
    return;
  }
  clearError("productName");

  if (!validateCategory(category)) {
    e.preventDefault();
    showError("category", "Please enter a valid Product Category).");
    return;
  }
  clearError("category");

  if (!validateColor(color)) {
    e.preventDefault();
    showError("color", "Please enter a valid color.");
    return;
  }
  clearError("color");

  if (!validateUGX(price)) {
    e.preventDefault();
    showError("price", "Please enter a valid price.");
    return;
  }
  clearError("price");

    if (!validateQty(quantity)) {
    e.preventDefault();
    showError("quantity", "Please enter a valid quantity.");
    return;
  }
  clearError("quantity");

  if (!image) {
    e.preventDefault();
    showError("image", "Please upload image.");
    return;
  }
  clearError("image");
});