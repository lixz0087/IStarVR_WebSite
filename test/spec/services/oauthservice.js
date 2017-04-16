'use strict';

describe('Service: OauthService', function () {

  // load the service's module
  beforeEach(module('istarVrWebSiteApp'));

  // instantiate service
  var OauthService;
  beforeEach(inject(function (_OauthService_) {
    OauthService = _OauthService_;
  }));

  it('should do something', function () {
    expect(!!OauthService).toBe(true);
  });

});
