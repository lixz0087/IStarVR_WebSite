'use strict';

describe('Controller: HomebeforeloginCtrl', function () {

  // load the controller's module
  beforeEach(module('istarVrWebSiteApp'));

  var HomebeforeloginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomebeforeloginCtrl = $controller('HomebeforeloginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HomebeforeloginCtrl.awesomeThings.length).toBe(3);
  });
});
