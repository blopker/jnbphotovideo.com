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
      var self = this;
      var photos = [];
      $.each(response.photos.photo, function() {
        var largestSize = this.url_o || this.url_l || this.url_z || this.url_m;
        if(largestSize){
          photos.push(self._createPhotoLink(largestSize));
        }
      });
      return photos;
    },
    _createPhotoLink: function(photoURL) {
      var link = $('<a>').attr('href', photoURL).attr('target', '_blank');
      var img = $('<img>').attr('src', photoURL);
      link.append(img);
      return link;
    },
    get: function(page, callback) {
      var self = this;
      var url = this._getURL(page.tag);
      $.getJSON(url, function(response) {
        var photos = self._getParsedPhotos(response);
        callback(photos);
      });
    }
  };

  return Flickr;
});
