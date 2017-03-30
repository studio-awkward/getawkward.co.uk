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
    initTeamSection();
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
        'color: [colour];',
        'padding: 5px;',
        'line-height: 2em'
      ].join(' ')

      utils.forEach(logs, function (index, log) {
        var colourIndex = utils.pickRandomProperty(colours);
        var colour = colours[colourIndex];
        var style = styles.slice(0).replace('[colour]', colour);
        console.log('%c' + log, style)
      });
    }
  }

  // adapted from: https://codepen.io/testshoot/pen/BjWPZq
  function initHeroTicker () {
    var words = document.querySelectorAll('.js-Hero-tickerWord');
    var wordArray = [];
    var currentWordIndex = 0;

    words[currentWordIndex].style.opacity = 1;
    utils.forEach(words, function (index, word) {
      splitLetters(word);
    });

    function changeWord () {
      var currentWord = wordArray[currentWordIndex];
      var nextWord = currentWordIndex === words.length - 1 ? wordArray[0] : wordArray[currentWordIndex + 1];
      utils.forEach(currentWord, function (index, letter) {
        animateLetterOut(letter, index);
      });

      utils.forEach(nextWord, function (index, letter) {
        letter.classList.remove('is-in', 'is-out');
        letter.classList.add('is-behind');
        nextWord[0].parentElement.style.opacity = 1;
        animateLetterIn(letter, index);
      });

      currentWordIndex = (currentWordIndex === wordArray.length - 1) ? 0 : currentWordIndex + 1;
      setTimeout(changeWord, 4000);
    }

    function animateLetterOut (letter, index) {
      setTimeout(function() {
    		letter.classList.remove('is-in', 'is-behind');
        letter.classList.add('is-out');
      }, index * 80);
    }

    function animateLetterIn (letter, index) {
      setTimeout(function() {
    		letter.classList.remove('is-behind', 'is-out');
    		letter.classList.add('is-in');
      }, 340 + (index * 80));
    }

    function splitLetters (word) {
      var content = word.textContent;
      word.textContent = '';
      var letters = [];
      utils.forEach(content, function (index) {
        var letter = document.createElement('span');
        letter.classList.add('Hero-tickerLetter');
        letter.textContent = content.charAt(index);
        word.appendChild(letter);
        letters.push(letter);
      });

      wordArray.push(letters);
    }

    setTimeout(changeWord, 4000);
  }

  function initBackgroundFlourishes () {
    var styleEl = document.createElement('style');
    document.body.appendChild(styleEl);

    var bgFlourishEls = document.querySelectorAll('.js-u-BackgroundFlourish');
    utils.forEach(bgFlourishEls, function (index, bgFlourishEl) {
      addBgFlourish(bgFlourishEl, 'before');
      addBgFlourish(bgFlourishEl, 'after');
    });

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
    utils.forEach(flourishEls, function (index, flourishEl) {
      addFlourish(flourishEl);
    });

    function addFlourish (el) {
      var flourishCount = utils.randomBetween(2, 4);
      for (var i = 0; i < flourishCount; i++) {
        flourish = createFlourishProps();
        var flourishEl = document.createElement('div');
        flourishEl.classList.add('Flourish-block');
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

  function initTeamSection () {

    shuffleTeam();
    addQuotes();

    function shuffleTeam () {
      var teamMembers = document.querySelector('.js-Team-members');
      for (var i = teamMembers.children.length; i >= 0; i--) {
        teamMembers.appendChild(teamMembers.children[Math.random() * i | 0]);
      }
    }

    function addQuotes () {
      var teamQuotes = document.querySelectorAll('.js-Team-quote');
      utils.forEach(teamQuotes, function (index, teamQuote) {
        var quoteIndex = utils.randomBetween(0, quotes.length);
        var quote = quotes[quoteIndex];

        var colourIndex = utils.pickRandomProperty(colours);
        var colour = colours[colourIndex];

        teamQuote.classList.add('is-visible');
        teamQuote.style.background = colour;
        teamQuote.querySelector('h4').textContent = quote.text;
        teamQuote.querySelector('p').textContent = quote.person;
      });
    }

    var teamMembers = document.querySelectorAll('.js-TeamMember');
    var activeTeamMemberTimeout;
    highlightRandomTeamMember();

    utils.forEach(teamMembers, function (index, teamMember) {
      teamMember.addEventListener('mouseover', function () {
        setTeamHighlight(index);
      });
      teamMember.addEventListener('mouseout', function () {
        highlightRandomTeamMember();
      });
    });

    function setTeamHighlight (index) {
      clearTimeout(activeTeamMemberTimeout);
      utils.forEach(teamMembers, function (index, teamMember) {
        teamMember.classList.remove('is-active');
      });
      teamMembers[index].classList.add('is-active');
    }

    function highlightRandomTeamMember () {
      activeTeamMemberTimeout = setTimeout(function () {
        var index = utils.randomBetween(0, teamMembers.length);
        setTeamHighlight(index);
        highlightRandomTeamMember();
      }, 3000);
    }
  }

  var utils = {
    randomBetween: function (min, max) {
      return Math.floor(Math.random() * max) + min;
    },

    // http://stackoverflow.com/a/2532251
    pickRandomProperty: function(obj) {
      var result;
      var count = 0;
      for (var prop in obj) {
        if (Math.random() < 1/++count) {
          result = prop;
        }
      }
      return result;
    },

    // https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
    forEach: function (array, callback, scope) {
      for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
      }
    }
  };

  init();
})();
