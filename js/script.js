function load(id){
  loadGalleryImages(id+"page");
}

function getFlickrURL(tag){ // Built using http://www.flickr.com/services/api/explore/flickr.photos.search
  var userID = "39659820@N00";
  var apiKey = "6a6e8ec332516ebd042382f62afdb1fc";
  var URL = "http://api.flickr.com/services/rest/?method=flickr.photos.search";
  URL += "&api_key=" + apiKey;
  URL += "&user_id=" + userID;
  URL += "&tags=" + tag;
  URL += "&extras=url_sq%2C+url_t%2C+url_s%2C+url_m%2C+url_z%2C+url_l%2C+url_o";
  URL += "&format=json";
  return URL;
}

function loadGalleryImages(tag){ // Append the API call to the head.
  var headID = document.getElementsByTagName("head")[0];         
  var newScript = document.createElement('script');
  newScript.type = 'text/javascript';
  newScript.src = getFlickrURL(tag);
  headID.appendChild(newScript);
}

function jsonFlickrApi(rsp) {
  if (rsp.stat != "ok"){
    // something broke!
    return;
  }

  var gallery = document.getElementById("gallery");

  for (var i=0; i < rsp.photos.photo.length; i++) {
    var photo = rsp.photos.photo[i];
    var cell = document.createElement("td");
    var link = document.createElement("a");
    link.setAttribute("href", photo.url_l || photo.url_z);
    link.setAttribute("target", "_blank");
    var img = document.createElement("img");
    img.setAttribute("src",photo.url_z);
    gallery.appendChild(cell);
    cell.appendChild(link);
    link.appendChild(img);
  }
}

/* Copyright 2008 Paul Bennett - http://paulicio.us
 * Scroller.js
 * Captures mouse wheel events and runs the ScrollSmoothly
 * function based on their output.
 * Aims to aid usability by allowing the user to scroll the 
 * page horizontally smoothly using only their mousewheel.
 * Mousewheel event capture by Adomas PaltanaviAius at http://adomas.org/
 */

function handle(delta) {
        if (delta === 0)
          return;
            
        if (delta <0)
          ScrollSmoothly(10,10,'right');
        else
          ScrollSmoothly(10,10,'left');                    
}
 
function wheel(event){
        var delta = 0;
        if (!event) 
                event = window.event;
        if (event.wheelDelta) {
                delta = event.wheelDelta/120;
        } else if (event.detail) {
                delta = -event.detail/3;
        }
        if (delta)
                handle(delta);
        if (event.preventDefault)
                event.preventDefault();
  event.returnValue = false;
}

var repeatCount = 0;

function ScrollSmoothly(scrollPos,repeatTimes, direction) {
    if(direction == 'right')
      window.scrollBy(60,0);
    else
      window.scrollBy(-60,0);
}
 
/* Initialization code. */
if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

// End Scroller.js