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

    // Get the property ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');
    
    if (propertyId) {
        fetchPropertyDetails(propertyId);
    } else {
        alert('Property ID is missing.');
    }

    // Fetch and display the current property details
    function fetchPropertyDetails(propertyId) {
        const houseRef = firebase.database().ref('houses/' + propertyId);
        houseRef.once('value', function(snapshot) {
            const houseData = snapshot.val();
            if (houseData) {
                fillForm(houseData);
            } else {
                alert('Property details not found.');
            }
        }).catch(function(error) {
            console.error('Error fetching property details:', error);
            alert('Error loading property details.');
        });
    }

    // Fill the form with the current property details
    function fillForm(houseData) {
        document.getElementById('title').value = houseData.title;
        document.getElementById('description').value = houseData.description;
        document.getElementById('price').value = houseData.price;
        document.getElementById('location').value = houseData.location;
        document.getElementById('type').value = houseData.type;
        document.getElementById('area').value = houseData.area;
    }

    // Handle form submission to update property details
    document.getElementById('editPropertyForm').addEventListener('submit', function(event) {
        event.preventDefault();
        updatePropertyDetails(propertyId);
    });

    function updatePropertyDetails(propertyId) {
        const houseRef = firebase.database().ref('houses/' + propertyId);
        const updatedData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            location: document.getElementById('location').value,
            type: document.getElementById('type').value,
            area: document.getElementById('area').value
        };
        
        houseRef.update(updatedData)
            .then(() => {
                alert('Property details updated successfully!');
                window.location.href = 'details.html?id=' + propertyId; // Redirect to property details page
            })
            .catch((error) => {
                console.error('Error updating property details:', error);
                alert('Error updating property details. Please try again.');
            });
    }
    
});