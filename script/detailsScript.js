document.addEventListener('DOMContentLoaded', () => {
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

function fetchPropertyDetails(propertyId, currentUserId) {
    const houseRef = firebase.database().ref('houses/' + propertyId);
    houseRef.once('value', function(snapshot) {
        const houseData = snapshot.val();
        if (houseData) {
            displayPropertyDetails(houseData, currentUserId);
        } else {
            document.getElementById('property-details-container').innerHTML = '<p>Property details not found.</p>';
        }
    }).catch(function(error) {
        console.error('Error fetching property details:', error);
        document.getElementById('property-details-container').innerHTML = '<p>Error loading property details.</p>';
    });
}

function displayPropertyDetails(houseData, currentUserId) {
    const container = document.getElementById('property-details-container');
    container.innerHTML = `
        <h2>${houseData.title}</h2>
        <div class="image-container">
            ${houseData.imageUrls.map((url, index) => `
                <div class="mySlides fade">
                    <img src="${url}" class="property-image">
                </div>
            `).join('')}
            <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
            <a class="next" onclick="changeSlide(1)">&#10095;</a>
        </div>
        <p>Description: ${houseData.description}</p>
        <p>Price: ${houseData.price}</p>
        <p>Location: ${houseData.location}</p>
        <p>Type: ${houseData.type}</p>
        <p>Area: ${houseData.area}</p>
    `;

    showSlides(slideIndex);

    // Additional functionality for edit and delete buttons
    if (currentUserId && houseData.userId === currentUserId) {
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

let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    slides[slideIndex - 1].style.display = "block"; 
}

function changeSlide(n) {
    showSlides(slideIndex += n);
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
            window.location.href = 'mainPage.html'; // Redirect to home page or another appropriate page
        })
        .catch((error) => {
            console.error('Error deleting property:', error);
            alert('Error deleting property. Please try again.');
        });
}
