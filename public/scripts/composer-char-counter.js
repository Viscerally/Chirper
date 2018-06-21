$(document).ready(function () {
  var counter = $('.counter');
  var tweet = $("textarea[name=text]");
  tweet.on('input', function (event) {
    counterNum = (140 - event.target.value.length);
    counter.text(counterNum);
    var color = counterNum < 0 ? "red" : "black";
    counter.css({ color });
  });
});

