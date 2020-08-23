document.querySelector('body').onload = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword('andy.tubeee@gmail.com', '1234admin')
    .then(() => {
      console.log('Account Logged In');
    })
    .catch(function (error) {
      alert(error);
    });
};

const btnSave = document.getElementById('btnSave');

var eduTxt = '';
var cwTxt = '';
var expTxt = '';
var skillTxt = '';
var projectTxt = '';

const db = firebase.firestore();

function getObjects() {
  // Print current user data
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // document.getElementById('useruidtxt').innerHTML += user.uid;

      console.log(user.uid);

      db.collection('education')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.data());
            // for (x in doc.data()) {
            //   eduTxt += doc.data()[x] + ' | ';
            // }
            // document.getElementById('userEducation').innerHTML += eduTxt;
          });
        });

      db.collection('coursework')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.data());
            // for (x in doc.data()) {
            //   cwTxt += doc.data()[x] + ' | ';
            // }
            // document.getElementById('userCoursework').innerHTML += cwTxt;
          });
        });

      db.collection('experience')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.data());
            // for (x in doc.data()) {
            //   expTxt += doc.data()[x] + ' | ';
            // }
            // document.getElementById('userExperience').innerHTML += expTxt;
          });
        });

      db.collection('project')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.data());
            // for (x in doc.data()) {
            //   projectTxt += doc.data()[x] + ' | ';
            // }
            // document.getElementById('userProjects').innerHTML += projectTxt;
          });
        });
      db.collection('skills')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            console.log(doc.data());
            for (x in doc.data()) {
              skillTxt += doc.data()[x] + ' | ';
            }
            // document.getElementById('userSkills').innerHTML += skillTxt
            //   .replace('and', ' ')
            //   .replace(',', ' |')
            //   .replace(',', ' |');
          });
        });
    }
  });
}

btnSave.onclick = () => getObjects();
{  
  var doc = new jsPDF();
  //Education
  eduTxt.forEach(function(edu, i){
   doc.text(20, 10 + (i * 10), 
        "Year: " + edu.year +
        "Location: " + edu.location +
        "Degree: " + edu.degree +     
        "Minors: " + edu.minors +     
        "Institution: " + edu.institution );
});
 //Course
  /*  cwTxt.forEach(function(course, i){
   doc.text(20, 10 + (i * 10), 
        "Course Name: " + course.name +
        ": " + course. +
        ": " + course. +     
        ": " + course. +     
        ": " + course. );
});
*/
doc.save(user.uid+'_resume.pdf'); 
  
}

var msg = new SpeechSynthesisUtterance();
msg.text = document.querySelector('body').innerHTML;
// window.speechSynthesis.speak(msg);
