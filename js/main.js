var data = {
  view: 'habit-form',
  graphs: [],
  editing: null,
  nextId: '0'
};

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
  getGraphs();
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
  renderGraphs(data.graphs);
}

var username = 'ajax-project';
var secret = 'thisissecret';

function createGraph() {
  var json = {
    id: $enterHabit.value.replace(' ', '-').toLowerCase(),
    name: $enterHabit.value,
    unit: 'commit',
    type: 'int',
    color: 'ichou'
  };

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://pixe.la/v1/users/' + username + '/graphs');
  xhr.setRequestHeader('X-USER-TOKEN', secret);

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.nextId++;
    data.graphs.push(json);
    renderGraphs(data.graphs);
    $enterHabit.value = '';
  });
  xhr.send(JSON.stringify(json));
}

function getGraphs() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pixe.la/v1/users/' + username + '/graphs');
  xhr.setRequestHeader('X-USER-TOKEN', secret);

  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.graphs = xhr.response.graphs;
    data.nextId = xhr.response.graphs.length;
    renderGraphs(data.graphs);
  });
  xhr.send();
}

function renderGraphs(graphs) {
  $ul.innerHTML = '';
  for (var i = 0; i < graphs.length; i++) {
    var name = graphs[i].name;
    var $li = document.createElement('li');
    var $p = document.createElement('p');
    $p.textContent = name;
    var $edit = document.createElement('i');
    $edit.setAttribute('class', 'fas fa-edit');
    var $column2 = document.createElement('div');
    $column2.setAttribute('class', 'column2');
    var $div = document.createElement('div');
    $div.setAttribute('id', graphs[i].id);
    $div.setAttribute('class', 'graph-container');
    $column2.appendChild($p);
    $li.appendChild($column2);
    $column2.appendChild($edit);
    $li.appendChild($div);
    $ul.appendChild($li);
    getGraphSVG(graphs[i].id);
  }
}

function getGraphSVG(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pixe.la/v1/users/' + username + '/graphs/' + id);
  xhr.setRequestHeader('X-USER-TOKEN', secret);

  xhr.addEventListener('load', function () {
    var $id = document.querySelector('#' + id);
    $id.innerHTML = '';
    $id.innerHTML = xhr.responseText;
  });
  xhr.send();
}
