define(['flickr', 'vimeo', 'jquery'], function(Flickr, Vimeo, $) {
  'use strict';

  // Source to get html snippets.
  function HTMLSource() {
    return {
      get: function(page, callback) {
        callback($('#' + page.id).clone().show());
      }
    };
  }

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
        'vimeo': new Vimeo(),
        'html': new HTMLSource()
      };
      this._createNav();
    },
    _createNav: function() {
      var nav = $('<ul>');
      $.each(this.pages, function(pageName) {
        $(nav).append('<li><a href=#' + pageName + '>' + pageName + '</li>');
      });
      $('nav').append(nav);
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
    _getPage: function(pageID) {
      return this.pages[pageID] || this.pages.home;
    },
    _setNavHighlight: function(pageID) {
      $('nav a').removeClass('active');
      $('nav a[href=#' + pageID + ']').addClass('active');
    },
    go: function(pageID, callback) {
      this._setNavHighlight(pageID);
      var self = this;
      var page = this._getPage(pageID);
      // console.log('leaving page');
      this._transitionOut(function() {
        self._getPageItems(page, function(results) {
          // console.log('got items');
          self._transitionIn(results, callback);
        });
      });
    }
  };
  return App;
});
