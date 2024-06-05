'use strict';
const $form = document.querySelector('.journal-form');
const $photoInput = document.querySelector('.photo-input');
const $photoPreview = document.querySelector('.form-img');
const $ulElement = document.querySelector('.entries-list');
const $liElement = document.querySelector('.no-entries');
const $formDiv = document.querySelector('div[data-view="entry-form"]');
const $entriesDiv = document.querySelector('div[data-view="entries"]');
const $anchorLink = document.querySelector('.entries-link');
const $newBtn = document.querySelector('.new-btn');
if (!$photoInput) throw new Error('$photoInput does not exist.');
if (!$photoPreview) throw new Error('$photoPreview does not exist.');
if (!$ulElement) throw new Error('$ulElement does not exist.');
if (!$liElement) throw new Error('$liElement does not exist.');
if (!$formDiv) throw new Error('$formDiv does not exist.');
if (!$entriesDiv) throw new Error('$entriesDiv does not exist.');
if (!$anchorLink) throw new Error('$anchorLink does not exist.');
if (!$newBtn) throw new Error('$newBtn does not exist.');
$photoInput?.addEventListener('input', (event) => {
  const eventTarget = event.target;
  const photoUrl = eventTarget.value;
  $photoPreview.setAttribute('src', photoUrl);
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
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
  data.entries.unshift(result);
  data.nextEntryId++;
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    const newData = renderEntry(data.entries[i]);
    $ulElement.append(newData);
  }
});
const renderEntry = (entry) => {
  const $outerLiElement = document.createElement('li');
  $outerLiElement.setAttribute('class', 'row');
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
  $p.setAttribute('class', 'bold');
  $p.textContent = entry.title;
  const $p2 = document.createElement('p');
  $p2.textContent = entry.note;
  $div2.appendChild($p);
  $div2.appendChild($p2);
  $div1.appendChild($div2);
  return $outerLiElement;
};
const toggleNoEntries = () => {
  if (data.entries !== null) {
    $liElement.classList.add('hidden');
  }
};
const viewSwap = (view) => {
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
$anchorLink.addEventListener('click', () => {
  viewSwap('entries');
});
$newBtn.addEventListener('click', () => {
  viewSwap('entry-form');
});
