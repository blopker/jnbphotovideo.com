define(['jquery'], function($) {
  'use strict';
  function Vimeo (options) {
    this._init(options);
    return this;
  }

  Vimeo.prototype = {
    _init: function(options) {
      this.options = options;
    },
    _getVideoIDs: function(page, callback) {
      callback(page.videos);
    },
    _makeIframes: function(videoIDs) {
      var iframes = [];
      $.each(videoIDs, function() {
        var iframe = '<iframe src="http://player.vimeo.com/video/' + this + '?portdait=0" width="900px" height="530px"></iframe>';
        iframes.push(iframe);
      });
      return iframes;
    },
    get: function(page, callback) {
      var self = this;
      this._getVideoIDs(page, function(videoIDs) {
        var iframes = self._makeIframes(videoIDs);
        callback(iframes);
      });
    }
  };
  return Vimeo;
});
