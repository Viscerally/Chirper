// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

// // Test / driver code (temporary). Eventually will get this from the server.
// // var moment = require('moment');




$(document).ready(function () {

  $(".toggle").click(function() {
    $( ".new-tweet" ).toggle( "fast", function() {
      // Animation complete.
    });
  });

  // var $form = $('form').on('submit', function(event){
  //   event.preventDefault();
  //   var tweetStrings= $('form').serialize();
  // });
  loadTweets();

  function loadTweets() {
     $.ajax({
      url: '/tweets',
      type: 'GET',
      success: function (result) {
        result.forEach(function(tweet){
          renderTweets(tweet);
        });
      },
      error: function(err){
        alert("there is an error");
      }
    });
  }

  $('form').on('submit',function(e){
    e.preventDefault();
    let tweet = $('#tweettext').val();
    console.log(tweet);
    let data = {
      text: tweet
    };
    if (!tweet.length){
      alert("You need to type something in")
     } else if (tweet.length > 140) {
        alert('Your tweet is too long')
      } else {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: data,
        success: function () {
          console.log("it works!");  
          loadTweets();
          
        },
        error: function(err){
          alert("Please type something in!");
        }
      });
      
     
    
    }
      
  });

  
  function renderTweets(data) {
    console.log(data);
    createTweetElement(data);

    

  }

  function createTweetElement(tweet) {
    let $tweet = $('<section>').addClass('showTweets');
    let $article = $('<article>').addClass('tweet');
    let $header = $('<header>');
    let $toggle = $('<button>').addClass('toggle');
    let $avatar = $('<img>').addClass('avatar').attr('src', tweet.user.avatars.small); //style is not yet created (still inline)

    let $tweetername = $('<span>').addClass('tweetername')
    $tweetername.text(tweet.user.name);

    let $tweetholla = $('<span>').addClass('tweetholla')
    $tweetholla.text(tweet.user.handle);

    let $tweetbod = $('<section>').addClass('tweetbod');

    let $tweettimer = $('<footer>').addClass('tweettimer')
    $tweettimer.text(tweet.created_at); 

    let $i_flag = $('<i>').addClass('fas fa-flag');

    let $i_rt = $('<i>').addClass('fas fa-retweet');

    let $i_heart = $('<i>').addClass('far fa-heart');
    
    $header.append($avatar);
    $header.append($tweetername);
    $header.append($tweetholla);
    $tweetbod.text(tweet.content.text);
    $tweettimer.append($i_flag);
    $tweettimer.append($i_rt);
    $tweettimer.append($i_heart);
    $tweet.append($article);
    $article.append($header);
    $article.append($tweetbod);
    $article.append($tweettimer);
    // console.log($header);
    $('.container').append($tweet);
    //console.log('test');

    
  }


  // renderTweets(data);
  renderTweets();
});