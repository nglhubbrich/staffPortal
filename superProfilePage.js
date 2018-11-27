//Initialize Firebase
var config = {
  apiKey: "AIzaSyDck4ehz9F-xxA7izp0M-PgLONVs0R76QI",
  authDomain: "simpleauth-7835c.firebaseapp.com",
  databaseURL: "https://simpleauth-7835c.firebaseio.com",
  projectId: "simpleauth-7835c",
  storageBucket: "simpleauth-7835c.appspot.com",
  messagingSenderId: "116265801104"
};
firebase.initializeApp(config);

firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

var logoutBtn = document.getElementById("logoutBtn");
var userBtn = document.getElementById("userBtn");
var nameHeading = document.getElementById("name");
var positionValue = document.getElementById("positionValue");

var uid;

logoutBtn.addEventListener("click", function() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      console.log("Signed Out!");
      window.location.assign("login.html");
    });
});

// userBtn.addEventListener('click', function() {
//     var user = firebase.auth().currentUser;
//     console.log(user.uid);
// });
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var uid = user.uid;
    var userRef = firestore.collection("users").doc(uid);
    statsRef = userRef.collection("stats").doc("countingAccuracy");

    userRef.get().then(function(doc) {
      if (doc && doc.exists) {
        var userData = doc.data();
        console.log(userData);
        var firstName = userData.firstName;
        var lastName = userData.lastName;
        var userRole = userData.role;

        nameHeading.innerText = `${firstName} ${lastName}`;
        positionValue.innerText = `${userRole}`;
      }
    });
  } else {
    window.location.assign("login.html");
  }
});
