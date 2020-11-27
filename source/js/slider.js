'use strict';

(function () {
  var slider = document.querySelector('.slider');
  var sliderPrevBtn = slider.querySelector('.slider__controls-btn--prev');
  var sliderNextBtn = slider.querySelector('.slider__controls-btn--next');
  var sliderList = slider.querySelector('.slider__list');
  var sliderItems = slider.querySelectorAll('.slider__item');
  var paginatorLinks = slider.querySelectorAll('.slider__paginator-link');
  var paginatorLinksArr = Array.prototype.slice.call(paginatorLinks);
  var pageNum = 1;
  var maxPageNum = Math.ceil(sliderItems.length / 4);

  var setSliderItemsWidth = function () {
    if (slider) {
      for (var i = 0; i < sliderItems.length; i++) {
        sliderItems[i].style.width = (slider.offsetWidth - (30 * 3)) / 4 + 'px';
      }
      shiftMargin(pageNum);
    }
  };

  var shiftMargin = function (newPageNum) {
    sliderList.style.marginLeft = 0 - slider.offsetWidth * (newPageNum - 1) + 'px';
  };

  var toggleControls = function () {
    sliderPrevBtn.removeAttribute('disabled');
    if (pageNum === maxPageNum) {
      sliderNextBtn.setAttribute('disabled', 'disabled');
    } else if (pageNum === 1) {
      sliderPrevBtn.setAttribute('disabled', 'disabled');
    } else {
      sliderPrevBtn.removeAttribute('disabled');
      sliderNextBtn.removeAttribute('disabled');
    }
  };

  var switchPage = function (pageCount) {
    var newPageNum = pageNum + pageCount;
    switchPaginatorClass(newPageNum);
    shiftMargin(newPageNum);
    pageNum = pageNum + pageCount;
    toggleControls();
  };

  var addPaginatorListeners = function () {
    for (var i = 0; i < paginatorLinksArr.length; i++) {
      paginatorLinksArr[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        if (!evt.target.classList.contains('slider__paginator-link--active')) {
          switchPage(paginatorLinksArr.indexOf(evt.target) + 1 - pageNum);
          toggleControls();
        }
      });
    }
  };

  var switchPaginatorClass = function (newPageNum) {
    paginatorLinksArr[pageNum - 1].classList.remove('slider__paginator-link--active');
    paginatorLinksArr[newPageNum - 1].classList.add('slider__paginator-link--active');
  };

  sliderPrevBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    switchPage(-1);
  });

  sliderNextBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    switchPage(1);
  });

  if (slider) {
    setSliderItemsWidth();
    addPaginatorListeners();
  }

  window.slider = {
    setSliderItemsWidth: setSliderItemsWidth
  };
})();
