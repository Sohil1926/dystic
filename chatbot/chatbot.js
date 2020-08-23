const btnSubmit = document.getElementById('btnSubmit');
var session_id = document.getElementById('inputTxt');
const DIAG_API = `https://dialogflow.googleapis.com/v2/projects/dystic-odux/agent/sessions/${session_id.value}:detectIntent`;

btnSubmit.onclick = () => {
  console.log('Clicked');
  const DIAG_API = `https://dialogflow.googleapis.com/v2/projects/dystic-odux/agent/sessions/${session_id.value}:detectIntent`;
  fetch(DIAG_API)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
