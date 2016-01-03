'use strict';

describe('resource tags', function() {

  beforeEach(module('jackblog.resources',function($provide){
      $provide.constant('ServerUrl', '');
  }));

  describe('Tags getFrontTagList',function () {
    var mockTagsResource, $httpBackend,mockResponse,ServerUrl;// = "http://localhost:8080"

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockTagsResource = $injector.get('Tags');
        mockResponse = $httpBackend.when('GET', '/tags/getFrontTagList');
    }));

    it('should call getFrontTagList return success',function (done) {
      mockResponse.respond({data: [{name:'nodejs'}]});

      mockTagsResource.getFrontTagList().then(function (result) {
        expect(result.data[0].name).toBe('nodejs');
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getFrontTagList return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockTagsResource.getFrontTagList().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });
});

