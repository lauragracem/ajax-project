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
  getGraphs();
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
  createGraph();
}

var username = 'ajax-project';
var secret = 'thisissecret';
var id = '0';

// get all user's graphs
// have id start at graphs.length

// on login hit graphs API & get total number of graphs.
//

function createGraph() {
  var json = {
    id: 'graph-' + id,
    name: $enterHabit.value,
    unit: 'commit',
    type: 'int',
    color: 'ichou'
  };
  id++;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://pixe.la/v1/users/' + username + '/graphs');
  xhr.setRequestHeader('X-USER-TOKEN', secret);

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  });
  xhr.send(JSON.stringify(json));
}

function getGraphs() {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pixe.la/v1/users/' + username + '/graphs');
  xhr.setRequestHeader('X-USER-TOKEN', secret);

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log({ xhr });
    var graphs = xhr.response.graphs;
    // get graphs from respnose
    id = graphs.length;
    // set id to graphs.length
    // console.log(graphs);
    // console.log(id);
  });
  xhr.send();
}

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
