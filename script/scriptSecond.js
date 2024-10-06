// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD8RdguFfTPgERlQQxTt5ZcoDcrdd3_1sU",
  authDomain: "realproperty-94648.firebaseapp.com",
  databaseURL: "https://realproperty-94648.firebaseio.com",
  projectId: "realproperty-94648",
  storageBucket: "realproperty-94648.appspot.com",
  messagingSenderId: "439144328697",
  appId: "1:439144328697:web:7888406bd4f53d32bd2128",
  measurementId: "G-F5GBF9JG1J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const houseRef = database.ref('houses');

const propertiesPerPage = 2; // Number of properties to display per page
let currentPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1; // Current page number
let sortBy = new URLSearchParams(window.location.search).get('sort') || 'title'; // Sorting criterion
const locationParam = new URLSearchParams(window.location.search).get('location');
const minPriceParam = new URLSearchParams(window.location.search).get('minPrice');
const maxPriceParam = new URLSearchParams(window.location.search).get('maxPrice');

// Fetch and display houses with filtering and sorting
async function fetchAndDisplayHouses() {
  const snapshot = await houseRef.once('value');
  const houses = [];

  snapshot.forEach(function(childSnapshot) {
      const houseData = childSnapshot.val();

      // Check if the house matches the current filter criteria
      if (checkSearchData(houseData) && checkFilterType(houseData)) {
          houses.push({
              id: childSnapshot.key,
              data: houseData
          });
      }
  });

  // Sort houses based on the selected sorting criterion
  sortHouses(houses);

  const totalPages = Math.ceil(houses.length / propertiesPerPage);
  displayHouses(houses, totalPages);
}

// Check if the house matches the filter type
function checkFilterType(houseData) {
  const filterApartment = document.getElementById('filter-apartment').checked;
  const filterHouse = document.getElementById('filter-house').checked;

  // If no filters are selected, show all houses
  if (!filterApartment && !filterHouse) {
      return true;
  }

  // Match based on selected filters
  if (filterApartment && houseData.type === 'Apartment') {
      return true;
  }
  if (filterHouse && houseData.type === 'House') {
      return true;
  }

  return false;
}

// Add event listeners for filter checkboxes
document.getElementById('filter-apartment').addEventListener('change', fetchAndDisplayHouses);
document.getElementById('filter-house').addEventListener('change', fetchAndDisplayHouses);

// Function to sort houses based on the selected criterion
function sortHouses(houses) {
  houses.sort((a, b) => {
      if (sortBy === 'title') {
          return a.data.title.localeCompare(b.data.title);
      } else if (sortBy === 'price') {
          return a.data.price - b.data.price;
      }
  });
}

// Function to display houses on the current page
function displayHouses(houses, totalPages) {
  const mainHouseContainer = document.getElementById('houses-container');
  mainHouseContainer.innerHTML = ''; // Clear the container

  const start = (currentPage - 1) * propertiesPerPage;
  const end = start + propertiesPerPage;
  const housesToShow = houses.slice(start, end);

  housesToShow.forEach(house => {
      const houseDiv = createHouseDiv(house.data, house.id);
      mainHouseContainer.appendChild(houseDiv);
  });

  updatePaginationControls(currentPage, totalPages);
  showPaginationControls(); // Show pagination controls after data is loaded
  showFooter(); // Show footer after data is loaded
}

// Function to create a div for a house
function createHouseDiv(houseData, houseId) {
  const housesContainer = document.createElement('div');
  housesContainer.className = 'house-internal';

  const houseDiv = document.createElement('div');
  houseDiv.className = 'house';

  const title = document.createElement('h2');
  title.textContent = houseData.title;

  const price = document.createElement('p');
  price.textContent = 'Price: ' + houseData.price;

  const location = document.createElement('p');
  location.textContent = 'Location: ' + houseData.location;

  const image = document.createElement('img');
  image.src = houseData.imageUrls;

  const detailsButton = document.createElement('button');
  detailsButton.textContent = 'Details';
  detailsButton.setAttribute('data-id', houseId);
  detailsButton.addEventListener('click', function(event) {
      const propertyId = event.target.getAttribute('data-id');
      window.location.href = `details.html?id=${propertyId}`;
  });

  houseDiv.appendChild(title);
  houseDiv.appendChild(price);
  houseDiv.appendChild(location);
  houseDiv.appendChild(detailsButton);

  const imageDiv = document.createElement('div');
  imageDiv.className = 'image';
  imageDiv.appendChild(image);

  housesContainer.appendChild(imageDiv);
  housesContainer.appendChild(houseDiv);

  return housesContainer;
}

// Function to update pagination controls
function updatePaginationControls(currentPage, totalPages) {
  const prevButton = document.getElementById('prevPageBtn');
  const nextButton = document.getElementById('nextPageBtn');
  const pageNumberSpan = document.getElementById('pageNumber');

  pageNumberSpan.textContent = currentPage;

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  prevButton.onclick = () => changePage(currentPage - 1);
  nextButton.onclick = () => changePage(currentPage + 1);
}

// Function to show pagination controls after data has been loaded
function showPaginationControls() {
  const pagination = document.querySelector('.pagination');
  pagination.style.display = 'block'; // Show the pagination controls
}

// Function to show footer after data has been loaded
function showFooter() {
  const footer = document.querySelector('footer');
  footer.style.display = 'block'; // Show the footer
}

// Function to change the current page
function changePage(newPage) {
  currentPage = newPage;
  updateUrlParams('page', newPage);
  fetchAndDisplayHouses();
}

// Function to update URL parameters
function updateUrlParams(key, value) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(key, value);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
}

// Function to check if the house data matches the search criteria
function checkSearchData(houseData) {
  const matchesLocation = locationParam ? houseData.location.toLowerCase() === locationParam.toLowerCase() : true;
  const matchesMinPrice = minPriceParam ? houseData.price >= parseFloat(minPriceParam) : true;
  const matchesMaxPrice = maxPriceParam ? houseData.price <= parseFloat(maxPriceParam) : true;

  return matchesLocation && matchesMinPrice && matchesMaxPrice;
}

// Function to handle sorting selection change
function onSortChange() {
  sortBy = document.getElementById('sort-select').value;
  currentPage = 1; // Reset to the first page
  updateUrlParams('sort', sortBy);
  updateUrlParams('page', currentPage);
  fetchAndDisplayHouses(); // Fetch and display houses with new sorting
}

// Hide the pagination and footer initially
document.querySelector('.pagination').style.display = 'none';
document.querySelector('footer').style.display = 'none';

// Add event listener to the sort select dropdown
document.getElementById('sort-select').addEventListener('change', onSortChange);

// Initialize the page by fetching and displaying houses
fetchAndDisplayHouses();
