let email = document.getElementById('emailBox');
let password = document.getElementById('pwBox');
const btnReg = document.getElementById('btnRegister');

btnReg.onclick = (e) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(() => {
      alert('Account Registered');
    })
    .catch(function (error) {
      alert(error);
    });
};

let emailLogin = document.getElementById('emailBoxLogin');
let passwordLogin = document.getElementById('pwBoxLogin');
const btnLog = document.getElementById('btnLogin');

let pwReset = document.getElementById('pwBoxReset');
const btnReset = document.getElementById('btnReset');

btnLog.onclick = (e) => {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(emailLogin.value, passwordLogin.value)
    .then(() => {
      alert('Account Logged In');
    })
    .catch(function (error) {
      alert(error);
    });
  
  //Sohil code
// const db = firebase.firestore();
  var ref = firebase.database().ref();

  ref.on("value", function(snapshot) {
     console.log(snapshot.val());
  }, function (error) {
     console.log("Error: " + error.code);
  });
  
};

btnReset.onclick = () => {
  firebase.auth().onAuthStateChanged(function (u) {
    if (u) {
      // User is signed in.
      var user = firebase.auth().currentUser;
      var newPassword = pwReset.value;

      user
        .updatePassword(newPassword)
        .then(function () {
          // Update successful.
          alert('Updated Password, you may login now!');

          firebase
            .auth()
            .signOut()
            .then(function () {
              // Sign-out successful.
            })
            .catch(function (error) {
              // An error happened.
              alert(error);
            });
        })
        .catch(function (error) {
          alert(error);
        });
    } else {
      // No user is signed in.
    }
  });
};

// TTS Test

const btnSpeak = document.getElementById('btnSpeak');
let textSpeak = document.getElementById('txtSpeak');

btnSpeak.onclick = () => {
  var msg = new SpeechSynthesisUtterance();
  msg.text = textSpeak.value;
  window.speechSynthesis.speak(msg);
};














const db = firebase.firestore();

db.collection()
  .doc('LA')
  .set({
    name: 'Los Angeles',
    state: 'CA',
    country: 'USA',
  })
  .then(function () {
    console.log('Document successfully written!');
  })
  .catch(function (error) {
    console.error('Error writing document: ', error);
  });
