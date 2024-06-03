"use strict";
/* global data */
const $photoInput = document.querySelector('.photo-input');
const $photoPreview = document.querySelector('.form-img');
if (!$photoInput)
    throw new Error('$photoInput does not exist.');
if (!$photoPreview)
    throw new Error('$photoPreview does not exist.');
console.log($photoPreview);
$photoInput?.addEventListener('input', (event) => {
    event.preventDefault();
    const eventTarget = event.target;
    const photoUrl = eventTarget.value;
    $photoPreview.setAttribute('src', photoUrl);
    console.log('$photoPreview:', $photoPreview);
});
