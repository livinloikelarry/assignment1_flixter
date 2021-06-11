console.log("page loaded");

// global constants
// api key needed in url
const myApi = "dff92858cb542d34fe71442401efe943";
const pageSize = "9";
const baseUrl = "https://api.themoviedb.org/3";
// global variables
var currentApiPage = 1;
var currentSearchTerm = "";

//page elements
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const posterArea = document.querySelector(".moviePosters");
const showMoreBtn = document.querySelector("#show-more-btn");

// get search results from API and call displayResults so that
// they are visible to the user
async function getResults() {
  //const offset = currentApiPage * pageSize;
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&language=en-US&page=${currentApiPage}`
  );
  let jsonResponse = await response.json();
  let responseData = jsonResponse.results;
  // will call function on each element in the array
  responseData.forEach((el) => displayResults(el));
}

// this function inserts html so that posters display
function displayResults(movieData) {
  let imagePath = movieData.poster_path;
  urlOfPoster = `https://image.tmdb.org/t/p/w500/${imagePath}`;
  //console.log(movieData); <-- a previous console log to show the key:value pairs
  //   posterArea.innerHTML += `<img src="${urlOfPoster}" alt="${movieData.title}"></img>`;
  posterArea.innerHTML += `<div class = "individualMovie">
  <img src="${urlOfPoster}" alt="${movieData.title}"></img>
  <div class = "name-rating">
    <h4>${movieData.title}</h4>
    <div id = "rating">
      <p> ⭐ ${movieData.vote_average}</p>
    </div>
  </div>
</div>`;
}

// important function call that displays "now playing" movies
getResults();

// /** On form submit, get results and add to list. */
async function handleFormSubmit(event) {
  event.preventDefault();
  posterArea.innerHTML = "";
  // to access the value that the user typed in
  currentSearchTerm = searchInput.value;
  console.log("the word that you searched:", currentSearchTerm);
  // getting response from API
  const results = await getSearchResults(currentSearchTerm);
  // resetting the search input to nothing
  searchInput.value = "";
  currentApiPage++;
}

async function getSearchResults(searchTerm) {
  //const offset = currentApiPage * pageSize;
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${myApi}&language=en-US&query=${searchTerm}&page=${currentApiPage}&include_adult=false`
  );
  let jsonResponse = await response.json();
  let responseData = jsonResponse.results;
  console.log(responseData);
  // will call function on each element in the array
  responseData.forEach((el) => displayResults(el));
}

searchForm.addEventListener("submit", handleFormSubmit);

async function handleShowMoreClick(event) {
  //increase the value of the api page so that more results are shown
  currentApiPage++;
  console.log(
    "the load button was clicked and the current page num is:",
    currentApiPage
  );
  const results = await getResults();
}

showMoreBtn.addEventListener("click", handleShowMoreClick);
