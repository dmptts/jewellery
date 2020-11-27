'use strict';

(function () {
  var pageHeader = document.querySelector('.page-header');
  var topContainer = pageHeader.querySelector('.page-header__top-container');
  var menuContainer = pageHeader.querySelector('.page-header__menu-container');
  var mainNav = pageHeader.querySelector('.page-header__nav');
  var search = pageHeader.querySelector('.search');
  var userBlock = pageHeader.querySelector('.user-block');
  var loginBtn = userBlock.querySelector('.user-block__btn--login');
  var cartBtn = userBlock.querySelector('.user-block__btn--cart');
  var toggleBtn = pageHeader.querySelector('.page-header__toggle');

  var replaceSearch = function (currentVersion) {
    var documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(search);
    if (currentVersion !== 'desktop') {
      menuContainer.insertBefore(documentFragment, mainNav);
    } else {
      topContainer.appendChild(documentFragment);
    }
  };

  var replaceLoginBtn = function (currentVersion) {
    var documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(loginBtn);
    if (currentVersion !== 'desktop') {
      menuContainer.appendChild(documentFragment);
    } else {
      userBlock.insertBefore(documentFragment, cartBtn);
    }
  };

  var toggleMenu = function () {
    pageHeader.classList.toggle('page-header--menu-opened');
    userBlock.classList.toggle('user-block--menu-opened');
  };

  toggleBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    toggleMenu();
  });

  window.pageHeader = {
    elem: pageHeader,
    userBlock: userBlock,
    replaceSearch: replaceSearch,
    replaceLoginBtn: replaceLoginBtn,
  };
})();

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

(function () {
  var MOBILE_WIDTH = 767;
  var TABLET_WIDTH = 1023;

  var currentVersion;

  var initPage = function () {
    window.pageHeader.elem.classList.remove('page-header--no-js');
    window.pageHeader.userBlock.classList.remove('user-block--no-js');
    checkNeedToChangeElems();
  };

  var getCurrentVersion = function () {
    if (document.body.clientWidth <= MOBILE_WIDTH) {
      currentVersion = 'mobile';
    } else if (document.body.clientWidth > MOBILE_WIDTH && document.body.clientWidth <= TABLET_WIDTH) {
      currentVersion = 'tablet';
    } else {
      currentVersion = 'desktop';
    }
  };

  var checkNeedToChangeElems = function () {
    switch (currentVersion) {
      case 'tablet':
        window.pageHeader.replaceSearch(currentVersion);
        window.pageHeader.replaceLoginBtn(currentVersion);
        break;
      case 'mobile':
        window.pageHeader.replaceSearch(currentVersion);
        window.pageHeader.replaceLoginBtn(currentVersion);
        break;
      default:
        break;
    }
  };

  window.addEventListener('resize', function (evt) {
    evt.preventDefault();
    window.slider.setSliderItemsWidth();
    var pastVersion = currentVersion;
    getCurrentVersion();

    if (pastVersion !== currentVersion) {
      window.pageHeader.replaceSearch(currentVersion);
      window.pageHeader.replaceLoginBtn(currentVersion);
    }
  });

  if (svg4everybody) {
    svg4everybody();
  }

  getCurrentVersion();
  initPage();
})();
