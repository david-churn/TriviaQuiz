'use strict'
// Ask a trivia question supplied by Open Trivia.
// 2/5/2109 David Churn created

let nextObj = document.getElementById("next");
let questionObj = document.getElementById("question");
let answerObj = document.getElementById('answers');
let textAreaObj = document.getElementById("text-area");

let questionNbr = 0;
let lastQuestionNbr = 0;
let questionArr = [];

getQuestions()
  .then(() => {
    postQuestion();
  })

function postQuestion() {
// post the question
  questionObj.innerHTML = questionArr[questionNbr].question;

//remove any old answers
  while (answerObj.hasChildNodes()) {
    answerObj.removeChild(answerObj.childNodes[0]);
  }

// create a list of the potential answers
  let listObj = document.createElement('li');
  listObj.innerHTML = questionArr[questionNbr].correct_answer;
  answerObj.appendChild(listObj);

  questionArr[questionNbr].incorrect_answers.forEach(postGuess);
  function postGuess (guessStr){
    let listObj = document.createElement('li');
    listObj.innerHTML = guessStr;
    answerObj.appendChild(listObj);
  }
}

nextObj.addEventListener('click', function() {
  if (questionNbr > lastQuestionNbr) {
    getQuestions()
    .then(() => {
      questionNbr = 0;
      postQuestion();
    })
    }
  else {
    questionNbr += 1;
    postQuestion();
  }
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
//  This is the last array value of the quantity of questions requested.
      lastQuestionNbr = questionArr.length - 2;
      console.log(questionArr);
      return;
    })
}
