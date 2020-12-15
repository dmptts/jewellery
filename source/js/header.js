'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var pageHeader = document.querySelector('.header');
  var topContainer = document.querySelector('.header__top-container');
  var menu = document.querySelector('.header__menu');
  var mainNav = document.querySelector('.header__nav');
  var search = document.querySelector('.search');
  var userBlock = document.querySelector('.user-block');
  var loginBtn = document.querySelector('.user-block__btn--login');
  var cartBtn = document.querySelector('.user-block__btn--cart');
  var toggleBtn = document.querySelector('.header__toggle');

  var replaceSearch = function (currentVersion) {
    var documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(search);
    if (currentVersion !== 'desktop') {
      menu.insertBefore(documentFragment, mainNav);
    } else {
      topContainer.appendChild(documentFragment);
    }
  };

  var replaceLoginBtn = function (currentVersion) {
    var documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(loginBtn);
    if (currentVersion !== 'desktop') {
      menu.appendChild(documentFragment);
    } else {
      userBlock.insertBefore(documentFragment, cartBtn);
    }
  };

  var toggleMenu = function () {
    pageHeader.classList.toggle('header--menu-opened');
    userBlock.classList.toggle('user-block--menu-opened');
    pageBody.classList.toggle('no-scroll');
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
