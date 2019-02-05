'use strict'
// Ask a trivia question supplied by Open Trivia.
// 2/5/2109 David Churn created

let textArea = document.getElementById("text-area");

getSun.addEventListener('click', function() {
  let url = `https://opentdb.com/api.php?amount=10`;
  console.log("url=" + url);
  // nested .then statements
  fetch(url)
    .then(response => response.text()
    .then(function(text) {
      console.log(text);
      textArea.innerHTML = text;
    });
  });

});
