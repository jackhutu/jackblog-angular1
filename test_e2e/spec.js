describe('jackblog flow test',function() {
	var article_title,article_id;

	describe('index page', function() {
	  it('should return index page title', function() {
	    browser.get('/');
	    expect(browser.getTitle()).toBe("Jack Hu's blog");
	  });
	});

	describe('local sign in', function() {
	  it('should sign in go to index', function() {
	    browser.get('/signin');
	    element(by.model('user.email')).sendKeys('admin@admin.com');
	    element(by.model('user.password')).sendKeys('admin');
	    element(by.model('user.captcha')).sendKeys('888888');
	    element(by.id('signin_btn')).click();

	    expect(browser.getLocationAbsUrl()).toBe('/');
	  });
	});


	describe('article list',function () {

		it('should find write blog title',function () {
			var title = element(by.repeater('blog in blogList').row(0).column('blog.title'));
			//expect(title.getText()).toEqual(article_title);
			title.getAttribute('href').then(function(url) {
			  expect(url).toMatch('/article');
			  expect(url.split('/article/')[1]).toBeDefined();
			  article_id = url.split('/article/')[1];
			});
		});

	});

	describe('article desc',function () {


		it('should add like number',function () {
			browser.get('/article/' + article_id);

			var likeElement = element(by.css('.like-btn'));
			expect(likeElement.isPresent()).toBeTruthy();
			var likeCountElement = likeElement.element(by.binding('article.like_count'));
			likeCountElement.getText().then(function (count) {
				likeElement.click();
				expect(likeCountElement.getText()).toEqual(String(parseInt(count) + 1));
				likeElement.click();
				expect(likeCountElement.getText()).toEqual(count);
			});
		});

		it('should add new comment',function() {
			// expect(element(by.exactRepeater('comment in commentList')).isPresent())
			//     .toBe(true);
			var comments = element.all(by.repeater('comment in commentList'));
			comments.count().then(function (count) {
				var beforeCount = parseInt(count) + 1;
				element(by.model('newComment.content')).sendKeys('帅锅,写的真棒.');
				element(by.id('comment_submit_btn')).click();
				expect(comments.count()).toBe(beforeCount);
			});

		});

		it('should add new reply',function() {
			var comment = element(by.repeater('comment in commentList').row(0));
			var replys = comment.all(by.repeater('reply in comment.replys'));

			replys.count().then(function (count) {
				var beforeCount = parseInt(count) + 1;
				element.all(by.css('.reply')).first().click();
				comment.element(by.model('replyContent')).sendKeys('哎哟!你也不错哦.');
				comment.element(by.id('reply_submit_btn_0')).click();
				expect(replys.count()).toBe(beforeCount);
			});

		});

	});
	
	describe('logout',function () {

		it('should change day mode and night mode',function () {
			expect(element(by.css('.change-mode')).isPresent()).toBe(true);
			element.all(by.css('.change-mode')).first().click();
			var bgColor = element(by.tagName('body')).getCssValue('background-color');

			expect(bgColor).toBe('rgba(63, 63, 63, 1)'); //#3f3f3f
		});

		it('should logout go to index',function () {
			expect(element(by.css('.expanded-logout')).isPresent()).toBe(true);
			element(by.css('.expanded-logout')).click();
			expect(browser.getLocationAbsUrl()).toBe('/');
		});

	});

});
