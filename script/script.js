
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
  var imageUrls = [];

const database = firebase.database();
var houseRef = firebase.database().ref('houses');
   
var houseForm = document.getElementById("house-form");
  if(houseForm != null)
  document.getElementById("house-form").addEventListener('submit', addHouse);

//chrez tazi ref ti pozvolqva da chetesh i  pishesh ot bazata  
var ref = firebase.database().ref('users');
  var regForm =  document.getElementById("register-form");
//attaching an event handler to a specified element
  if(regForm != null)
  document.getElementById("register-form").addEventListener('submit', submitForm);


//Submiting information to database
var flag = true; // Flag that checks if registration is correct
//priema event,eventa e natiskaneto na butona 
function submitForm(e){
    //Prevent a link from opening the URL
    e.preventDefault();
//checkbox
    var name =  getValueById("Username");
    var email =  getValueById("Email");
    var password =  getValueById("Password");
//errordata
    ref.on("value", checkData, errorData);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Registered 
        const user = userCredential.user;
        alert('Registration successful!');
        window.location.href = 'searchPage.html'; // Redirect to home or desired page
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Error: ' + errorMessage);
    });
}

function validateEmail(email) 
{
    //regex
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function getValueById(id){
    return document.getElementById(id).value;
}

function savaData(name, email, password){
    ref.push({
        name:name,
        email:email,
        password:password
    });
}

 //Registration end

 //Login start
 var loginForm = document.getElementById("login-form");

 if(loginForm != null)
 loginForm.addEventListener('submit', checkLoginInfo);

 function checkLoginInfo(e){
  e.preventDefault();

  ref.on("value", gotData, errorData);
 }

 //Register validation of usernam and password
 function checkData(data){
    let name =  getValueById("Username");
    let email =  getValueById("Email");
    var users = data.val();

    if(users != null){
        //returns array of given object's enumerable property name
       var keys = Object.keys(users);

       for(var i = 0; i < keys.length; i++){
           var key = keys[i];
           var obj = users[key];
           if(obj.name == name || obj.email == email){
                flag = false;
                return;
           }
       }
   }
 }

 function gotData(data){
     var username = getValueById('Username');
     var password = getValueById('Password');
     var users = data.val();
     firebase.auth().signInWithEmailAndPassword(username, password)
                .then((userCredential) => {
                    // Signed in 
                    alert('Login successful!');
                    window.location.href = 'searchPage.html'; // Redirect to home or desired page
                })
                .catch((error) => {
                    alert('Er11ror: ' + error.message);
                });
      

    // Monitor auth state
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.body.classList.add('logged-in');
        } else {
            document.body.classList.remove('logged-in');
        }
    });
 }

 function errorData(err){
   document.getElementById("error").style.display = "block";

   setTimeout(function(){
    document.getElementById("error").style.display = "none";
   }, 2000);

   document.getElementById("login-form").reset();
 }
 // Call displayProperties function to retrieve and display properties data
  // Function to upload a single file
  function uploadFile(file) {
    return new Promise((resolve, reject) => {
        var imageName = 'house_image_' + Date.now() + '_' + file.name;
        var imageRef = storageRef.child(imageName);

        imageRef.put(file).then(snapshot => {
            console.log('Image uploaded successfully!');
            return imageRef.getDownloadURL();
        }).then(downloadURL => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
        }).catch(error => {
            console.error('Error uploading image:', error);
            reject(error);
        });
    });
}
function addHouse(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const type = document.getElementById('type').value;
    const area = document.getElementById('area').value;
    const imageFiles = document.getElementById('image').files;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const userId = user.uid;
            const newPropertyRef = firebase.database().ref('houses').push();
            const propertyId = newPropertyRef.key;
            const storageRef = firebase.storage().ref();

            const uploadPromises = [];
            const imageUrls = [];

            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const uploadTask = storageRef.child(`properties/${propertyId}/${file.name}`).put(file);

                uploadPromises.push(
                    uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
                    .then(downloadURL => {
                        imageUrls.push(downloadURL);
                    })
                );
            }

            Promise.all(uploadPromises).then(() => {
                newPropertyRef.set({
                    title,
                    description,
                    price,
                    location,
                    type,
                    area,
                    userId,
                    imageUrls
                }).then(() => {
                    alert('Property added successfully!');
                    window.location.href = 'index3.html';
                }).catch((error) => {
                    console.error('Error adding property:', error);
                    alert('Error adding property. Please try again.');
                })
            }).catch((error) => {
                console.error('Error uploading images:', error);
                alert('Error uploading images. Please try again.');
                document.getElementById('upload-progress').style.display = 'none';
            });
        } else {
            alert('You must be logged in to add a property.');
        }
    });
}




    