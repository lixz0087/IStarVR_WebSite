'use strict';

describe('Controller: TopbarbeforeloginCtrl', function () {

  // load the controller's module
  beforeEach(module('istarVrWebSiteApp'));

  var TopbarbeforeloginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopbarbeforeloginCtrl = $controller('TopbarbeforeloginCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TopbarbeforeloginCtrl.awesomeThings.length).toBe(3);
  });
});
