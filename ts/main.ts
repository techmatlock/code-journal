/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $form = document.querySelector('.journal-form') as HTMLFormElement;
const $photoInput = document.querySelector('.photo-input') as HTMLInputElement;
const $photoPreview = document.querySelector('.form-img');
const $ulElement = document.querySelector('.entries-list');
const $noEntries = document.querySelector('.no-entries');
const $formDiv = document.querySelector('div[data-view="entry-form"]');
const $entriesDiv = document.querySelector('div[data-view="entries"]');
const $entriesLink = document.querySelector('.entries-link');
const $newBtn = document.querySelector('.new-btn');
const $deleteBtn = document.querySelector('.delete-btn');
const $entryTitle = document.querySelector('.entry-title');
const $dialog = document.querySelector('dialog');
const $modalActions = document.querySelector('.modal-actions');

if (!$photoInput) throw new Error('$photoInput does not exist.');
if (!$photoPreview) throw new Error('$photoPreview does not exist.');
if (!$ulElement) throw new Error('$ulElement does not exist.');
if (!$noEntries) throw new Error('$liElement does not exist.');
if (!$formDiv) throw new Error('$formDiv does not exist.');
if (!$entriesDiv) throw new Error('$entriesDiv does not exist.');
if (!$entriesLink) throw new Error('$entriesLink does not exist.');
if (!$newBtn) throw new Error('$newBtn does not exist.');
if (!$deleteBtn) throw new Error('$deleteBtn does not exist.');
if (!$entryTitle) throw new Error('$entryTitle does not exist.');
if (!$dialog) throw new Error('$dialog does not exist.');
if (!$modalActions) throw new Error('$modalActions does not exist.');

const renderEntry = (entry: Journal): HTMLLIElement => {
  const $outerLiElement = document.createElement('li');
  $outerLiElement.setAttribute('class', 'row');
  $outerLiElement.setAttribute('data-entry-id', entry.entryId.toString());

  const $div1 = document.createElement('div');
  $div1.setAttribute('class', 'column-half padding-lr');

  $outerLiElement.appendChild($div1);

  const $img = document.createElement('img');
  $img.setAttribute('class', 'entry-img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', 'a placeholder image');

  $outerLiElement.appendChild($div1);
  $div1.appendChild($img);

  const $div2 = document.createElement('div');
  $div2.setAttribute('class', 'column-half padding-lr');

  const $p = document.createElement('p');
  $p.setAttribute('class', 'bold row space-between');
  $p.textContent = entry.title;

  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fa-solid fa-pencil');

  const $p2 = document.createElement('p');
  $p2.textContent = entry.note;

  $div2.appendChild($p);
  $p.appendChild($pencil);
  $div2.appendChild($p2);

  $outerLiElement.appendChild($div2);

  return $outerLiElement;
};

const toggleNoEntries = (): void => {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
};

const viewSwap = (view: string): void => {
  data.view = view;

  if (view === 'entries') {
    $formDiv.className = 'hidden';
    $entriesDiv.className = '';
  }

  if (view === 'entry-form') {
    $entriesDiv.className = 'hidden';
    $formDiv.className = '';
  }
};

toggleNoEntries();

$photoInput?.addEventListener('input', (event: Event): void => {
  const eventTarget = event.target as HTMLInputElement;
  const photoUrl = eventTarget.value;
  $photoPreview.setAttribute('src', photoUrl);
});

$form.addEventListener('submit', (event: Event): void => {
  event.preventDefault();

  const $formElements = $form.elements as FormElements;

  const title = $formElements.title.value;
  const photoUrl = $formElements.photo.value;
  const note = $formElements.notes.value;
  const entryId = data.nextEntryId;

  const result = {
    title,
    photoUrl,
    note,
    entryId,
  };

  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');

  if (data.editing === null) {
    const newEntry = renderEntry(result);
    $ulElement.prepend(newEntry);

    data.entries.unshift(result);
    data.nextEntryId++;
  } else {
    const $allLiElements = document.querySelectorAll('li');
    if (!$allLiElements) throw new Error('$allLiElements does not exist.');

    result.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === result.entryId) {
        data.entries[i] = result;
      }
    }

    const replacingEntry = renderEntry(result);

    $allLiElements.forEach((li) => {
      if (Number(li.getAttribute('data-entry-id')) === result.entryId) {
        li.replaceWith(replacingEntry);
      }
    });
    $entryTitle.textContent = 'New Entry';
    data.editing = null;
  }
  viewSwap('entries');
  toggleNoEntries();
  $form.reset();
});

document.addEventListener('DOMContentLoaded', (): void => {
  for (let i = 0; i < data.entries.length; i++) {
    const newData = renderEntry(data.entries[i]);
    $ulElement.prepend(newData);
  }

  viewSwap(data.view);
  toggleNoEntries();
});

$entriesLink.addEventListener('click', (): void => {
  viewSwap('entries');
});

$newBtn.addEventListener('click', (): void => {
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryTitle.textContent = 'New Entry';
  $form.reset();
  $deleteBtn.classList.add('hidden');
  viewSwap('entry-form');
});

$ulElement.addEventListener('click', (event: Event): void => {
  const $eventTarget = event.target as HTMLElement;

  $entryTitle.textContent = 'Edit Entry';

  if ($eventTarget.matches('i[class="fa-solid fa-pencil"]')) {
    $deleteBtn.classList.remove('hidden');
    viewSwap('entry-form');

    const dataEntryId = Number(
      $eventTarget.closest('li')?.getAttribute('data-entry-id'),
    );

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === dataEntryId) {
        data.editing = data.entries[i];

        const $formElements = $form.elements as FormElements;

        $formElements.title.value = data.editing.title;

        $formElements.photo.value = data.editing.photoUrl;
        $formElements.notes.value = data.editing.note;
        $photoPreview.setAttribute('src', data.editing.photoUrl);
      }
    }
  }
});

$deleteBtn.addEventListener('click', (event: Event): void => {
  event.preventDefault();

  $dialog.showModal();
});

$modalActions.addEventListener('click', (event: Event): void {
  const $eventTarget = event.target as HTMLButtonElement;

  console.log('$eventTarget:', $eventTarget);

  if ($eventTarget.className === 'cancel-btn') {
    $dialog.close();
  }
})
