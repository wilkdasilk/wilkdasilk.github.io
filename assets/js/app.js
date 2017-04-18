// sanity check
console.log("app.js linked.");

var tempProject = {};

$.ajax({
  url: "https://api.github.com/search/repositories?q=user:wilkdasilk+topic:featured+fork:true&sort=updated",
  method: "GET",
  success: getProjects,
  error: onError
});

//json for projects
var data = [
  {
    name:"Portfolio site",
    description:"This personal portfolio site",
    picture:"assets/imgs/portfolio.png",
    link:"https://github.com/wilkdasilk/wilkdasilk.github.io"
  },
  {
    name:"Good San Juan",
    description:"Web design for my band, Good San Juan",
    picture:"http://goodsanjuan.com/images/IMG_5938%20-%20Version%203.jpg",
    link:"http://goodsanjuan.com/"
  },
  {
    name:"QuakeMap",
    description:"Track recent earthquakes",
    picture:"assets/imgs/QuakeMap.png",
    link:"https://github.com/wilkdasilk/QuakeMap"
  },
  {
    name:"Red Racer",
    description:"Play a retro-style racing game",
    picture:"assets/imgs/Red_Racer.png",
    link:"https://github.com/wilkdasilk/RedRacer"
  }
];

//body hides
$('body').hide();
appendProjects();

function appendProjects() {
  console.log("appending projects");
  //append project data
  for (var i=0;i<data.length;i++) {
    var currentProject=data[i];
    appendProject(currentProject);
  };
}

function appendProject(project) {
  $('.projects').append(`
    <div class='col-lg-6 col-md-6 col-sm-12 col-md-xs-12 '>
      <a href='${project.link}' target='_blank'>
        <div class="project">
          <img src='${project.picture}' class='preview' title='${project.description}'>
          <p class='caption'>${project.name}</p>
        </div>
        </a>
    </div>`
  );
}

function getProjects(res) {
  res.items.forEach(function(item){
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
  console.log('got image, what next?');
  tempProject.photo = res[0].download_url;
  data.push(tempProject);
  console.log(tempProject);
  tempProject = {};
  appendProject(data.slice(-1)[0]);
}

function onError(res) {
  console.log(res);
}

//scrolling anchors from https://startbootstrap.com/template-overviews/scrolling-nav/
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

//content fades in on page ready
$(document).ready(function(){
  $('body').fadeIn(800)
});
