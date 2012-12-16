require.config({
  shim: {
  },

  paths: {
    jquery: 'vendor/jquery.min',
    routie: '../components/routie/dist/routie.min'
  }
});

require(['app', 'jquery', 'routie'], function(App, $, routie) {
  'use strict';
  $.getJSON('site.json', function(options) {
    var app = new App(options);
    app.go('wedding');
  });
});
