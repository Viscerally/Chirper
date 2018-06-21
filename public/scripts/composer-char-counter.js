debugger;
$(document).ready(function () {
  var counter = $('.counter');
  console.log ("this is a console log", "1")
  var tweet = $("textarea[name=text]");
  tweet.on('input', function (event) {
    console.log ("this is a console log", "2")
    counterNum = (140 - event.target.value.length);
    counter.text(counterNum);
    var color = counterNum < 0 ? "red" : "black";
    counter.css({ color });
  });
});

