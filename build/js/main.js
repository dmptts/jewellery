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

(function () {
  var faqList = document.querySelector('.faq__list');

  if (faqList) {
    var toggleFaqItem = function (item) {
      item.classList.toggle('faq__item--opened');
    };

    faqList.addEventListener('click', function (evt) {
      var faqItem = evt.target.closest('li');
      toggleFaqItem(faqItem);
    });
  }
})();

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

(function () {
  var MOBILE_WIDTH = 767;
  var TABLET_WIDTH = 1023;

  var currentVersion;

  var initPage = function () {
    window.pageHeader.elem.classList.remove('page-header--no-js');
    window.pageHeader.userBlock.classList.remove('user-block--no-js');
    if (window.slider.elem) {
      window.slider.elem.classList.remove('slider--no-js');
      window.slider.init(currentVersion);
    }
    if (window.faq) {
      window.faq.init();
    }
    if (window.filter.elem) {
      window.filter.elem.classList.remove('catalog-filter--no-js');
      window.filter.init(currentVersion);
    }
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
    var pastVersion = currentVersion;
    getCurrentVersion();

    if (pastVersion !== currentVersion) {
      window.pageHeader.replaceSearch(currentVersion);
      window.pageHeader.replaceLoginBtn(currentVersion);
      window.slider.renderPaginator(currentVersion);
      window.filter.init(currentVersion);
    }

    window.slider.setSliderItemsWidth(currentVersion);
  });

  if (svg4everybody) {
    svg4everybody();
  }

  if (objectFitImages) {
    objectFitImages();
  }

  if (window.picturefill) {
    window.picturefill();
  }

  getCurrentVersion();
  initPage();
})();
