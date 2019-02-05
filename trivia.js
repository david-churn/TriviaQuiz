'use strict'
// Ask a trivia question supplied by Open Trivia.
// 2/5/2109 David Churn created

let nextObj = document.getElementById("next");
let questionObj = document.getElementById("question");
let textAreaObj = document.getElementById("text-area");
let questionNbr = 99;
let questionArr = [];

nextObj.addEventListener('click', function() {
  if (questionNbr > 99) {
    getQuestions()
      .then(function(respObj) {
        console.log(respObj);
        if (respObj.response_code == 0) {
          questionArr = respObj.results;
          questionNbr = 0;
        }
      })
      // .catch((err) {
      //   console.log('problem with the API call' + err)
      // })
    }
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
}
console.log(questionArr);
