'use strict';
(function () {
  angular
      .module('fsApp', [

        // Modules
        'ui.router',
        'ngSanitize',
        'angular.filter',
        'ui.materialize',

        // Components
        'fsApp.navigation',
        'fsApp.footer',
        'fsApp.home',
        'fsApp.blackboard',
        'fsApp.info',
        'fsApp.jobs',
        'fsApp.lostfound',
        'fsApp.mensa',
        'fsApp.mvv',
        'fsApp.news',
        'fsApp.rooms',
        'fsApp.timetable',
        'fsApp.editor',

        // Directives
        'fsApp.developer.directive',
        'fsApp.updatetitle.directive',

        // Services
        'fsApp.data.service',
        'fsApp.filter.service'
      ])
      .config(FsAppConfig);

  function FsAppConfig($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
        .state('home', {
          url: "/home",
          data: {
            pageTitle: 'HM - Fachschaft 07'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/home/home.html",
              controller: "HomeController as home"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('blackboard', {
          url: "/blackboard",
          data: {
            pageTitle: 'Schwarzes Brett'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/blackboard/blackboard.html",
              controller: "BlackboardController as blackboard"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('info', {
          url: "/info",
          data: {
            pageTitle: 'Information'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/info/info.html",
              controller: "InfoController as info"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('jobs', {
          url: "/jobs",
          data: {
            pageTitle: 'Jobs'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/jobs/jobs.html",
              controller: "JobsController as jobs"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('lostfound', {
          url: "/lostfound",
          data: {
            pageTitle: 'Fundsachen'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/lostfound/lostfound.html",
              controller: "LostFoundController as lostfound"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('mensa', {
          url: "/mensa",
          data: {
            pageTitle: 'Mensa'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/mensa/mensa.html",
              controller: "MensaController as mensa"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('mvv', {
          url: "/mvv",
          data: {
            pageTitle: 'MVV'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/mvv/mvv.html",
              controller: "MvvController as mvv"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('news', {
          url: "/news",
          data: {
            pageTitle: 'Neuigkeiten'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/news/news.html",
              controller: "NewsController as news"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('rooms', {
          url: "/rooms",
          data: {
            pageTitle: 'Raumsuche'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/rooms/rooms.html",
              controller: "RoomsController as rooms"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('timetable', {
          url: "/timetable",
          data: {
            pageTitle: 'Stundenplan'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/timetable/timetable.html",
              controller: "TimetableController as timetable"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        })
        .state('editor', {
          url: "/editor",
          data: {
            pageTitle: 'Stundenplan'
          },
          views: {
            "navigation": {
              templateUrl: "components/navigation/navigation.html",
              controller: "NavController as nav"
            },
            "content": {
              templateUrl: "components/timetable/editor/editor.html",
              controller: "TimetableEditorController as editor"
            },
            "footer": {
              templateUrl: "components/footer/footer.html",
              controller: "FooterController as footer"
            }
          }
        });
  }
})();