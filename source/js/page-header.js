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
