define(['jquery'], function($) {
  'use strict';
  function Flickr (options) {
    this._init(options);
    return this;
  }

  Flickr.prototype = {
    _init: function(options) {
      this.options = {'userId': options.user, 'apiKey': options.apiKey};
    },
    _getURL: function(tag) {
      var userID = this.options.userId;
      var apiKey = this.options.apiKey;
      var URL = 'http://api.flickr.com/services/rest/?method=flickr.photos.search';
      URL += '&api_key=' + apiKey;
      URL += '&user_id=' + userID;
      URL += '&tags=' + tag;
      URL += '&extras=url_m%2C+url_z%2C+url_l%2C+url_o';
      URL += '&format=json';
      URL += '&jsoncallback=?';
      return URL;
    },
    _getParsedPhotos: function(response) {
      var photos = [];
      console.log(response);
      $.each(response.photos.photo, function() {
        var largestSize = this.url_o || this.url_l || this.url_z || this.url_m;
        if(largestSize){
          photos.push(largestSize);
        }
      });
      return photos;
    },
    get: function(tag, callback) {
      var self = this;
      var url = this._getURL(tag);
      $.getJSON(url, function(response) {
        var photos = self._getParsedPhotos(response);
        if (callback) {
          callback(photos);
        }
      });
    }
  };

  return Flickr;
});
