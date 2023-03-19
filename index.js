const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");

searchButton.addEventListener("click", search);
searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    search();
  }
});

function search() {
  const query = searchInput.value.trim();
  if (query.length < 3) {
    alert("Введите хотя бы 3 символа для поиска");
    return;
  }

  fetch(`https://api.github.com/search/repositories?q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.total_count === 0) {
        searchResults.innerHTML = "Ничего не найдено";
        return;
      }

      searchResults.innerHTML = "";

      const repos = data.items.slice(0, 10);
      for (const repo of repos) {
        const repoLink = document.createElement("a");
        
        repoLink.href = repo.html_url;
        repoLink.target = "_blank";
        repoLink.innerText = repo.name;

        const description = document.createElement("p");
        description.innerText = repo.description;

        const repoDetails = document.createElement("div");
        repoDetails.classList.add("repo__div");
        repoDetails.appendChild(repoLink);
        repoDetails.appendChild(description);

        searchResults.appendChild(repoDetails);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Произошла ошибка при выполнении запроса");
    });
}
