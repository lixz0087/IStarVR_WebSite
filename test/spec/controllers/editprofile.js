'use strict';

describe('Controller: EditprofileCtrl', function () {

  // load the controller's module
  beforeEach(module('istarVrWebSiteApp'));

  var EditprofileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditprofileCtrl = $controller('EditprofileCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditprofileCtrl.awesomeThings.length).toBe(3);
  });
});
