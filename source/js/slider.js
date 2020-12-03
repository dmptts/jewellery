'use strict';

(function () {
  var MOBILE_WIDTH = 767;

  var slider = document.querySelector('.slider');
  var sliderPrevBtn = document.querySelector('.slider__controls-btn--prev');
  var sliderNextBtn = document.querySelector('.slider__controls-btn--next');
  var sliderList = document.querySelector('.slider__list');
  var sliderItems = document.querySelectorAll('.slider__item');
  var paginator = document.querySelector('.slider__paginator');
  var paginatorLinksArr = [];
  var paginatorLinkTemplate = document.querySelector('#paginator-link');

  var touchstartX = 0;
  var touchendX = 0;

  var itemsRightMargin = 30;
  var pageNum;
  var itemsPerPage;
  var maxPageNum;

  var getItemsPerPage = function (currentVersion) {
    if (currentVersion === 'desktop') {
      itemsPerPage = 4;
    } else {
      itemsPerPage = 2;
    }
  };

  var renderPaginatorLinks = function () {
    var paginatorFragment = document.createDocumentFragment();

    for (var i = 0; i < maxPageNum; i++) {
      var paginatorLinkElement = paginatorLinkTemplate.content.cloneNode(true);
      paginatorFragment.appendChild(paginatorLinkElement);
      paginatorFragment.children[i].children[0].textContent = i + 1;

      if (i === 0) {
        paginatorFragment.children[i].children[0].classList.add('slider__paginator-link--active');
      }
    }

    paginator.appendChild(paginatorFragment);
    addPaginatorListeners();
  };

  var renderPaginatorText = function () {
    if (document.body.clientWidth <= MOBILE_WIDTH) {
      paginator.textContent = pageNum + ' of ' + maxPageNum;
    }
  };

  var renderPaginator = function (currentVersion) {
    if (slider) {
      removePaginator();
      getItemsPerPage(currentVersion);
      pageNum = 1;
      maxPageNum = Math.ceil(sliderItems.length / itemsPerPage);

      if (currentVersion !== 'mobile') {
        renderPaginatorLinks();
      } else {
        renderPaginatorText();
      }
    }
  };

  var getPaginatorLinksArr = function () {
    paginatorLinksArr = Array.prototype.slice.call(slider.querySelectorAll('.slider__paginator-link'));
  };

  var removePaginator = function () {
    paginator.textContent = '';
    var paginatorLinks = slider.querySelectorAll('.slider__paginator-item');
    for (var i = 0; i < paginatorLinks.length; i++) {
      paginatorLinks[i].remove();
    }
  };

  var setSliderItemsWidth = function (currentVersion) {
    if (slider) {
      getItemsPerPage(currentVersion);
      for (var i = 0; i < sliderItems.length; i++) {
        sliderItems[i].style.width = (slider.offsetWidth - (itemsRightMargin * (itemsPerPage - 1))) / itemsPerPage + 'px';
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
    if (newPageNum <= maxPageNum && newPageNum > 0) {
      if (document.querySelector('.slider__paginator-link')) {
        switchPaginatorClass(newPageNum);
      }
      shiftMargin(newPageNum);
      pageNum = pageNum + pageCount;
      toggleControls();
    }
  };

  var addPaginatorListeners = function () {
    getPaginatorLinksArr();
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

  var onSliderSwipe = function () {
    if (touchendX < touchstartX) {
      switchPage(1);
      renderPaginatorText();
    }
    if (touchendX > touchstartX) {
      switchPage(-1);
      renderPaginatorText();
    }
  };

  var initSlider = function (currentVersion) {
    setSliderItemsWidth(currentVersion);
    renderPaginator(currentVersion);

    sliderPrevBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      switchPage(-1);
    });

    sliderNextBtn.addEventListener('click', function (evt) {
      evt.preventDefault();
      switchPage(1);
    });

    sliderList.addEventListener('touchstart', function (evt) {
      var touchObj = evt.changedTouches[0];
      touchstartX = touchObj.screenX;
    }, false);

    sliderList.addEventListener('touchmove', function (evt) {
      evt.preventDefault();
    }, false);

    sliderList.addEventListener('touchend', function (evt) {
      var touchObj = evt.changedTouches[0];
      touchendX = touchObj.screenX;
      onSliderSwipe();
    }, false);
  };

  window.slider = {
    elem: slider,
    init: initSlider,
    setSliderItemsWidth: setSliderItemsWidth,
    renderPaginator: renderPaginator
  };
})();
