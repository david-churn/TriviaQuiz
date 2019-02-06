'use strict'
// Ask trivia questions supplied by Open Trivia.
// 2/5/2109 David Churn created

let nextObj = document.getElementById("next");
let questionObj = document.getElementById("question");
let answerObj = document.getElementById('answers');
let messageObj = document.getElementById("text-area");

let questionNbr = 0;
let lastQuestionNbr = 0;
let questionArr = [];

getQuestions()
  .then(() => {
    postQuestion();
  })

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
//  lastQustionNbr is the last array value of the quantity of questions requested.
      lastQuestionNbr = questionArr.length - 2;
      console.log(questionArr);
      return;
    })
}

function postQuestion() {
// post the question
  questionObj.innerHTML = questionArr[questionNbr].question;

//remove any old answers, event listeners, and message
  while (answerObj.hasChildNodes()) {
    answerObj.childNodes[0].removeEventListener('click',checkAnswer);
    answerObj.removeChild(answerObj.childNodes[0]);
  }
  messageObj.innerHTML = '';

// create a list of the potential answers
  let answerQty = questionArr[questionNbr].incorrect_answers.length + 1;
  let correctNbr = Math.floor(Math.random() * (answerQty))
  console.log(`correctNbr=${correctNbr}`);
  for (let n=0 ; n < answerQty - 2 ; n++) {

  }
  let listObj = document.createElement('li');
  listObj.innerHTML = questionArr[questionNbr].correct_answer;
  answerObj.appendChild(listObj);
  listObj.addEventListener('click',checkAnswer);

  questionArr[questionNbr].incorrect_answers.forEach(postGuess);
  function postGuess (guessStr){
    let listObj = document.createElement('li');
    listObj.innerHTML = guessStr;
    answerObj.appendChild(listObj);
    listObj.addEventListener('click',checkAnswer);
  }
}

function checkAnswer(eObj) {
  console.log(eObj);
  if (eObj.target.innerText === questionArr[questionNbr].correct_answer) {
    messageObj.innerHTML = 'Correct';
    eObj.target.setAttribute("class","green");
  }
  else {
    messageObj.innerHTML = 'Incorrect';
    eObj.target.setAttribute("class","red");
  }

}
