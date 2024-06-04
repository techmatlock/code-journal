/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  photo: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $form = document.querySelector('.journal-form') as HTMLFormElement;
const $photoInput = document.querySelector('.photo-input') as HTMLInputElement;
const $photoPreview = document.querySelector('.form-img');

if (!$photoInput) throw new Error('$photoInput does not exist.');
if (!$photoPreview) throw new Error('$photoPreview does not exist.');

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

  data.entries.unshift(result);

  data.nextEntryId++;

  $photoPreview.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
});
