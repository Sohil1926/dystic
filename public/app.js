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

if ('speechSynthesis' in window) {
  // Speech Synthesis supported 🎉
  btnSpeak.onclick = () => {
    // var msg = new SpeechSynthesisUtterance();
    // msg.text = textSpeak.value.toString();
    // window.speechSynthesis.speak(msg);
    // Imports the Google Cloud client library
    const textToSpeech = require('@google-cloud/text-to-speech');

    // Import other required libraries
    const fs = require('fs');
    const util = require('util');
    // Creates a client
    const client = new textToSpeech.TextToSpeechClient();
    async function quickStart() {
      // The text to synthesize
      const text = 'hello, world!';

      // Construct the request
      const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
      };

      // Performs the text-to-speech request
      const [response] = await client.synthesizeSpeech(request);
      // Write the binary audio content to a local file
      const writeFile = util.promisify(fs.writeFile);
      await writeFile('output.mp3', response.audioContent, 'binary');
      console.log('Audio content written to file: output.mp3');
    }
    quickStart();
  };
} else {
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}
