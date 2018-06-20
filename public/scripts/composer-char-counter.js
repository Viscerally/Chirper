$(document).ready(function () {
  var counter = $('.counter');
  var tweet = $("textarea[name=text]");
  tweet.on('input', function (event) {
    counterNum = (140 - event.target.value.length);
    counter.text(counterNum);


    var color = 'black';
    if (counterNum < 0) {
      color = 'red';
    }
counter.css({color: color});
  });
});