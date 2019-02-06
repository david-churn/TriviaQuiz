'use strict'
// Ask a trivia question supplied by Open Trivia.
// 2/5/2109 David Churn created

let nextObj = document.getElementById("next");
let questionObj = document.getElementById("question");
let textAreaObj = document.getElementById("text-area");
let questionNbr = 0;
let questionArr = [];

getQuestions();
questionObj.innerHTML = questionArr[questionNbr].question;

nextObj.addEventListener('click', function() {
  if (questionNbr > 9) {
    getQuestions();
    questionNbr = 0;
    }
  else {
    questionNbr += 1;
  }
  questionObj.innerHTML = questionArr[questionNbr].question;
});

function getQuestions() {
  let url = `https://opentdb.com/api.php?amount=10`;
  return fetch(url)
    .then((respObj)=> {
      return respObj.json();
    })
    .then(function(respObj) {
      console.log(respObj);
      questionArr = respObj.results;
      return;
    })
}
