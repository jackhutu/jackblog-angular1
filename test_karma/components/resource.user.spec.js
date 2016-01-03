'use strict';

describe('resource blog', function() {
  var mockResource, $httpBackend,mockResponse;

  beforeEach(module('jackblog.resources',function($provide){
      $provide.constant('ServerUrl', '');
  }));

  beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      mockResource = $injector.get('User');
  }));

  describe('User getCaptcha',function () {
    var mockResponse;
    beforeEach(inject(function ($injector) {
      mockResponse = $httpBackend.when('GET', '/users/getCaptcha');
    }));

    it('should call getCaptcha return data',function (done) {
      mockResponse.respond('ldjflsjdlfjljjlsjdfjlsjdf');

      mockResource.getCaptcha().then(function (result) {
        expect(result).toBeDefined();
      }).catch(function (err) {
        expect(err).toBeUndefined();
      }).finally(done);
      $httpBackend.flush();
    });
    it('should call getCaptcha return error_msg',function (done) {
      mockResponse.respond(422,'');
      mockResource.getCaptcha().then(function (result) {
        expect(result).toBeUndefined();
      }).catch(function (err) {
        expect(err.status).toEqual(422);
      }).finally(done);
      $httpBackend.flush();
    });
  });

	describe('User mdUser',function () {
	  var mockResponse;
	  beforeEach(inject(function ($injector) {
	    mockResponse = $httpBackend.when('PUT', '/users/mdUser');
	  }));

	  it('should call mdUser return success',function (done) {
	    mockResponse.respond({success:true,data:{nickname:'jack hu'}});

	    mockResource.mdUser().then(function (result) {
	      expect(result.success).toBeTruthy();
	      expect(result.data.nickname).toBe('jack hu');
	    }).catch(function (err) {
	      expect(err).toBeUndefined();
	    }).finally(done);
	    $httpBackend.flush();
	  });
	  it('should call updateUser return error_msg',function (done) {
	    mockResponse.respond(403,'');
	    mockResource.mdUser().then(function (result) {
	      expect(result).toBeUndefined();
	    }).catch(function (err) {
	      expect(err.status).toEqual(403);
	    }).finally(done);
	    $httpBackend.flush();
	  });
	});

	describe('User getUserProvider',function () {
	  var mockResponse;
	  beforeEach(inject(function ($injector) {
	    mockResponse = $httpBackend.when('GET', '/users/getUserProvider');
	  }));

	  it('should call getUserProvider return success',function (done) {
	    mockResponse.respond({data:{github:{},qq:{}}});

	    mockResource.getUserProvider().then(function (result) {
	      expect(result.data).toBeDefined();
	    }).catch(function (err) {
	      expect(err).toBeUndefined();
	    }).finally(done);
	    $httpBackend.flush();
	  });
	  it('should call getUserProvider return error_msg',function (done) {
	    mockResponse.respond(403,'');
	    mockResource.getUserProvider().then(function (result) {
	      expect(result).toBeUndefined();
	    }).catch(function (err) {
	      expect(err.status).toEqual(403);
	    }).finally(done);
	    $httpBackend.flush();
	  });
	});

	describe('User get',function () {
	  var mockResponse;
	  beforeEach(inject(function ($injector) {
	    mockResponse = $httpBackend.when('GET', '/users/me');
	  }));

	  it('should call get return me',function (done) {
	    mockResponse.respond({nickname:'jack',email:'test@test.com'});

	    mockResource.get().$promise.then(function (result) {
	      expect(result.nickname).toBe('jack');
	    }).catch(function (err) {
	      expect(err).toBeUndefined();
	    }).finally(done);
	    $httpBackend.flush();
	  });
	  it('should call get return error_msg',function (done) {
	    mockResponse.respond(403,'');
	    mockResource.get().$promise.then(function (result) {
	      expect(result).toBeUndefined();
	    }).catch(function (err) {
	      expect(err.status).toEqual(403);
	    }).finally(done);
	    $httpBackend.flush();
	  });
	});

});