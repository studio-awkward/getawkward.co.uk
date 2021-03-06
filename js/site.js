/*
 * Hello there!
 * If you are interested in our code, take a look at:
 * https://github.com/studio-awkward/
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
      text: '"I hate that line height, it\'s gross."',
      person: 'Ruth',
    },
    {
      text: '"I love seeing if words make me feel sick"',
      person: 'Ruth',
    },
    {
      text: '"If you wanna get high on sharpies go for the pink"',
      person: 'Ruth',
    },
    {
      text: '"Go on then, smash out the hyphen"',
      person: 'Bex',
    },
    {
      text: '"You can\'t buy fairy lights in February"',
      person: 'Ed',
    },
    {
      text: '"Clicked my own face there."',
      person: 'Ed',
    },
    {
      text: '"I\'m not a pedant but I like to point out what\'s right"',
      person: 'Ed',
    },
    {
      text: '"My tweets are quite funny"',
      person: 'Ed',
    },
    {
      text: '"I\'ve got a funny face & it hurts sometimes"',
      person: 'Ruth',
    },
    {
      text: '"It\'s [the office printer] such a shitty little bitch"',
      person: 'Ruth'
    }
  ];

  function init () {
    initWelcomeConsoleLog();
    initExternalLinks();
    initHeroTicker();
    initBackgroundFlourishes();
    initFlourishes();
    initTeamSection();
    initContactForm();
    initGallery();
    initControls();
    initAnalytics();
  }

  function initWelcomeConsoleLog () {
    if (console && console.log) {
      var logs = [
        'Hello there!',
        'If you are interested in our code, take a look at:',
        'https://github.com/studio-awkward/'
      ]

      var styles = [
        'background: #eee;',
        'color: [colour];',
        'padding: 5px;',
        'line-height: 2em'
      ].join(' ')

      var logColours = utils.cloneObject(colours);

      utils.forEach(logs, function (index, log) {
        var colourIndex = utils.pickRandomProperty(logColours);
        var colour = logColours[colourIndex];
        delete logColours[colourIndex];
        var style = styles.slice(0).replace('[colour]', colour);
        console.log('%c' + log, style)
      });
    }
  }

  function initExternalLinks () {
    var anchors = document.getElementsByTagName('a')
    utils.forEach(anchors, function (index, anchor) {
      if (anchor.getAttribute('href') && anchor.getAttribute('rel') === 'external') {
        anchor.target = '_blank';
      }
    });
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
      var bgFlourishColours = utils.cloneObject(colours);

      var beforeColourIndex = utils.pickRandomProperty(bgFlourishColours);
      var beforeColour = bgFlourishColours[beforeColourIndex];
      delete bgFlourishColours[beforeColourIndex];

      var afterColourIndex = utils.pickRandomProperty(bgFlourishColours);
      var afterColour = bgFlourishColours[afterColourIndex];
      delete bgFlourishColours[afterColourIndex];

      addBgFlourish(bgFlourishEl, 'before', beforeColour);
      addBgFlourish(bgFlourishEl, 'after', afterColour);
    });

    function addBgFlourish (el, pseudo, colour) {
      var className = el.getAttribute('class').split(' ')[0];

      var flourish = createFlourishProps(el);

      var style = '.' + className + '::' + pseudo + ' {';
      style += 'width: ' + flourish.width + 'px; ';
      style += 'height: ' + flourish.height + 'px; ';
      style += flourish.verticalAlignment + ': ' + flourish.verticalPosition + '%; ';
      style += flourish.horizontalAlignment + ': ' + flourish.horizontalPosition + '%; ';
      style += 'background: ' + colour + '; ';
      style += '}';

      styleEl.textContent += style;
    }
  }

  function initFlourishes () {
    var flourishEls = document.querySelectorAll('.js-Flourish');
    utils.forEach(flourishEls, function (index, flourishEl) {
      addFlourish(flourishEl);
      flourishEl.addEventListener('click', recreateFlourish);
    });

    function addFlourish (el) {
      var flourishColours = utils.cloneObject(colours);
      var flourishCount = utils.randomBetween(4, 6);
      for (var i = 0; i < flourishCount; i++) {
        var colourIndex = utils.pickRandomProperty(flourishColours);
        var colour = flourishColours[colourIndex];
        delete flourishColours[colourIndex];

        flourish = createFlourishProps();
        var flourishEl = document.createElement('div');
        flourishEl.classList.add('Flourish-block', 'Flourish-block--' + flourish.variant);
        flourishEl.style[flourish.verticalAlignment] = flourish.verticalPosition + 'px';
        flourishEl.style[flourish.horizontalAlignment] = flourish.horizontalPosition + 'px';
        flourishEl.style.width = flourish.width + 'px';
        flourishEl.style.height = flourish.height + 'px';
        flourishEl.style.background = colour;
        el.appendChild(flourishEl);
      }
    }

    function recreateFlourish () {
      var flourishEl = this;
      var block = flourishEl.querySelector('.Flourish-block');
      flourishEl.classList.add('is-animating');
      block.addEventListener('transitionend', function () {
        while (flourishEl.hasChildNodes()) {
          flourishEl.removeChild(flourishEl.lastChild);
        }
        addFlourish(flourishEl);
        setTimeout(function () { flourishEl.classList.remove('is-animating'); }, 1);
      });
    }
  }

  function createFlourishProps (el) {
    var flourish = {};
    if (Math.random() > 0.5) {
      flourish.variant = 'horizontal';
      flourish.width = 15 * utils.randomBetween(1, 4);
      flourish.height = 15;
    } else {
      flourish.variant = 'vertical';
      flourish.width = 15;
      flourish.height = 15 * utils.randomBetween(1, 4);
    }

    flourish.verticalAlignment = (Math.random() > 0.5) ? 'top' : 'bottom';
    flourish.horizontalAlignment = (Math.random() > 0.5) ? 'left' : 'right';
    if (Math.random() > 0.5 || (el && el.getAttribute('data-flourish-direction') === 'vert')) {
      flourish.verticalPosition = 0;
      flourish.horizontalPosition = 15 * utils.randomBetween(0, 5);
    } else {
      flourish.verticalPosition = 15 * utils.randomBetween(0, 5);
      flourish.horizontalPosition = 0;
    }
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
      var quoteColours = utils.cloneObject(colours);
      utils.forEach(teamQuotes, function (index, teamQuote) {
        var quoteIndex = utils.randomBetween(0, quotes.length - 1);
        var quote = quotes[quoteIndex];

        var colourIndex = utils.pickRandomProperty(quoteColours);
        var colour = quoteColours[colourIndex];
        delete quoteColours[colourIndex];

        teamQuote.classList.add('is-visible');
        teamQuote.style.background = colour;
        teamQuote.querySelector('h4').textContent = quote.text;
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
        var index = utils.randomBetween(0, teamMembers.length - 1);
        setTeamHighlight(index);
        highlightRandomTeamMember();
      }, 3000);
    }
  }

  function initContactForm () {
    var form = document.querySelector('.js-Contact-form');
    form.addEventListener('submit', onFormSubmit);

    function onFormSubmit (e) {
      e.preventDefault();

      var loadingState = document.querySelector('.js-Contact-state--loading');
      var successState = document.querySelector('.js-Contact-state--success');
      var errorState = document.querySelector('.js-Contact-state--error');

      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var phone = document.getElementById('phone');
      var honeypot = document.getElementById('honeypot');
      var message = document.getElementById('message');

      var data = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value,
        'honeypot': honeypot.value,
        'message': message.value
      };

      var xhr = new XMLHttpRequest();
      xhr.open(form.getAttribute('method'), form.getAttribute('action'), true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      xhr.send(JSON.stringify(data));

      loadingState.classList.add('is-active');

      xhr.onerror = showError;
      xhr.onload = function () {
        loadingState.classList.remove('is-active');
        if (xhr.status >= 200 && xhr.status < 400) {
          setTimeout(function () {
            successState.classList.add('is-active');
          }, 300);

          setTimeout(function () {
            name.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
            successState.classList.remove('is-active');
          }, 3000);
        } else {
          showError();
        }
      };

      function showError () {
        loadingState.classList.remove('is-active');
        console.log(xhr.responseText);

        setTimeout(function () {
          errorState.classList.add('is-active');
        }, 300);

        setTimeout(function () {
          errorState.classList.remove('is-active');
        }, 3000);
      };
    }
  }

  function initGallery () {
    var gallery = document.querySelector('.js-Gallery-columns');
    var imageCount = 44;
    var colCount = 4;
    var imagesPerCol = Math.round(imageCount / colCount);
    var imageArray = utils.populateArray(imageCount);
    var shuffledImageArray = utils.shuffleArray(imageArray);
    var speedsArray = utils.populateArray(5);
    var shuffledSpeedsArray = utils.shuffleArray(speedsArray);

    for (var i = 0; i < colCount; i++) {
      var col = document.createElement('div');
      var speed = shuffledSpeedsArray.shift();
      col.classList.add('Gallery-column', 'Gallery-column--speed' + speed);

      for (var x = 0; x < imagesPerCol; x++) {
        var item = document.createElement('div');
        var colour = utils.pickRandomProperty(colours);
        item.classList.add('Gallery-item', 'Gallery-item--' + colour);

        var img = document.createElement('img');
        var imgSrc = shuffledImageArray.shift();
        if (imgSrc < 10) {
          imgSrc = '0' + imgSrc;
        }
        img.classList.add('Gallery-image');
        img.setAttribute('src', './images/gallery/gallery-' + imgSrc + '.jpg');
        img.setAttribute('alt', '');

        item.appendChild(img);
        col.appendChild(item);
      }
      gallery.appendChild(col);
    }

    setTimeout(function () {
      gallery.classList.add('is-animating');
    }, 1000);
  }

  function initControls () {
    var controls = document.querySelector('.js-Controls');
    positionControls();
    colourControls();
    addListeners();

    function positionControls () {
      if (Math.random() > 0.5) {
        controls.style.left = 0;
        controls.style.bottom = utils.randomBetween(0, 70) + '%';
      } else {
        controls.style.right = 0;
        controls.style.bottom = utils.randomBetween(0, 70) + '%';
      }
    }

    function colourControls () {
      var controlLinks = controls.querySelectorAll('.js-Controls-link');
      var controlColours = utils.cloneObject(colours);
      delete controlColours.pink; // rollover colour

      utils.forEach(controlLinks, function (index, controlLink) {
        var colourIndex = utils.pickRandomProperty(controlColours);
        var colour = controlColours[colourIndex];
        delete controlColours[colourIndex];
        controlLink.style.backgroundColor = colour;
      });
    }

    function addListeners () {
      var refresh = controls.querySelector('.js-Controls-link--refresh');
      refresh.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.reload();
      });

      var contact = controls.querySelector('.js-Controls-link--contact');
      contact.addEventListener('click', function (e) {
        e.preventDefault();
        var contactEl = document.querySelector('.js-Contact');
        utils.scrollTo(contactEl.offsetTop, 600);
      });
    }
  }

  function initAnalytics () {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-92818100-1', 'auto');
    ga('send', 'pageview');
  }

  var utils = {

    // http://stackoverflow.com/a/7228322
    randomBetween: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },

    cloneObject: function (obj) {
      return JSON.parse(JSON.stringify(obj));
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
    },

    // http://stackoverflow.com/a/20066663
    populateArray: function (n) {
      return Array.apply(null, {length: n}).map(Number.call, Number);
    },

    // http://stackoverflow.com/a/6274381
    shuffleArray: function (array) {
      var clonedArray = this.cloneObject(array);
      var j, x, i;
      for (i = clonedArray.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = clonedArray[i - 1];
        clonedArray[i - 1] = clonedArray[j];
        clonedArray[j] = x;
      }
      return clonedArray;
    },

    // http://stackoverflow.com/a/8918062
    scrollTo: function (to, duration) {
      if (duration < 0) return;
      var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
      var difference = to - scrollTop;
      var perTick = difference / duration * 10;

      setTimeout(function() {
        scrollTop = scrollTop + perTick;
        document.body.scrollTop = scrollTop;
        document.documentElement.scrollTop = scrollTop;
        if (scrollTop === to) return;
        utils.scrollTo(to, duration - 10);
      }, 10);
    }
  };

  init();
})();
