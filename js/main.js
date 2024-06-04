'use strict';
const $form = document.querySelector('.journal-form');
const $photoInput = document.querySelector('.photo-input');
const $photoPreview = document.querySelector('.form-img');
if (!$photoInput) throw new Error('$photoInput does not exist.');
if (!$photoPreview) throw new Error('$photoPreview does not exist.');
$photoInput?.addEventListener('input', (event) => {
  const eventTarget = event.target;
  const photoUrl = eventTarget.value;
  $photoPreview.setAttribute('src', photoUrl);
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  console.log('$formElements:', $formElements);
  const title = $formElements.title.value;
  const photoUrl = $formElements.photo.value;
  const note = $formElements.notes.value;
  const result = {
    title,
    photoUrl,
    note,
  };
  data.entries.unshift(result);
  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
