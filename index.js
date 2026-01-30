const container = document.getElementById("product-container");
const searchInput = document.getElementById("product");
const searchBtn = document.querySelector("button");

let allProducts = [];

// FETCH PRODUCTS
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;   
    showProducts(allProducts);
  })
  .catch(err => console.log(err));

// DISPLAY PRODUCTS
function showProducts(products) {
  container.innerHTML = "";      

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
    `;

    container.appendChild(card);
  });
}

// SEARCH BUTTON
searchBtn.addEventListener("click", () => {
  const text = searchInput.value.toLowerCase();

  const result = allProducts.filter(product =>
    product.title.toLowerCase().includes(text)
  );

  showProducts(result);
});
