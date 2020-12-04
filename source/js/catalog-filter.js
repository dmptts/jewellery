'use strict';

(function () {
  var catalogFilter = document.querySelector('.catalog-filter');
  var filterForm = document.querySelector('.catalog-filter__form');
  var formToggleBtn = document.querySelector('.catalog-filter__toggle');
  var formCloseBtn = document.querySelector('.catalog-filter__close-btn');

  var toggleForm = function () {
    filterForm.classList.toggle('catalog-filter__form--opened');
    if (filterForm.classList.contains('catalog-filter__form--opened')) {
      filterForm.addEventListener('click', onLegendClick);
      formCloseBtn.addEventListener('click', onCloseBtnClick);
      formToggleBtn.removeEventListener('click', onToggleClick);
    } else {
      filterForm.removeEventListener('click', onLegendClick);
      formCloseBtn.removeEventListener('click', onCloseBtnClick);
      formToggleBtn.addEventListener('click', onToggleClick);
    }
  };

  var toggleFieldset = function (fieldsetItem) {
    fieldsetItem.classList.toggle('catalog-filter__fieldset-wrapper--opened');
  };

  var onLegendClick = function (evt) {
    if (evt.target.tagName === 'legend') {
      var fieldsetItem = evt.target.closest('.catalog-filter__fieldset-wrapper');
      toggleFieldset(fieldsetItem);
    }
  };

  var onCloseBtnClick = function () {
    toggleForm();
  };

  var onToggleClick = function () {
    toggleForm();
  };

  var initFilter = function (currentVersion) {
    if (catalogFilter) {
      if (currentVersion !== 'desktop') {
        formToggleBtn.addEventListener('click', onToggleClick);
      } else {
        catalogFilter.addEventListener('click', onLegendClick);
      }
    }
  };

  window.filter = {
    elem: catalogFilter,
    init: initFilter
  };
})();
