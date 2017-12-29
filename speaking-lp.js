
///////// URL PArams.

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}





///////// Check for Msgs


// Is it the thank you page?

if(getAllUrlParams().msg == "ty"){
$("#ieNotif > h3").replaceWith( "<h2>Thank You.</h2>" );
$("#ieNotif > p").replaceWith( "<p>We will be in touch soon.</p>" );
$("#ieNotif > a.btn.btn-danger").hide();
$("#ieNotif > a.btn.btn-success").hide();
$("#notif_sub").hide();
$("#ieNotif").fadeIn();

}


// Is it the error page.
if(getAllUrlParams().msg == "er"){
$("#ieNotif > h3").replaceWith( "<h2>There was an issue processing your form.</h2>" );
$("#ieNotif > p").replaceWith( "<p>Sorry about that.<br/> If this issue persists call us at <a href='tel:360-342-6176'>+1 (360) 342-6176</a></p>" );
$("#ieNotif > a.btn.btn-danger").hide();
$("#ieNotif > a.btn.btn-success").hide();
$("#notif_sub").hide();
$("#ieNotif").fadeIn();

}





///////// Form Validation


// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("#form_speaking_lp").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      name: "required",
      company: "required",
      email: {
        required: true,
        // Specify that email should be validated
        // by the built-in "email" rule
        email: true
      },
      phone: {
        required: true,
        minlength: 10
      }
    },
    // Specify validation error messages
    messages: {
      name: "Please enter your name.<br/><br/>",
      company: "Please enter your company name.<br/><br/>",
      phone: {
        required: "Please provide a phone.<br/><br/>",
        minlength: "Your phone must be at least 5 characters long.<br/><br/>"
      },
      email: "Please enter a valid email address.<br/><br/>"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});





///////// Event tracking












// Click Hero button
function hero_button() {

  ga('send', {
    hitType: 'event',
    eventCategory: 'ken_speaking_lp',
    eventAction: 'click',
    eventLabel: 'book_button_top'
  });
  console.log("HERO BUTTON");
}


// Click Submit
function submit_button() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'ken_speaking_lp',
    eventAction: 'click',
    eventLabel: 'book_button_submit'
  });
    console.log("Submit BUTTON");
}







//Filter through Headings.
function next() {
    var current = $("#feature_filter > li:visible");
    current.hide();
    var next = current.next("li");
    if(next.length == 0)
        next = current.siblings().filter("li:first");
    //console.log(next);
    next.fadeIn("slow");
}
setInterval(next, 2000);





//Youtube Video Import and tracking.

var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
  height: '316',
  width: '569',
  videoId: 'W3p9XlH7qTQ',
  events: {
  'onReady': onPlayerReady,
  'onStateChange': onPlayerStateChange
}
});
}
function onPlayerReady(event) {
/// event.target.playVideo();
}


function onPlayerStateChange(event) {
    if (event.data ==YT.PlayerState.PLAYING)
    {
      ga('send','_trackEvent', 'Videos', 'Play', player.getVideoUrl());
      console.log("Play");
    }
    if (event.data ==YT.PlayerState.ENDED)
    {
      ga('send','_trackEvent', 'Videos', 'Watch to End', player.getVideoUrl());
      console.log("watch-till-end");
    }
  }
