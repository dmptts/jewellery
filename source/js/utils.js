'use strict';

(function () {
  var MOBILE_WIDTH = 767;
  var TABLET_WIDTH = 1023;

  var currentVersion;

  var initPage = function () {
    window.pageHeader.elem.classList.remove('page-header--no-js');
    window.pageHeader.userBlock.classList.remove('user-block--no-js');
    if (window.slider.elem) {
      window.slider.elem.classList.remove('slider--no-js');
      window.slider.setSliderItemsWidth(currentVersion);
      window.slider.renderPaginator(currentVersion);
    }
    if (window.faq) {
      window.faq.init();
    }
    if (window.filter) {
      window.filter.elem.classList.remove('catalog-filter--no-js');
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
