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
firebase.analytics();

// Function to handle registration
function handleRegistration(e) {
    e.preventDefault(); // Prevent form submission

    // Get input values
    const username = document.getElementById('Username').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    // Firebase Authentication create user
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registered
            const user = userCredential.user;
            console.log('Registration successful!');
            document.getElementById('alert').style.display = 'block'; // Show success message
            document.getElementById('error').style.display = 'none'; // Hide error message
            // Optionally redirect after registration
            setTimeout(() => {
                window.location.href = 'searchPage.html'; // Redirect to home or desired page
            }, 2000);
        })
        .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error during registration:', errorMessage);
            document.getElementById('error').style.display = 'block'; // Show error message
            document.getElementById('alert').style.display = 'none'; // Hide success message
        });
}

// Add event listener to the form submit
document.getElementById('register-form').addEventListener('submit', handleRegistration);
