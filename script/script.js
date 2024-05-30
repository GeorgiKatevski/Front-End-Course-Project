
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
alert(houseRef);
    // The current page is index2.html



// Reference to the "users" node
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
 //checkdata proverqva dali ima user
    if(flag){
        if(validateEmail(email)){
            savaData(name, email, password);

            document.getElementById('alert').style.display = "block";
 
            setTimeout(function(){
                document.getElementById('alert').style.display = "none";
            }, 2000);

           document.getElementById("register-form").reset();
        }else 
        {
            //TO DO:da se iznese vuv funkciq
               document.getElementById("error").style.display = "block";

                setTimeout(function(){
                 document.getElementById("error").style.display = "none";
                }, 2000);
              
                document.getElementById("register-form").reset();
        }
    }else{
        document.getElementById("error").style.display = "block";

        setTimeout(function(){
         document.getElementById("error").style.display = "none";
        }, 2000);
      
        document.getElementById("register-form").reset();
        flag = true;
    }
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

     if(users != null){
    
        var keys = Object.keys(users);

        for(var i = 0; i < keys.length; i++){
            var key = keys[i];
            var obj = users[key];
            if(obj.name == username && obj.password == password){
                window.location.href = "index.html";

                return;
            }
        }
    }

   document.getElementById("error").style.display = "block";

   setTimeout(function(){
    document.getElementById("error").style.display = "none";
   }, 2000);

   document.getElementById("login-form").reset();
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
 function addHouse(e){
    // Prevent the default form submission behavior
    e.preventDefault();
    // Get form data
    var title = getValueById("title");
    var description = getValueById("description");
    var location = getValueById("location");
    var price = getValueById("price");
    var imageFiles = document.getElementById('image').files; // Get the uploaded image file
    var type = getValueById("type");
    var area = getValueById("area");
    alert(imageFiles[0])
    alert(imageFiles[1])
    alert(area);
    alert(type);
    // Upload all files
    Promise.all(Array.from(imageFiles).map(file => uploadFile(file)))
    .then(urls => {
        imageUrls = urls;

        return houseRef.push({
            title: title,
            description: description,
            location: location,
            price: price,
            area: area,
            type: type,
            imageUrls: imageUrls
        });
    })
    .then(() => {
        document.getElementById("house-form").reset();
        document.getElementById('alert').style.display = "block";
        setTimeout(() => {
            document.getElementById('alert').style.display = "none";
        }, 2000);
        window.location.href = "searchPage.html";
    })
    .catch(error => {
        alert('Error uploading images:', error);
    });
        
}

 



// function addHouse(e){
//     // Prevent the default form submission behavior
//     e.preventDefault();
//     // Get form data
//     var title = getValueById("title");
//     var description = getValueById("description");
//     var location = getValueById("location");
//     var price = getValueById("price");
//     var imageFile = document.getElementById('image').files[0]; // Get the uploaded image file
//     var type = getValueById("type");
//     var area = getValueById("area");
//     alert(area);
//     alert(type);
//     // Generate a unique filename for the image in GCS
//     var imageName = 'house_image_' + Date.now() + '_' + imageFile.name;

//     // Create a reference to the root of your GCS bucket
    var storageRef = firebase.storage().ref();

//     // Upload the image file to GCS
//     var imageRef = storageRef.child(imageName);
//     imageRef.put(imageFile).then(function(snapshot) {
//         console.log('Image uploaded successfully!');

//         // Get the download URL for the uploaded image
//         imageRef.getDownloadURL().then(function(downloadURL) {
//             console.log('File available at', downloadURL);

//             // Push data to Firebase Database including the image URL
//             houseRef.push({
//                 title: title,
//                 description: description,
//                 location: location,
//                 price: price,
//                 area: area,
//                 type : type,
//                 imageUrl: downloadURL // Add image URL to the database
//             });

//             // Reset form
//             document.getElementById("house-form").reset();
            
//             // Show success message
//             document.getElementById('alert').style.display = "block";
//             setTimeout(function(){
//                 document.getElementById('alert').style.display = "none";
//             }, 2000);
//             window.location.href = "searchPage.html";
//         });
//     }).catch(function(error) {
//         console.error('Error uploading image:', error);
//     });
        
// }