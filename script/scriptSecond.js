
//making database to store the names passwords and emails 
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
  firebase.analytics();

const database = firebase.database();
var houseRef = firebase.database().ref('houses');
// Array to store download URLs
var imageUrls = [];

const urlParams = new URLSearchParams(window.location.search);
const locationParam = urlParams.get('location');
const minPriceParam = urlParams.get('minPrice');
const maxPriceParam = urlParams.get('maxPrice');

// Function to fetch houses data from Firebase and display them
houseRef.once('value', function(snapshot) {
    var mainHouseContainer = document.getElementById('houses-container');
    snapshot.forEach(function(childSnapshot) {
        var houseData = childSnapshot.val();
            //Filter data
            if(checkSearchData(houseData)){
            var housesContainer = document.createElement('div');
            housesContainer.className = 'house-internal';

            var houseDiv = document.createElement('div');
            houseDiv.className = 'house';

            var title = document.createElement('h2');
            title.textContent = houseData.title;

           // var description = document.createElement('p');
           // description.textContent = 'Description: ' + houseData.description;

            var price = document.createElement('p');
            price.textContent = 'Price: ' + houseData.price;

            var location = document.createElement('p');
            location.textContent = 'Location: ' + houseData.location;

            var image = document.createElement('img');
            image.src = houseData.imageUrls;
            
            var detailsButton = document.createElement('button');
            detailsButton.textContent = 'Details';
            detailsButton.setAttribute('data-id', childSnapshot.key); // Set data-id attribute with the key

            // Append elements to houseDiv
            houseDiv.appendChild(title);
            houseDiv.appendChild(price);
            houseDiv.appendChild(location);
           // houseDiv.appendChild(description);
            houseDiv.appendChild(detailsButton);
            


            detailsButton.addEventListener('click', function(event) {
              const propertyId = event.target.getAttribute('data-id');
              window.location.href = `details.html?id=${propertyId}`;
          });

            var imageDiv = document.createElement('div');
            imageDiv.className = 'image';
            imageDiv.appendChild(image);
            
            housesContainer.appendChild(imageDiv);
            housesContainer.appendChild(houseDiv);
            mainHouseContainer.appendChild(housesContainer);
            }
        });

});


// Function to dynamically generate HTML for each house and add it to the page
function addHouseToPage(houseData) {
    var housesContainer2 = document.getElementById('houses-container');
    var housesContainer = document.getElementById('house-internal');


    var houseDiv = document.createElement('div');
    houseDiv.className = 'house';

    var title = document.createElement('h2');
    title.textContent = houseData.title;

    var description = document.createElement('p');
    description.textContent = 'Description: ' + houseData.description;

    var price = document.createElement('p');
    price.textContent = 'Price: ' + houseData.price;

    var location = document.createElement('p');
    location.textContent = 'Location: ' + houseData.location;

    var image = document.createElement('img');
    image.src = houseData.imageUrls[0];
    
    
    var detailsButton = document.createElement('button');
    detailsButton.textContent = 'Details';
    
    // Append elements to houseDiv
    houseDiv.appendChild(title);
    houseDiv.appendChild(description);
    houseDiv.appendChild(price);
    houseDiv.appendChild(location);
    houseDiv.appendChild(detailsButton);


    // Append houseDiv to housesContainer
    housesContainer.appendChild(houseDiv);
    housesContainer.appendChild(image);
    //housesContainer.appendChild(detailsButton);

    housesContainer2.appendChild(housesContainer);

}


function checkSearchData(houseData){
  
  if(minPriceParam == '' && maxPriceParam == '' && locationParam == ''){
    return true;
  }
  if((houseData.location.toLowerCase() === locationParam.toLowerCase())
    && (minPriceParam === '' && maxPriceParam >= houseData.price))
  {
  return true;
  }
  if((houseData.location.toLowerCase() === locationParam.toLowerCase())
    && (minPriceParam <= houseData.price && maxPriceParam == ''))
  {
  return true;
  }
  if((houseData.location.toLowerCase() === locationParam.toLowerCase())
        && (minPriceParam <= houseData.price && maxPriceParam >= houseData.price))
  {
    return true;
  }

  if(houseData.location.toLowerCase() != locationParam.toLowerCase()){
    return false;
  }
  return false;
}


