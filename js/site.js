/*
 * Hello there!
 * If you are interested in our code, take a look at:
 * https://github.com/studio-awkward/getawkward.co.uk
 */
(function () {

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

  function init () {
    addWelcomeConsoleLog();
  }

  init();
})();
