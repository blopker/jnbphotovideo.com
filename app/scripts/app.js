define(['flickr', 'jquery'], function(Flickr, $) {
  'use strict';
  function App (options) {
    this._init(options);
    return this;
  }

  App.prototype = {
    _init: function(options) {
      this.options = options;
      this.pages = options.pages;
      this.sources = {
        'flickr': new Flickr(options.flickr)
      };
      this._createNav();
      console.log(options);
    },
    _createNav: function() {
      var nav = $('<nav><ul></ul></nav>');
      $.each(this.pages, function(pageName) {
        $('ul', nav).append('<li><a href=#' + pageName + '>' + pageName + '</li>');
      });
      $('header').after(nav);
    },
    go: function(pageID) {
      var page = this.pages[pageID] || this.pages.home;
      this.sources[page.source].get(page);
    }
  };
  return App;
});
