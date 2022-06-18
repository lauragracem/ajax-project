var $loginForm = document.querySelector('#login-form');
var $userLogin = document.querySelector('.user-login');
var $habitForm = document.querySelector('.habit-form');
var $loginButton = document.querySelector('.login');

var $guestLogin = document.querySelector('a');
var $ul = document.querySelector('ul');
var $enterHabit = document.querySelector('#enter-habit');
var $addHabit = document.querySelector('#add-habit');

$loginForm.addEventListener('submit', login);

function login(event) {
  event.preventDefault();
}

$loginButton.addEventListener('click', nextPage);
$guestLogin.addEventListener('click', nextPage);
function nextPage(event) {
  switchView('habit-form');
}

function switchView(view) {
  if (view === 'habit-form') {
    $userLogin.classList.add('hidden');
    $habitForm.classList.remove('hidden');
  }
}

$addHabit.addEventListener('submit', createHabit);

$enterHabit.addEventListener('input', e => {
});

function createHabit(event) {
  event.preventDefault();

  var $habit = document.createElement('li');
  $habit.textContent = $enterHabit.value;
  $ul.appendChild($habit);
}

// function enterHabit() {

// }

// enterHabit();

// function renderHabit(habitList) {
//   event.preventDefault();

//   $addHabit.innerHTML = '';
//   for (var i = 0; i < habitList.length; i++) {
//     var habits = habitList[i];
//     var habitEntry = createHabit(habits);
//     $addHabit.appendChild(habitEntry);
//   }
// }

// renderHabit();

// add habit to page -- render the habit listed
// the habit names the graph
// get graph svg

// var username = 'ajax-project';
// var secret = 'thisissecret';

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
// var $tempEl = document.querySelector('.temp');
// function getGraphSVG(id = 'color-graph') {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://pixe.la/v1/users/' + username + '/graphs/' + id);
//   xhr.setRequestHeader('X-USER-TOKEN', secret);

//   xhr.addEventListener('load', function () {
//     console.log({ xhr });
//     $tempEl.innerHTML = xhr.responseText;
//   });
//   xhr.send();
// }

// getGraphSVG();
