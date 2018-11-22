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

var db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

var loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', function() {
    var userName = document.getElementById('usernameField').value;
    var password = document.getElementById('passwordField').value;
    firebase.auth().signInWithEmailAndPassword(userName, password).then(function(){
        var userID = firebase.auth().currentUser.uid;
        var docRef = db.collection('roles').doc(userID);

        docRef.get().then(function (doc) {
            if (doc && doc.exists) {
                const roleData = doc.data();
                var userRole = roleData.role;
            } if (userRole === 'super') {
                window.location.assign('superProfilePage.html');
            } else {
                window.location.assign('staffProfilePage.html');
            }
        }).catch(function (error) {
            console.log('Got an error: ', error);
        });
    }).catch(function(error){
        alert(error.message);
        console.log('Oops! Something went wrong. Try that again.');
        return;
    })
});