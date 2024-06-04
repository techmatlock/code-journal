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

console.log(data);
