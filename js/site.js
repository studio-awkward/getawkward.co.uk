/*
 * Hello there!
 * If you are interested in our code, take a look at:
 * https://github.com/studio-awkward/getawkward.co.uk
 */
(function () {

  function init () {
    addWelcomeConsoleLog();
    animateHeroTicker();
  }

  function addWelcomeConsoleLog () {
    if (console && console.log) {
      var logs = [
        'Hello there!',
        'If you are interested in our code, take a look at:',
        'https://github.com/studio-awkward/getawkward.co.uk'
      ]

      var styles = [
        'background: #eee;',
        'color: #ee3040;',
        'padding: 5px;',
        'line-height: 2em'
      ].join(' ')

      for (var counter = 0; counter < logs.length; counter++) {
        console.log('%c' + logs[counter], styles)
      }
    }
  }

  // adapted from: https://codepen.io/testshoot/pen/BjWPZq
  function animateHeroTicker () {
    var words = document.querySelectorAll('.js-Hero-tickerWord');
    var wordArray = [];
    var currentWordIndex = 0;

    words[currentWordIndex].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }

    function changeWord () {
      var currentWord = wordArray[currentWordIndex];
      var nextWord = currentWordIndex === words.length - 1 ? wordArray[0] : wordArray[currentWordIndex + 1];
      for (var i = 0; i < currentWord.length; i++) {
        animateLetterOut(currentWord, i);
      }

      for (var i = 0; i < nextWord.length; i++) {
        nextWord[i].className = 'Hero-tickerLetter behind';
        nextWord[0].parentElement.style.opacity = 1;
        animateLetterIn(nextWord, i);
      }

      currentWordIndex = (currentWordIndex === wordArray.length - 1) ? 0 : currentWordIndex + 1;
      setTimeout(changeWord, 4000);
    }

    function animateLetterOut (currentWord, i) {
      setTimeout(function() {
    		currentWord[i].className = 'Hero-tickerLetter out';
      }, i * 80);
    }

    function animateLetterIn (nextWord, i) {
      setTimeout(function() {
    		nextWord[i].className = 'Hero-tickerLetter in';
      }, 340 + (i * 80));
    }

    function splitLetters (word) {
      var content = word.innerHTML;
      word.innerHTML = '';
      var letters = [];
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'Hero-tickerLetter';
        letter.innerHTML = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArray.push(letters);
    }

    changeWord();
  }

  init();
})();
