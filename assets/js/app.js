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
var showProjectIndex = 0;
var currentProject;

$.ajax({
  url: "https://api.github.com/search/repositories?q=user:wilkdasilk+topic:featured+fork:true&sort=updated",
  method: "GET",
  success: getProjects,
  error: onError
});

//json for projects
var data = [
  // {
  //   description: "What kind of creature are you? Idk, better take a quiz. Single-page app, no framework.",
  //   link: "https://github.com/wilkdasilk/MiddleEarthCreatureQuiz",
  //   live: "https://desolate-wave-59412.herokuapp.com/",
  //   name: "MiddleEarthCreatureQuiz",
  //   picture: "https://raw.githubusercontent.com/wilkdasilk/MiddleEarthCreatureQuiz/master/app/assets/images/preview/creaturequiz-preview.png"
  // },
  // {
  //   description: "A travel community for users to share city specific tips about their favorite locations around the world ",
  //   link: "https://github.com/wilkdasilk/vagabond",
  //   live: "http://levagabond.herokuapp.com/",
  //   name: "vagabond",
  //   picture: "https://raw.githubusercontent.com/wilkdasilk/vagabond/master/app/assets/images/preview/levagabond-preview.png"
  // },
  // {
  //   description: "An attempt to make the world a better place by providing people with cool activities to do",
  //   link: "https://github.com/wilkdasilk/actividay",
  //   live: "http://actividay.herokuapp.com/",
  //   name: "actividay",
  //   picture: "https://raw.githubusercontent.com/wilkdasilk/actividay/master/app/assets/images/preview/actividay-preview.png"
  // },
  // {
  //   description: "Curate crowdsourced playlists around a geolocation",
  //   link: "https://github.com/wilkdasilk/NoiseFlag",
  //   live: "http://noiseflag.herokuapp.com/",
  //   name: "NoiseFlag",
  //   picture: "https://raw.githubusercontent.com/wilkdasilk/NoiseFlag/master/app/assets/images/preview/Noiseflag_preview.png"
  // }
];

//body hides
$('body').hide();
appendLinks();
//showProject(data[0]);

function appendLinks() {
  console.log("appending links");
  //append project data
  for (var i=0;i<data.length;i++) {
    currentProject=data[i];
    appendLink(currentProject, i);
  };
}

function showProject(project) {
  $('.projects').html(`
    <div class='col-lg-6 col-md-6 col-sm-12 col-md-xs-12'>
      <img src='${project.picture}' class='preview'>
    </div>
    <div class='col-lg-6 col-md-6 col-sm-12 col-md-xs-12'>
      <section>
        <div class='project'>
          <h4>${project.name.titleize()}</h3>
          <p>${project.description}</p>
          <div class="project-links">
            <a href='${project.link}' target='_blank'>Repo</a>
            <a href='${project.live}' target='_blank'>Live</a>
          </div>
        </div>
      </section>
    </div>`
  );
}

function appendLink(currentProject, index) {
  $('.projects-nav').append(`
    <li role='presentation'>
      <a href='#' data-index='${index}'>${currentProject.name.titleize()}</a>
    </li>
    `);
}

function getProjects(res) {
  res.items.forEach(function(item){
    console.log(item.name);
    tempProject = {
      name: item.name,
      description: item.description,
      link: item.html_url,
      live: item.homepage
    };
    $.ajax({
      url: `https://api.github.com/repos/${item.full_name}/contents/app/assets/images/preview`,
      method: "GET",
      async: false,
      success: addPhoto,
      error:onError
    });
  });
}

function addPhoto(res) {
  tempProject.picture = res[0].download_url;
  data.push(tempProject);
  currentProject = data.slice(-1)[0];
  appendLink(currentProject, data.length-1);
  showProject(data[showProjectIndex]);
  tempProject = {};
}

function onError(res) {
  console.log(res);
}

//content fades in on page ready
$(document).ready(function(){
  $('body').fadeIn(800)
});

$('.projects-nav').on('click', 'a', function(event){
  if (  showProjectIndex != $(this).attr('data-index') ) {
    showProjectIndex = $(this).attr('data-index');
    $('.projects-wrapper').children().fadeOut(100, function (){
      $('.projects-wrapper').children().fadeIn(800);
    showProject(data[showProjectIndex]);
    });
  }
});

$(window).resize(function(){
 if ($(window).width()>767) {
  $('.navbar-collapse').removeClass('in');
 }
});
