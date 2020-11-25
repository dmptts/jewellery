'use strict';

(function () {
  var pageHeader = document.querySelector('.page-header');
  var logo = pageHeader.querySelector('.page-header__logo-link');
  var menuContainer = pageHeader.querySelector('.page-header__menu-container');
  var search = pageHeader.querySelector('.search');
  var userBlock = pageHeader.querySelector('.user-block');
  var loginBtn = userBlock.querySelector('.user-block__btn--login');
  var toggleBtn = pageHeader.querySelector('.page-header__toggle');

  var replaceSearch = function (currentVersion) {
    var documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(search);
    if (currentVersion !== 'desktop') {
      menuContainer.prepend(documentFragment);
    } else {
      logo.after(documentFragment);
    }
  };

  var replaceLoginBtn = function (currentVersion) {
    var documentFragment = document.createDocumentFragment();
    documentFragment.appendChild(loginBtn);
    if (currentVersion !== 'desktop') {
      menuContainer.append(documentFragment);
    } else {
      userBlock.prepend(documentFragment);
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
