
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

// Reference to the "users" node



//chrez tazi ref ti pozvolqva da chetesh i pishesh ot bazata  
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
                //vlizame kum stranicata
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

function showData(){
   

}