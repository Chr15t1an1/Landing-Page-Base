
///////// Form Validation





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
