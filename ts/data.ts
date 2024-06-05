/* exported data */
interface Journal {
  title: string;
  photoUrl: string;
  note: string;
  entryId: number;
}

interface Data {
  view: string;
  entries: Journal[];
  editing: null;
  nextEntryId: number;
}

let data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

// const previousDataJson = localStorage.getItem('javascript-local-storage');

if (previousDataJson !== null) {
  data = JSON.parse(previousDataJson);
}

window.addEventListener('beforeunload', (): void => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', jsonData);
});
