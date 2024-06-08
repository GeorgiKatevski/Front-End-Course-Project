const newLocal = 'DOMContentLoaded';
var isLoggedIn = true;
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

    firebase.auth().onAuthStateChanged(user => {
        console.log(user)
        if (user) {
            if (propertyId) {
                fetchPropertyDetails(propertyId, user.uid);
            } else {
                document.getElementById('property-details-container').innerHTML = '<p>Property ID is missing.</p>';
            }
        } else {
            if (propertyId) {
                fetchPropertyDetails(propertyId, null);
            } else {
                document.getElementById('property-details-container').innerHTML = '<p>Property ID is missing.</p>';
            }
        }
    });



    
    
});
const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('id');

function fetchPropertyDetails(propertyId,currentUserId) {
    const houseRef = firebase.database().ref('houses/' + propertyId);
    houseRef.once('value', function(snapshot) {
        const houseData = snapshot.val();
        if (houseData) {
            displayPropertyDetails(houseData,currentUserId);
        } else {
            document.getElementById('property-details-container').innerHTML = '<p>Property details not found.</p>';
        }
    }).catch(function(error) {
        console.error('Error fetching property details:', error);
        document.getElementById('property-details-container').innerHTML = '<p>Error loading property details.</p>';
    });
}

function displayPropertyDetails(houseData,currentUserId) {
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
alert(houseData.imageUrls)
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
// alert("test1: " + houseData.userId)
// alert("test2: " +currentUserId)
alert("currentUserId: " + currentUserId);
alert("houseData.userId : " + houseData.userId);
if (currentUserId && houseData.userId === currentUserId)  {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.id = 'deleteButton';
    deleteButton.addEventListener('click', () => {
        deleteProperty(propertyId);
    });
    container.appendChild(deleteButton);

    const changeButton = document.createElement('button');
    changeButton.textContent = 'Change';
    changeButton.id = 'changeButton';
    changeButton.addEventListener('click', () => {
        changeProperty(propertyId, houseData);
    });
    container.appendChild(changeButton);
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


function changeProperty(propertyId, houseData) {
    // This function can open a form pre-filled with existing houseData for editing
    // You can redirect to a new page or open a modal for editing
    window.location.href = `editProperty.html?id=${propertyId}`; // Redirect to an edit page with the property ID
}

function deleteProperty(propertyId) {
    const houseRef = firebase.database().ref('houses/' + propertyId);
    houseRef.remove()
        .then(() => {
            alert('Property deleted successfully!');
            window.location.href = 'index3.html'; // Redirect to home page or another appropriate page
        })
        .catch((error) => {
            console.error('Error deleting property:', error);
            alert('Error deleting property. Please try again.');
        });
}
