const newLocal = 'DOMContentLoaded';
document.addEventListener(newLocal, () => {
    // Initialize Firebase
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
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    // Get the property ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    alert(propertyId)
    if (propertyId) {
        fetchPropertyDetails(propertyId);
    } else {
        document.getElementById('property-details-container').innerHTML = '<p>Property ID is missing.</p>';
    }
});

function fetchPropertyDetails(propertyId) {
    const houseRef = firebase.database().ref('houses/' + propertyId);
    houseRef.once('value', function(snapshot) {
        const houseData = snapshot.val();
        if (houseData) {
            displayPropertyDetails(houseData);
        } else {
            document.getElementById('property-details-container').innerHTML = '<p>Property details not found.</p>';
        }
    }).catch(function(error) {
        console.error('Error fetching property details:', error);
        document.getElementById('property-details-container').innerHTML = '<p>Error loading property details.</p>';
    });
}

function displayPropertyDetails(houseData) {
    const container = document.getElementById('property-details-container');
    container.innerHTML = `
        <h2>${houseData.title}</h2>
        <div class="image-container" id="image-container"></div>
        <p>Description: ${houseData.description}</p>
        <p>Price: ${houseData.price}</p>
        <p>Location: ${houseData.location}</p>
        <p>Type: ${houseData.type}</p>
        <p>Area: ${houseData.area}</p>
    `;
    // Display the images
// Display the images
const imageContainer = document.getElementById('image-container');
if (houseData.imageUrls && houseData.imageUrls.length > 0) {
    houseData.imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.src = url;
        img.style.opacity = index === 0 ? 1 : 0; // Show the first image by default
        img.classList.add('property-image');
        imageContainer.appendChild(img);
    });

    // Add buttons to the image container
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.id = 'prevButton';
    prevButton.classList.add('nav-button');
    prevButton.addEventListener('click', () => {
        changeImage(-1, imageContainer);
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.id = 'nextButton';
    nextButton.classList.add('nav-button');
    nextButton.addEventListener('click', () => {
        changeImage(1, imageContainer);
    });

    imageContainer.appendChild(prevButton);
    imageContainer.appendChild(nextButton);
}
}

function changeImage(direction, container) {
const images = container.querySelectorAll('.property-image');
let currentIndex = 0;
images.forEach((img, idx) => {
    if (img.style.opacity === '1') {
        currentIndex = idx;
    }
});
let newIndex = currentIndex + direction;
if (newIndex < 0) {
    newIndex = images.length - 1;
} else if (newIndex >= images.length) {
    newIndex = 0;
}
images[currentIndex].style.opacity = 0;
images[newIndex].style.opacity = 1;
}
