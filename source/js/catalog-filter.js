'use strict';

var catalogFilter = document.querySelector('.catalog-filter');

if (catalogFilter) {
  var toggleFieldset = function (fieldsetItem) {
    fieldsetItem.classList.toggle('catalog-filter__fieldset-wrapper--opened');
  };

  var onLegendClick = function (evt) {
    var fieldsetItem = evt.target.closest('.catalog-filter__fieldset-wrapper');
    toggleFieldset(fieldsetItem);
  };

  catalogFilter.addEventListener('click', onLegendClick);

  window.filter = {
    elem: catalogFilter
  };
}
