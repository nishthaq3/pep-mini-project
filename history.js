const historyList = document.getElementById("historyList");

// Read history
const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

if (history.length === 0) {
  historyList.innerHTML = "<li>No search history found</li>";
} else {

  // Show latest first
  history.reverse().forEach(item => {

    const li = document.createElement("li");

    // Convert timestamp to readable time
    const date = new Date(item.time);
    const formattedTime = date.toLocaleString();

    li.textContent = `${item.query}  →  ${formattedTime}`;

    historyList.appendChild(li);
  });
}
const clearBtn = document.getElementById("clearHistoryBtn");

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("searchHistory");
  location.reload();
});

