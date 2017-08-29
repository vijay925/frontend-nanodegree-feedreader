/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a URL', function() {
            var feedUrl;
            allFeeds.forEach(function(feed) {
                feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl.length).not.toBe(0);
            });
        });

        it('have names that are defined', function() {
            var feedName;
            allFeeds.forEach(function(feed) {
                feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        var body = $('body');
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('changes visibility', function() {
            $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are loaded', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var currentFeed, feedAfterClick;

        beforeEach(function(done) {
            loadFeed(0 ,function() {
              currentFeed = $('.feed').html();
              loadFeed(1, function() {
                feedAfterClick = $('.feed').html();
                done();
              });
            });
        });

        it('changes content' , function(done) {
            expect(currentFeed != feedAfterClick).toBe(true);
            done();
        });
    });

}());
