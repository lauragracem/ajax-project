var $loginForm = document.querySelector('#login-form');
var $userLogin = document.querySelector('.user-login');
var $habitForm = document.querySelector('.habit-form');
var $loginButton = document.querySelector('.login');

$loginForm.addEventListener('submit', login);

function login(event) {
  event.preventDefault();
}

$loginButton.addEventListener('click', nextPage);

function nextPage(event) {
  switchView('habit-form');
}

function switchView(view) {
  if (view === 'habit-form') {
    $userLogin.classList.add('hidden');
    $habitForm.classList.remove('hidden');
  }
}

var $submit = document.querySelector('.submit');

$submit.addEventListener('submit', listHabit);

function listHabit(event) {
  event.preventDefault();
}

// var username = 'ajax-project';
// var secret = 'thisissecret';

// var $tempE1 = document.querySelector('.temp');

// getGraphSVG();

// function getGraphs() {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://pixe.la/v1/users/' + username + '/graphs');
//   xhr.setRequestHeader('X-USER-TOKEN', secret);

//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     console.log({ xhr });
//   });
//   xhr.send();
// }
