"use strict";
let data = {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
};
const previousDataJson = localStorage.getItem('javascript-local-storage');
if (previousDataJson !== null) {
    data = JSON.parse(previousDataJson);
}
window.addEventListener('beforeunload', () => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem('javascript-local-storage', jsonData);
});
