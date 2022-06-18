/* exported data */
var data = {
  view: 'habit-form',
  habits: [],
  editing: null,
  nextEntryId: 1
};

var entryJSON = localStorage.getItem('enter-habit');
if (entryJSON !== null) {
  data = JSON.parse(entryJSON);
}

window.addEventListener('beforeunload', entryBase);

function entryBase(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('add-habit', dataJSON);
}
