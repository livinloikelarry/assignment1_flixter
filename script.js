console.log("page loaded");

// global constants
// api key needed in url
const myApi = "dff92858cb542d34fe71442401efe943";
const pageSize = "9";
const baseUrl = "https://api.themoviedb.org/3";
// global variables
https: var currentApiPage = 0;
var currentSearchTerm = "";

//page elements
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const posterArea = document.querySelector(".moviePosters");
const showMoreBtn = document.querySelector("#show-more-btn");

// get search results from API
async function getResults() {
  //const offset = currentApiPage * pageSize;
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&language=en-US&page=1`
  );
  let jsonResponse = await response.json();
  let responseData = jsonResponse.results;
  // will call function on each element in the array
  responseData.forEach((el) => displayResults(el));
}

function displayResults(movieData) {
  let imagePath = movieData.poster_path;
  urlOfPoster = `https://image.tmdb.org/t/p/w500/${imagePath}`;
  console.log(movieData);
  //   posterArea.innerHTML += `<img src="${urlOfPoster}" alt="${movieData.title}"></img>`;
  posterArea.innerHTML += `<div class = "individualMovie">
  <img src="${urlOfPoster}" alt="${movieData.title}"></img>
  <div class = "name-rating">
    <h4>${movieData.title}</h4>
    <div id = "rating">
      <p>⭐  ${movieData.vote_average}</p>
    </div>
  </div>
</div>`;
}

getResults();

// /** On form submit, get results and add to list. */
// async function handleFormSubmit(event) {
//   event.preventDefault();
//   posterArea.innerHTML = "";
//   currentSearchTerm = searchInput.value;
//   const results = await getResults(currentSearchTerm);
//   displayResults(results);
//   searchInput.value = "";
//   currentApiPage++;
//   showMoreBtn.classList.remove("hidden");
// }

// searchForm.addEventListener("submit", handleFormSubmit);

// async function handleShowMeMoreClick(event) {
//   const results = await getResults(currentSearchTerm);
//   displayResults(results);
//   currentApiPage++;
// }

// showMoreBtn.addEventListener("click", handleShowMeMoreClick);
