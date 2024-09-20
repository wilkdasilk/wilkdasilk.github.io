// sanity check
console.log("app.js linked.");

// Because ruby does it better and why not?
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.titleize = function() {
    var string_array = this.split(' ');
    string_array = string_array.map(function(str) {
       return str.capitalize();
    });

    return string_array.join(' ');
}

var tempProject = {};
//var showProjectIndex = 0;
var projectCount = 0;
//var currentProject;

// $.ajax({
//   url: "https://api.github.com/search/repositories?q=user:wilkdasilk+topic:featured+fork:true&sort=updated",
//   method: "GET",
//   success: getProjects,
//   error: onError
// });

//json for projects

var imageLinks = [
  "assets/imgs/angel-city-brewery.jpg",
  "assets/imgs/pasadena-hike.jpg",
  "assets/imgs/grand-central-market.jpg",
  "assets/imgs/santa-monica-pier.jpg",
  "assets/imgs/griffith.jpg"
]

var data = [
  {
    description: "What kind of creature are you? Idk, better take a quiz. Single-page app using jQuery",
    link: "https://github.com/wilkdasilk/MiddleEarthCreatureQuiz",
    live: "#",
    name: "MiddleEarthCreatureQuiz",
    picture: "https://raw.githubusercontent.com/wilkdasilk/MiddleEarthCreatureQuiz/master/app/assets/images/preview/creaturequiz-preview.png",
    tools: "MongoDB, Express, Node, jQuery, Mongoose, Bootstrap, Lodash",
    contributions: "<li>Created method for obscuring question/answer alignment and randomizing presentation</li><li>Implemented madlib with user answers inserted client-side</li>"
  },
  {
    description: "A travel community for users to share city specific tips about their favorite locations around the world ",
    link: "https://github.com/wilkdasilk/vagabond",
    live: "#",
    name: "vagabond",
    picture: "https://raw.githubusercontent.com/wilkdasilk/vagabond/master/app/assets/images/preview/levagabond-preview.png",
    tools: "Ruby on Rails, PostgreSQL, Bootstrap, Bcrypt, Paperclip",
    contributions: "<li>Implemented user authorization for CRUD actions using before hooks and SQL queries via ActiveRecord</li><li>Coordinating with UX advisors to ensure optimal user experience across range of devices</li>"
  },
  {
    description: "An attempt to make the world a better place by providing people with cool activities to do",
    link: "https://github.com/wilkdasilk/actividay",
    live: "#",
    name: "actividay",
    picture: "https://raw.githubusercontent.com/wilkdasilk/actividay/master/app/assets/images/preview/actividay-preview.png",
    tools: "Ruby on Rails, PostgreSQL, Foundation, SASS, Devise, FriendlyID, CarrierWave",
    contributions: "<li>Implemented responsive & mobile-first design via Bootstrap</li><li>Refactored for DRY, maintainable code using shared partials with conditional views</li>"
  },
  {
    description: "Curate crowdsourced playlists around a geolocation",
    link: "https://github.com/wilkdasilk/NoiseFlag",
    live: "#",
    name: "NoiseFlag",
    picture: "https://raw.githubusercontent.com/wilkdasilk/NoiseFlag/master/app/assets/images/preview/Noiseflag_preview.png",
    tools: "Ruby on Rails, PostgreSQL, Geocoder, Google Static Maps, Spotify API, Searchkick, Bootstrap, SASS, HTTParty, CarrierWave",
    contributions:"<li>Implemented track search feature, including JSON endpoint returning Searchkick results, or if none, proxy to Spotify API using HTTParty</li><li>Implemented check-in feature, requesting user’s location via HTML5 Geolocation, or if unavailable, via IP address, and confirming proximity to flag location via Geocoder gem</li>"
  },
  {
    description: "Chat and streaming app for podcasters, enabling early feedback from subscribers via live listening",
    link: "https://github.com/wilkdasilk/PodBooth",
    live: "#",
    name: "PodBooth",
    picture: "https://raw.githubusercontent.com/wilkdasilk/PodBooth/master/app/assets/images/preview/podbooth_preview.png",
    tools: "Angular, MongoDB, Express, Node, Mongoose, Socket.io, Web Audio API, Materialize, Passport, Express-JWT, Ng-File-Upload",
    contributions: "<li>Implemented audio streaming feature, requesting access to user’s microphone, transmitting recorded chunks, and syncing playback via audio buffer</li><li>Implemented chat feature, including live-updated commenting and upvoting via Socket.io</li>"
  }
];

//body hides
$('body').hide();
appendLinks();
appendProject(data[4]);
appendProject(data[3]);
appendProject(data[2]);
appendProject(data[1]);
appendProject(data[0]);


function appendLinks() {
  console.log("appending links");
  //append project data
  for (var i=data.length-1;i>=0;i--) {
    currentProject=data[i];
    appendLink(currentProject);
  };
}


function appendProject(project) {
  $('.projects').append(`
    <div id="${project.name}" class="faded-out">
      <div class="project-details">
        <h4>
          <a href='${project.live}' target='_blank'>
            ${project.name.titleize()}
          </a>
        </h4>
        <div class="project-description">
          <p>${project.description}</p>
        </div>
        <div class="container">
          <div class='col-lg-6 col-md-6 col-sm-12 col-md-xs-12'>
            <a href='${project.live}' target='_blank'>
              <img src='${project.picture}' class='preview'>
            </a>
          </div>
          <div class='col-lg-6 col-md-6 col-sm-12 col-md-xs-12'>
            <section>
              <div class='project'>
                <h5>Built with</h5>
                <p>${project.tools}</p>
              </div>
            </section>
          </div>
        </div>
        <div class="project-contributions">
          <h5>Key Contributions</h5>
          <ul>
            ${project.contributions}
          </ul>
        </div>
        <div class="project-links">
          <a href='${project.link}' target='_blank'>Repo</a>
          <a href='${project.live}' target='_blank'>Live</a>
        </div>
        </div>
      <div class="parallax-container">
        <div class="parallax"><img src="${imageLinks[projectCount]}"></div>
      </div>
    </div>`
  );
  projectCount++;
}

function appendLink(currentProject) {
  $('#myprojectsdropdown').append(`
    <li>
      <a href='#${currentProject.name}'>${currentProject.name.titleize()}</a>
    </li>
    `);
}

// function getProjects(res) {
//   res.items.forEach(function(item){
//     console.log(item.name);
//     tempProject = {
//       name: item.name,
//       description: item.description,
//       link: item.html_url,
//       live: item.homepage
//     };
//     $.ajax({
//       url: `https://api.github.com/repos/${item.full_name}/contents/app/assets/images/preview`,
//       method: "GET",
//       async: false,
//       success: addPhoto,
//       error:onError
//     });
//   });
// }

// function addPhoto(res) {
//   tempProject.picture = res[0].download_url;
//   data.push(tempProject);
//   currentProject = data.slice(-1)[0];
//   appendLink(currentProject, data.length-1);
//   appendProject(data[data.length - 1]);
//   tempProject = {};
// }

// function onError(res) {
//   console.log(res);
// }

//content fades in on page ready
$(document).ready(function(){
  $('body').fadeIn(800)
  $('.parallax').parallax();
  var $window = $(window);
  $('.projects-nav .dropdown').hover(function() {
        if ($window.innerWidth() > 768) {
          $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();
        }
      }, function() {
        if ($window.innerWidth() >768) {
          $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
        }
  });
  var $solid = $('.solidback');
  var $header = $('header');
  var $profileWrapper = $('.profile-wrapper');
  var $headerRight = $('.header-right');
  var $textRight = $('.text-right');
  var $navContainer = $('.nav-container');
  var $main = $('main');
  var $headingWrapper = $('.heading-wrapper');
  var $fadedOut = $('.faded-out');
  var $cloudContainer = $('.cloud-container, .cloud-mirror');
  var $cloud = $('.cloud');
  var dismissed = false;
  var offscreen = false;
  $('.cloud-mirror').on('mouseenter click', function(e){
    $cloud.addClass('hiding');
    setTimeout(function(){
      dismissed = true;
    },500);
  });

  function floatUp(){
    //function works great
    if ($(this).position().left >= $window.innerWidth() ){
      offscreen = true;
    }
    if (offscreen|| dismissed) {
      $(this).css({
        "left": -150,
        "paddingTop": 0,
        "paddingBottom": 15,
        "top": 0
      });
      offscreen = false;
    } else {
      $(this).stop( true, true ).animate({paddingTop: "0", paddingBottom: "15", left:"+=20"},
      {
        duration: 2000,
        easing: "linear",
        queue: false
      }
    );
    }

  }

  function floatDown(){
    if ($cloudContainer.first().offset().left >= $window.innerWidth()) {
      offscreen = true
    }
    if (dismissed || offscreen){
      $cloudContainer.css({
        "left": -150,
        "paddingTop": 0,
        "paddingBottom": 15,
        "top": 0
      });
    }
    if (!(offscreen || dismissed)) {
      $cloudContainer.stop( true, true ).animate({paddingTop: "15", paddingBottom: "0", left:"+=20"},
        {
          duration: 2000,
          complete: floatUp,
          easing: "linear",
          queue: false
        }
      );
    } else {
      offscreen = false;
      if (dismissed){
        //for some reason doesn't always reset left value, so this won't reveal it until its correct (unless it does...)
        if($cloudContainer.first().offset().left == -150){
          $cloud.removeClass('hiding');
          dismissed = !dismissed;
        } else {
          $cloudContainer.offset({top:0,left:-150});
        }
      }
    }
  }
//cloud action begins after 10 seconds on page
setTimeout(function(){
  setInterval(function(){
    floatDown()
  }, 4000);
}, 10000)


  function handleAnchorScroll(scope) {
    var offset;
    var headerHeight = $headerRight.height();
    //scroll offset based on screen size/header height requirements
    if ($window.innerWidth() < 768) {
      //fix for if header isn't scrolled completely
      if (headerHeight > 56) {
        offset = headerHeight - 56 + 47 + 24;
      } else {
        offset = 56 + 47;
      }
    } else {
      if (headerHeight > 56) {
        offset = headerHeight - 56 + 43 + 24;
      } else {
        offset = 56 + 43 + 47;
      }
    }
    var anchor = $(scope).attr('href');
    var scrollAmount = $(anchor).offset().top - offset;
    if (scrollAmount <= 90){
      scrollAmount = 90;
    }
    $('html,body').animate({scrollTop: scrollAmount}, 'slow');
  }

  function handleUserScroll() {
    if ($window.scrollTop() <90) {
      $solid.css("height", function(){
        return 225 - $window.scrollTop();
      });
      $header.css("height", function(){
        return 225 - $window.scrollTop();
      });
      $headerRight.css("height", function(){
        return 225 - 56 - $window.scrollTop();
      });
    }
    $fadedOut.each(function(i, project){
      var $project = $(project);
      if ($window.scrollTop() + $window.innerHeight() > $project.position().top) {
        $project.removeClass("faded-out");
        $project.addClass("faded-in");
      }
    });
    if ($window.scrollTop() >= 90) {
      $headerRight.addClass("scrolled");
      $textRight.addClass("scrolled");
      $navContainer.addClass("scrolled");
      $solid.css("height", 56);
      $header.css("height", 56);
      $profileWrapper.css("visibility", "visible");
      $headerRight.css("height", 56);
      $main.addClass("scrolled");
      if ($window.innerWidth() < 768) {
        $headingWrapper.each(function(i, heading) {
          if (i == 0) {
            $(heading).addClass("fixed-pin");
          } else if ($window.scrollTop() + 56 >= $(heading).position().top) {
            $(heading).addClass("fixed-pin");
          } else {
            $(heading).removeClass("fixed-pin");
          }
        });
      } else {
        if ($window.scrollTop() >= 90){
          $headingWrapper.each(function(i, heading) {
            if (i == 0) {
              $(heading).addClass("fixed-pin");
            } else if ($window.scrollTop() + 56 + 43>= $(heading).position().top) {
              $(heading).addClass("fixed-pin");
            } else {
              $(heading).removeClass("fixed-pin");
            }
          });
        }
      }

      if ($window.scrollTop() >= 225 + 90 + 20) {
        $profileWrapper.css("top", 0);
      } else {
        $profileWrapper.css("top", function(){
          return 50 - ($window.scrollTop()-90 - 20)/4.5;
        });
      }
    } else {
      $headerRight.removeClass("scrolled");
      $textRight.removeClass("scrolled");
      $navContainer.removeClass("scrolled");
      $main.removeClass("scrolled");
      $headingWrapper.removeClass("fixed-pin");
      $profileWrapper.css("visibility", "hidden");
    }
  }
  //onload initialize style for page position
  handleUserScroll();

  //do the same on scroll
  $window.on('scroll', function(){
    handleUserScroll();
  });

  $('.projects-nav').on('click', 'a', function(e){
    e.preventDefault();
    handleAnchorScroll(this);
    $('.navbar-collapse').collapse('hide');
  });

  $('.projects-nav .dropdown > a').click(function(e){
    e.preventDefault();
    handleAnchorScroll(this);
    $('.navbar-collapse').collapse('hide');
  });

  $(window).resize(function(){
   if ($(window).width()>767) {
    $('.navbar-collapse').removeClass('in');
   }
  });


});
