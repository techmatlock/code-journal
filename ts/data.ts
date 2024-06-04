/* exported data */
interface Journal {
  title: string;
  photoUrl: string;
  note: string;
}

interface Data {
  view: string;
  entries: Journal[];
  editing: null;
  nextEntryId: number;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', (): void => {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', jsonData);
});
