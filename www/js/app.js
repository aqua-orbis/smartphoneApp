//var urlapi = "http://127.0.0.1:3000/api/";
var urlapi = "http://46.105.30.116:3000/api/";

angular.module('app', [
    'ionic',
    'ngCordova',
    'chart.js',
    'app.menu',
    'app.signup',
    'app.login',
    'app.dashboard',
    'app.users',
    'app.user',
    'app.edituser',
    'app.devices',
    'app.device',
    'app.newdevice',
    'app.usage',
    'app.newsfeed',
    'app.newpublication'
  ])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
      })

        .state('app.signup', {
          url: '/signup',
          views: {
            'menuContent': {
              templateUrl: 'templates/signup.html',
              controller: 'SignupCtrl'
            }
          }
        })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      })

      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'menuContent': {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }
      })
    .state('app.users', {
      url: '/users',
      views: {
        'menuContent': {
          templateUrl: 'templates/users.html',
          controller: 'UsersCtrl'
        }
      }
    })
      .state('app.user', {
        url: '/users/:userid',
        views: {
          'menuContent': {
            templateUrl: 'templates/user.html',
            controller: 'UserCtrl'
          }
        }
      })

      .state('app.edituser', {
      url: '/edituser',
      views: {
        'menuContent': {
          templateUrl: 'templates/edituser.html',
          controller: 'EdituserCtrl'
        }
      }
      })
      .state('app.devices', {
        url: '/devices',
        views: {
          'menuContent': {
            templateUrl: 'templates/devices.html',
            controller: 'DevicesCtrl'
          }
        }
      })
      .state('app.device', {
        url: '/devices/:deviceid',
        views: {
          'menuContent': {
            templateUrl: 'templates/device.html',
            controller: 'DeviceCtrl'
          }
        }
      })
    .state('app.newdevice', {
      url: '/newdevice',
      views: {
        'menuContent': {
          templateUrl: 'templates/newdevice.html',
          controller: 'NewdeviceCtrl'
        }
      }
    })
  .state('app.usage', {
    url: '/usage',
    views: {
      'menuContent': {
        templateUrl: 'templates/usage.html',
        controller: 'UsageCtrl'
      }
    }
  })
    .state('app.newsfeed', {
      url: '/newsfeed',
      views: {
        'menuContent': {
          templateUrl: 'templates/newsfeed.html',
          controller: 'NewsfeedCtrl'
        }
      }
    })
  .state('app.newpublication', {
    url: '/newpublication',
    views: {
      'menuContent': {
        templateUrl: 'templates/newpublication.html',
        controller: 'NewpublicationCtrl'
      }
    }
  });
    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/dashboard');

    // if none of the above states are matched, use this as the fallback
    if ((localStorage.getItem("water_app_token")) && (JSON.parse(localStorage.getItem("water_app_userdata")) != "null") && (JSON.parse(localStorage.getItem("water_app_userdata")) != null)) {
            if ((window.location.hash == "#/app/login") || (window.location.hash == "#/app/signup")) {
                window.location = '#/app/dashboard';
            }
            $urlRouterProvider.otherwise('/app/dashboard');
        } else {
            if ((window.location != "#/app/login") || (window.location != "#/app/signup")) {
                console.log("removing data, and going to login");
                localStorage.removeItem("water_app_token");
                localStorage.removeItem("water_app_userdata");
                window.location = "#/app/login";
                $urlRouterProvider.otherwise('/app/login');
            }
        }
  })

  .factory('httpInterceptor', function httpInterceptor($q, $window, $location) {
        return {
            request: function (config) {
                return config;
            },
            requestError: function (config) {
                return config;
            },
            response: function (res) {
                return res;
            },
            responseError: function (res) {
                return res;
            }
        }
    })
    .factory('api', function ($http) {
        return {
            init: function () {
                $http.defaults.headers.common['X-Access-Token'] = localStorage.getItem("water_app_token");
                $http.defaults.headers.post['X-Access-Token'] = localStorage.getItem("water_app_token");
            }
        };
    })
    .run(function (api) {
        api.init();
    })

    .factory('utils', function($filter) {
        return {
            deviceToChart: function(device) {
                var registers = device.registers;
                var data = [];
                var labels = [];
                for(var i=0; i<registers.length; i++) {
                    data.push(registers[i].value);
                    var lbl = $filter('date')(registers[i].date, 'HH')
                    labels.push(lbl);
                }
                return [data, labels];
            },
            contractToChart: function(contract) {
                var data = [];
                var labels = [];
                for(var i=0; i<contract.data.length; i++) {
                    data.push(contract.data[i].consumo);
                    labels.push(contract.data[i].anymes_cal);
                }
                return [data, labels];
            }
        };
    });
