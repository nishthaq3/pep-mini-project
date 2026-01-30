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
    updateSuggestions(); // ✅ load suggestions on page load
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
  const query = searchInput.value.toLowerCase();

  const result = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );

  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  const exists = history.some(item => item.query === query);

  if (query && !exists) {
    history.push({
      query: query,
      time: Date.now()
    });
    localStorage.setItem("searchHistory", JSON.stringify(history));
    updateSuggestions(); 
  }

  showProducts(result);
});

function updateSuggestions() {
  const datalist = document.getElementById("searchSuggestions");
  datalist.innerHTML = "";

  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  history.forEach(item => {
    const option = document.createElement("option");
    option.value = item.query;
    datalist.appendChild(option);
  });
}
