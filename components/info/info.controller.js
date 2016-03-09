(function () {
  angular
      .module('fsApp.info', [])
      .controller('InfoController', [InfoController]);

  function InfoController() {
    var info = this;
    info.projects = [
      {
        language: 'Web-Entwickler',
        developers: [
          {name: 'Fabio Hellmann'},
          {name: 'Benjamin Arnold'}
        ]
      },
      {
        language: 'Android-Entwickler',
        developers: [
          {name: 'Fabio Hellmann'},
          {name: 'René Ramsch', till: 'WS 2014'}
        ]
      },
      {
        language: 'iOS-Entwickler',
        developers: [
          {name: 'Benjamin Reischböck', till: 'WS 2015'}
        ]
      }
    ]
  }

})();