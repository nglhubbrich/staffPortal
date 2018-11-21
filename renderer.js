// Initialize Firebase
var config = {
    apiKey: "AIzaSyDck4ehz9F-xxA7izp0M-PgLONVs0R76QI",
    authDomain: "simpleauth-7835c.firebaseapp.com",
    databaseURL: "https://simpleauth-7835c.firebaseio.com",
    projectId: "simpleauth-7835c",
    storageBucket: "simpleauth-7835c.appspot.com",
    messagingSenderId: "116265801104"
};
firebase.initializeApp(config);

var loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', function() {
    var userName = document.getElementById('usernameField').value;
    var password = document.getElementById('passwordField').value;
    firebase.auth().signInWithEmailAndPassword(userName, password).then(function(){
        window.location.assign('profilePage.html');
    }).catch(function(error){
        console.log(error.message);
        return;
    })
});