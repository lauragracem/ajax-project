var data = {
  view: 'habit-form',
  graphs: [],
  editing: null,
  nextId: '0'
};

var $loginForm = document.querySelector('#login-form');
var $userLogin = document.querySelector('.user-login');
var $habitForm = document.querySelector('.habit-form');
var $editForm = document.querySelector('.edit-form');
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

  if (view === 'edit-form') {
    $habitForm.classList.add('hidden');
    $editForm.classList.remove('hidden');
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
    $edit.setAttribute('class', 'fa-solid fa-eraser');
    $edit.addEventListener('click', function () {
    });
    var $delete = document.createElement('i');
    $delete.setAttribute('class', 'fa-solid fa-trash-can');
    $delete.setAttribute('data-habit-id', graphs[i].id);
    $delete.addEventListener('click', function (e) {
      deleteGraph(e.target.getAttribute('data-habit-id'));
    });
    var $span = document.createElement('span');
    var $habitHeader = document.createElement('div');
    $habitHeader.setAttribute('class', 'habit-header');
    var $div = document.createElement('div');
    $div.setAttribute('id', graphs[i].id);
    $div.setAttribute('class', 'graph-container');
    $habitHeader.appendChild($p);
    $habitHeader.appendChild($span);
    $li.appendChild($habitHeader);
    $span.appendChild($edit);
    $span.appendChild($delete);
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

function deleteGraph(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', 'https://pixe.la/v1/users/' + username + '/graphs/' + id);
  xhr.setRequestHeader('X-USER-TOKEN', secret);

  xhr.addEventListener('load', function () {
    data.graphs = data.graphs.filter(function (graph) {
      return graph.id !== id;
    });
    renderGraphs(data.graphs);
  });
  xhr.send();
}

// 0-9 commits has to quantify minutes.
// how will user record habit in minutes? Can they just push square on graph? Do I need another button?
// function for inputting date automatically.

// date: daily
// quantity(time in minutes): 1 = 10, 2 = 15, 3 = 20, 4 = 25, 5 = 30, 6 = 40, 7 = 45, 8 = 50, 9 = 60

// FOCUS:
// PUll individual graphs onto edit form page.
