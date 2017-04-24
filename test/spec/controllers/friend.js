'use strict';

describe('Controller: FriendCtrl', function () {

  // load the controller's module
  beforeEach(module('istarVrWebSiteApp'));

  var FriendCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FriendCtrl = $controller('FriendCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FriendCtrl.awesomeThings.length).toBe(3);
  });
});
