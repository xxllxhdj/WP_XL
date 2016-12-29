(function(app) {
    'use strict';

    // Start by defining the main module and adding the module dependencies
    angular
        .module(app.applicationModuleName, app.applicationModuleVendorDependencies);

    // Setting HTML5 Location Mode
    angular
        .module(app.applicationModuleName)
        .config(bootstrapConfig);

    bootstrapConfig.$inject = ['$compileProvider', '$locationProvider', '$httpProvider', '$logProvider'];

    function bootstrapConfig($compileProvider, $locationProvider, $httpProvider, $logProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        $httpProvider.interceptors.push('authInterceptor');

        // Disable debug data for production environment
        // @link https://docs.angularjs.org/guide/production
        $compileProvider.debugInfoEnabled(app.applicationEnvironment !== 'production');
        $logProvider.debugEnabled(app.applicationEnvironment !== 'production');
    }


    // Then define the init function for starting up the application
    angular.element(document).ready(init);

    function init() {
        angular.bootstrap(document, [app.applicationModuleName]);
    }
}(ApplicationConfiguration));
