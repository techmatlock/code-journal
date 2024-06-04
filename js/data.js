'use strict';
const data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
window.addEventListener('beforeunload', () => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', jsonData);
});
