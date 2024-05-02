
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

 
  //Registration start
  //firebase.database() can be called with no arguments to access the default app's
  // Database service or as firebase.database(app) to 
  //access the Database service associated with a specific app.
  //
//ref za da moga da pravq zaqvki 
//reference represents a specific location in your Database and can be used for reading or writing data to that Database location.
// Reference to your Firebase database
const database = firebase.database();
var houseRef = firebase.database().ref('houses');


// Function to fetch houses data from Firebase and display them
houseRef.once('value', function(snapshot) {
    var mainHouseContainer = document.getElementById('houses-container');
    snapshot.forEach(function(childSnapshot) {
        var houseData = childSnapshot.val();
            //addHouseToPage(houseData);
            var housesContainer = document.createElement('div');
            housesContainer.className = 'house-internal';

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
            image.src = houseData.imageUrl;

            // Append elements to houseDiv
            houseDiv.appendChild(title);
            houseDiv.appendChild(price);
            houseDiv.appendChild(location);
            houseDiv.appendChild(description);
            
            
            var imageDiv = document.createElement('div');
            imageDiv.className = 'image';
            imageDiv.appendChild(image);

            housesContainer.appendChild(houseDiv);
            housesContainer.appendChild(imageDiv);

            mainHouseContainer.appendChild(housesContainer);
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
    image.src = houseData.imageUrl;

    // Append elements to houseDiv
    houseDiv.appendChild(title);
    houseDiv.appendChild(description);
    houseDiv.appendChild(price);
    houseDiv.appendChild(location);
  //  houseDiv.appendChild(image); // Append the image


    // Append houseDiv to housesContainer
    housesContainer.appendChild(houseDiv);
    housesContainer.appendChild(image);

    housesContainer2.appendChild(housesContainer);
    //housesContainer.appendChild(image);
    //housesContainer.appendChild(image);
}