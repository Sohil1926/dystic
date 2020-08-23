// class Resume {
//   constructor(summary, company, comLoc, comLen, comRole, comTask) {
//     this.summary = summary; // PROFESSIONAL SUMMARY
//     this.company = company; // Company Name
//     this.comLoc = comLoc; // Company Location
//     this.comLen = comLen; // Length of stay at the company
//     this.comRole = comRole; // Your role at the company
//     this.comTask = comTask; // What did you do at the company
//   }
// }

var experience = {
  company: 'Google',
  location: 'Waterloo',
  length: 2, // Years
  role: 'System Admin',
  Task: 'Server admin, manage get and post requests',
};

const db = firebase.firestore();
var summary = document.getElementById('summarytextboxid');
const save = document.getElementById('saveButton');

firebase.auth().onAuthStateChanged((user) => {
  // Check if user is logged in, so the data saves corresponds to the logged in account
  if (user) {
    save.onclick = () => {
      const { serverTimestamp } = firebase.firestore.FieldValue;

      db.collection('experience')
        .add({
          uid: user.uid,
          experience: summary.value,
          savedOn: serverTimestamp(),
        })
        .then(function () {
          console.log('Experience saved successfully !');
        })
        .catch(function (error) {
          console.error('Error saving to database: ', error);
        });
    };
  }
});
