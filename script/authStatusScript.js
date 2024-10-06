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
        const userInfo = document.getElementById('user-info');
        const loginLink = document.getElementById('login-link');
        const registerLink = document.getElementById('register-link');
        const navMenu = document.getElementById('nav-menu');
        console.log(userInfo);
        if (user) {
            // User is signed in
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';

            const logoutButton = document.createElement('button');
            logoutButton.textContent = 'Logout';
            logoutButton.id = 'logout-button';
            logoutButton.classList.add('nav-menu');
            logoutButton.addEventListener('click', () => {
                firebase.auth().signOut().then(() => {
                    window.location.reload();
                }).catch((error) => {
                    console.error('Error signing out:', error);
                });
            });

            const listItem = document.createElement('li');
            listItem.appendChild(logoutButton);
            navMenu.appendChild(listItem);
        } else {
            // No user is signed in
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
   
});