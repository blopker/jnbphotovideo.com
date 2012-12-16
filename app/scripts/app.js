define(['flickr', 'vimeo', 'jquery'], function(Flickr, Vimeo, $) {
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
        'flickr': new Flickr(options.flickr),
        'vimeo': new Vimeo()
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
    _getPageItems: function(page, callback) {
      var source = this.sources[page.source];
      if (!source) {return;}
      source.get(page, function(results) {
        callback(results);
      });
    },
    _transitionOut: function(callback) {
      $('#gallery').fadeOut(function() {
        $(this).empty();
        if (callback) {
          callback();
        }
      });
    },
    _transitionIn: function(items, callback) {
      var gallery = $('#gallery');
        $.each(items, function() {
          gallery.append(this);
        });
        gallery.fadeIn(function() {
          if (callback) {
            callback();
          }
        });
    },
    _setNavHighlight: function(pageID) {
      $('nav a').removeClass('active');
      $('nav a[href=#' + pageID + ']').addClass('active');
    },
    go: function(pageID, callback) {
      this._setNavHighlight(pageID);
      var self = this;
      var page = this.pages[pageID] || this.pages.home;
      this._transitionOut(function() {
        self._getPageItems(page, function(results) {
          self._transitionIn(results, callback);
        });
      });
    }
  };
  return App;
});
