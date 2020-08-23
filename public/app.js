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

const educationTextHTML = document.getElementById('userEducation');
var eduTxt = '';

const db = firebase.firestore();

let educationRef;
let unsubscribe;

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

  // Sohil's original code which was not working was deleted.

  // New Code
  // Print current user data
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      document.getElementById('useruidtxt').innerHTML = user.uid;

      db.collection('education')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.data());
            for (x in doc.data()) {
              eduTxt += doc.data()[x] + ' ';
              document.getElementById('userEducation').innerHTML = eduTxt;
            }
            // document.getElementById('userEducation').innerHTML = eduTxt;
          });
        });
    } else {
    }
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
