'use strict';

describe('Controller: SurbhiCtrl', function () {

  // load the controller's module
  beforeEach(module('istarVrWebSiteApp'));

  var SurbhiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SurbhiCtrl = $controller('SurbhiCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SurbhiCtrl.awesomeThings.length).toBe(3);
  });
});
