const container = document.getElementById("product-container");
const searchInput = document.getElementById("product");
const searchBtn = document.querySelector("button[type='button']");
const paginationBox = document.getElementById("pagination");

let allProducts = [];


let currentPage = 1;
const perPage = 8;

// FETCH PRODUCTS
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    showProducts();
    updateSuggestions();
  })
  .catch(err => console.log(err));


// DISPLAY PRODUCTS (WITH PAGINATION)
function showProducts(products = allProducts) {

  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const pageItems = products.slice(start, end);

  pageItems.forEach(product => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
    `;

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      window.location.href = `productdetail.html?id=${product.id}`;
    });

    container.appendChild(card);
  });

  showPagination(products.length);
}


// PAGINATION BUTTONS
function showPagination(totalItems) {

  const totalPages = Math.ceil(totalItems / perPage);

  let html = "";

  if (currentPage > 1) {
    html += `<button onclick="changePage(${currentPage - 1})">Prev</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {

    if (i === currentPage) {
      html += `<b style="margin:5px">${i}</b>`;
    } else {
      html += `<button onclick="changePage(${i})">${i}</button>`;
    }
  }

  if (currentPage < totalPages) {
    html += `<button onclick="changePage(${currentPage + 1})">Next</button>`;
  }

  paginationBox.innerHTML = html;
}

function changePage(page) {
  currentPage = page;
  showProducts();
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

  currentPage = 1; // reset page
  showProducts(result);
});



// SEARCH SUGGESTIONS
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
