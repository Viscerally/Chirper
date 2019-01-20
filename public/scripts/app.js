// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

// // Test / driver code (temporary). Eventually will get this from the server.
// // var moment = require('moment');




$(document).ready(function () {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
 }

  $(".btn-default").click(function() {
    $( ".new-tweet" ).toggle( "fast", function() {
      // Animation complete.
    });
  });
  
  loadTweets();
  toastr.options.positionClass = 'toast-bottom-right';
  toastr.options.closeButton = 'true';
  function loadTweets() {
     $.ajax({
      url: '/tweets',
      type: 'GET',
      success: function (result) {
        $('.showTweets').html('');
        result.forEach(function(tweet){
          renderTweets(tweet);
        });
      },
      error: function(err){
        toastr.info("there is an error");
      }
    });
  }

  $('form').on('submit',function(e){
    e.preventDefault();
    let tweet = $('#tweettext').val();
    // console.log(tweet);
    let data = {
      text: tweet
    };
    if (!tweet.length){
      toastr.warning("You need to type something in")
     } else if (tweet.length > 140) {
        toastr.warning('Your tweet is too long')
      } else {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: data,
        success: function () {
          // console.log("it works!");  
          loadTweets();
          $('#tweettext').val('');
          $('.counter').text('140');
          toastr.success('Success! Tweet Posted!');
        },
        error: function(err){
          toastr.warning("Please type something in!");
        }
      });
      
     
    
    }
      
  });

  
  function renderTweets(data) {
    // console.log(data);
    // $('.showTweets').html("");
    createTweetElement(data);

    

  }

  function createTweetElement(tweet) {
    let $tweet = `<article class="tweet">
    <header class=tweetheader>   
      <img src=${tweet.user.avatars.small} style="width:50px;height:60px;border-radius: 20px;">
      <span class="tweetername">${tweet.user.name}</span>
      <span class="tweetholla">${tweet.user.handle}</span>
    </header>
    <section class="tweetbod">
      <p>${escape(tweet.content.text)}</p>
    </section>
    <footer class= "tweettimer"> 
        ${Math.round(tweet.created_at/86400000000) + ' days ago'}
        <i class="far fa-heart"></i>    
    </footer>
  </article>`

    $('.showTweets').prepend($tweet);


    
  }



  renderTweets();
});