/*
 * Hello there!
 * If you are interested in our code, take a look at:
 * https://github.com/studio-awkward/getawkward.co.uk
 */
(function () {

  var colours = {
    red: '#ee3040',
    pink: '#f792bc',
    orange: '#f58200',
    yellow: '#fac90d',
    green: '#0e8642',
    blueLight: '#1f5ba8',
    blueDark: '#58c4ea'
  };

  var quotes = [
    {
      'text': 'I hate that line height, it\'s gross.',
      'person': 'Ruth'
    },
    {
      'text': 'I love seeing if words make me feel sick',
      'person': 'Ruth'
    }
  ];

  function init () {
    initWelcomeConsoleLog();
    initHeroTicker();
    initBackgroundFlourishes();
    initFlourishes();
    initTeamShuffle();
  }

  function initWelcomeConsoleLog () {
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
  function initHeroTicker () {
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
        nextWord[i].className = 'Hero-tickerLetter is-behind';
        nextWord[0].parentElement.style.opacity = 1;
        animateLetterIn(nextWord, i);
      }

      currentWordIndex = (currentWordIndex === wordArray.length - 1) ? 0 : currentWordIndex + 1;
      setTimeout(changeWord, 4000);
    }

    function animateLetterOut (currentWord, i) {
      setTimeout(function() {
    		currentWord[i].className = 'Hero-tickerLetter is-out';
      }, i * 80);
    }

    function animateLetterIn (nextWord, i) {
      setTimeout(function() {
    		nextWord[i].className = 'Hero-tickerLetter is-in';
      }, 340 + (i * 80));
    }

    function splitLetters (word) {
      var content = word.innerHTML;
      word.textContent = '';
      var letters = [];
      for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
        letter.className = 'Hero-tickerLetter';
        letter.textContent = content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }

      wordArray.push(letters);
    }

    setTimeout(changeWord, 4000);
  }

  function initBackgroundFlourishes () {
    var styleEl = document.createElement('style');
    document.body.appendChild(styleEl);

    var bgFlourishEls = document.querySelectorAll('.js-u-BackgroundFlourish');
    for (var i = 0; i < bgFlourishEls.length; i++) {
      addBgFlourish(bgFlourishEls[i], 'before');
      addBgFlourish(bgFlourishEls[i], 'after');
    }

    function addBgFlourish (el, pseudo) {
      var className = el.getAttribute('class').split(' ')[0];

      var flourish = createFlourishProps();

      var style = '.' + className + '::' + pseudo + ' {';
      style += 'width: ' + flourish.width + 'px; ';
      style += 'height: ' + flourish.height + 'px; ';
      style += flourish.verticalAlignment + ': ' + flourish.verticalPosition + '%; ';
      style += flourish.horizontalAlignment + ': ' + flourish.horizontalPosition + '%; ';
      style += 'background: ' + flourish.colour + '; ';
      style += '}';

      styleEl.textContent += style;
    }
  }

  function initFlourishes () {
    var flourishEls = document.querySelectorAll('.js-Flourish');
    for (var i = 0; i < flourishEls.length; i++) {
      addFlourish(flourishEls[i]);
    }

    function addFlourish (el) {
      var flourishCount = utils.randomBetween(2, 4);
      for (var i = 0; i < flourishCount; i++) {
        flourish = createFlourishProps();
        var flourishEl = document.createElement('div');
        flourishEl.className = 'Flourish-block';
        flourishEl.style[flourish.verticalAlignment] = flourish.verticalPosition + '%';
        flourishEl.style[flourish.horizontalAlignment] = flourish.horizontalPosition + '%';
        flourishEl.style.width = flourish.width + 'px';
        flourishEl.style.height = flourish.height + 'px';
        flourishEl.style.background = flourish.colour;
        el.appendChild(flourishEl);
      }
    }
  }

  function createFlourishProps () {
    var flourish = {};
    if (Math.random() > 0.5) {
      flourish.width = utils.randomBetween(25, 50);
      flourish.height = utils.randomBetween(7, 15);
    } else {
      flourish.width = utils.randomBetween(7, 15);
      flourish.height = utils.randomBetween(25, 50);
    }

    flourish.verticalAlignment = (Math.random() > 0.5) ? 'top' : 'bottom';
    flourish.horizontalAlignment = (Math.random() > 0.5) ? 'left' : 'right';
    if (Math.random() > 0.5) {
      flourish.verticalPosition = 0;
      flourish.horizontalPosition = utils.randomBetween(0, 90);
    } else {
      flourish.verticalPosition = utils.randomBetween(0, 90);
      flourish.horizontalPosition = 0;
    }

    var colourIndex = utils.pickRandomProperty(colours);
    flourish.colour = colours[colourIndex];
    return flourish;
  }

  function initTeamShuffle () {
    var teamMembers = document.querySelector('.js-Team-members');
    for (var i = teamMembers.children.length; i >= 0; i--) {
      teamMembers.appendChild(teamMembers.children[Math.random() * i | 0]);
    }
    var teamQuotes = document.querySelectorAll('.js-Team-quote');
    for (var i = 0; i < teamQuotes.length; i++) {
      var quoteEl = teamQuotes[i];
      var quoteIndex = utils.randomBetween(0, quotes.length);
      var quote = quotes[quoteIndex];

      var colourIndex = utils.pickRandomProperty(colours);
      var colour = colours[colourIndex];

      quoteEl.className += ' is-visible';
      quoteEl.style.background = colour;
      quoteEl.querySelector('h4').textContent = quote.text;
      quoteEl.querySelector('p').textContent = quote.person;
    }
  }

  var utils = {
    randomBetween: function (min, max) {
      return Math.floor(Math.random() * max) + min;
    },
    pickRandomProperty: function(obj) {
      var result;
      var count = 0;
      for (var prop in obj) {
        if (Math.random() < 1/++count) {
          result = prop;
        }
      }
      return result;
    }
  };

  init();
})();
