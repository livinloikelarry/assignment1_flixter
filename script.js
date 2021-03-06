console.log("page loaded");

// global constants
// api key needed in url
const myApi = "dff92858cb542d34fe71442401efe943";
const baseUrl = "https://api.themoviedb.org/3";
// global variables
var currentApiPage = 1;
var currentSearchTerm = "";

//page elements
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const posterArea = document.querySelector(".moviePosters");
const showMoreBtn = document.querySelector("#show-more-btn");
const clearBtn = document.querySelector(".clear-btn");

// get search results from API and call displayResults so that
// they are visible to the user
async function getResults() {
  //const offset = currentApiPage * pageSize;
  console.log("inside of getResults. page count:", currentApiPage);
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
  console.log("inside of display results.");
  let imagePath = movieData.poster_path;
  urlOfPoster = `https://image.tmdb.org/t/p/w500/${imagePath}`;
  //console.log(movieData); <-- a previous console log to show the key:value pairs
  posterArea.innerHTML += `<div class = "individualMovie">
  <img src="${urlOfPoster}" alt="${movieData.title}"></img>
  <div class = "name-rating">
    <h3>${movieData.title}</h3>
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
  // clear html
  posterArea.innerHTML = "";
  // to access the value that the user typed in
  currentSearchTerm = searchInput.value;
  console.log("the word that you searched:", currentSearchTerm);
  // getting response from API
  const results = await getSearchResults(currentSearchTerm);
  // resetting the search input to nothing
  searchInput.value = "";
  //currentApiPage++;
}

async function getSearchResults(searchTerm) {
  currentApiPage = 1;
  currentSearchTerm = searchTerm;
  console.log("inside of search results search term is:", currentSearchTerm);
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${myApi}&language=en-US&query=${currentSearchTerm}&page=${currentApiPage}&include_adult=false`
  );
  let jsonResponse = await response.json();
  let responseData = jsonResponse.results;
  console.log(responseData);
  //   currentApiPage = 1;
  console.log("inside of search. count is:", currentApiPage);
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

function handleClearBtn() {
  console.log("THE BUTTON WAS CLICKED");
  // clear the html
  posterArea.innerHTML = "";
  // how many "now playing" pages did the user load?
  console.log("the current api page count is: ", currentApiPage);
  let userPageCount = currentApiPage;
  for (let i = 1; i <= userPageCount; i++) {
    console.log("inside for loop setting currentApiPage = to:", i);
    currentApiPage = userPageCount;
    getResults();
  }
}

showMoreBtn.addEventListener("click", handleShowMoreClick);
clearBtn.addEventListener("click", handleClearBtn);
