var appConfigURL = 'site.json';

require.config({
  paths: {
    jquery: 'vendor/jquery.min',
    routie: '../components/routie/dist/routie.min',
    fancybox: '../components/fancybox/source/jquery.fancybox.pack',
    mousewheel: '../components/jquery-mousewheel/jquery.mousewheel'
  },
  shim: {
    'routie':{
      exports: 'routie'
    },
    'fancybox': ['jquery'],
    'mousewheel': ['jquery']
  }
});

require(['app', 'jquery', 'routie', 'fancybox', 'mousewheel'], function(App, $, routie, fancybox, mousewheel) {
  'use strict';
  $.getJSON(appConfigURL, function(options) {
    var app = new App(options);

    routie({
      ':page': function(page) {
        app.go(page, function() {
          window.scrollTo(0,0);
        });
      },
      '': function() {
        app.go('home');
      }
    });

    $('.strip a').fancybox({
      openEffect : 'elastic',
      openSpeed  : 150,

      closeEffect : 'elastic',
      closeSpeed  : 150,

      closeClick : true
    });

    // Scroll sideways.
    $(window).mousewheel(function(event, delta) {
      $('#gallery').scrollLeft($('#gallery').scrollLeft() + (delta * -100));
      event.preventDefault();
    });
  });

  // Set copyright year.
  $('.year').html(new Date().getFullYear());
});
