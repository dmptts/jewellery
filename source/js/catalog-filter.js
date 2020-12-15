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
    if (evt.target.tagName === 'LEGEND') {
      var fieldsetItem = evt.target.closest('.catalog-filter__fieldset-wrapper');
      toggleFieldset(fieldsetItem);
    }
  };

  var onFieldsetEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      toggleFieldset(evt.target);
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
        catalogFilter.removeEventListener('click', onLegendClick);
        formToggleBtn.addEventListener('click', onToggleClick);
        catalogFilter.removeEventListener('keydown', onFieldsetEnterPress);
        catalogFilter.addEventListener('keydown', onFieldsetEnterPress);
      } else {
        catalogFilter.removeEventListener('click', onLegendClick);
        catalogFilter.addEventListener('click', onLegendClick);
        catalogFilter.removeEventListener('keydown', onFieldsetEnterPress);
        catalogFilter.addEventListener('keydown', onFieldsetEnterPress);
      }
    }
  };

  window.filter = {
    elem: catalogFilter,
    init: initFilter
  };
})();
