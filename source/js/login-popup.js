'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var userBtn = document.querySelector('.header__login-btn');
  var loginPopup = document.querySelector('.login-popup');
  var loginPopupCloseBtn = document.querySelector('.login-popup__close-btn');
  var popupOverlay = document.querySelector('.popup-overlay');

  var toggleLoginPopup = function () {
    loginPopup.classList.toggle('login-popup--opened');
    popupOverlay.classList.toggle('popup-overlay--opened');
    pageBody.classList.toggle('no-scroll');

    if (loginPopup.classList.contains('login-popup--opened')) {
      userBtn.removeEventListener('click', onUserBtnClick);
      userBtn.removeEventListener('keydown', onUserBtnEnterPress);
      document.addEventListener('keydown', onDocumentEscPress);
      popupOverlay.addEventListener('click', onPopupOverlayClick);
      loginPopupCloseBtn.addEventListener('click', onCartPopupCloseBtnClick);
      loginPopupCloseBtn.addEventListener('keydown', onCartPopupCloseBtnEnterPress);
      window.loginForm.init();
    } else {
      userBtn.addEventListener('click', onUserBtnClick);
      userBtn.addEventListener('keydown', onUserBtnEnterPress);
      document.removeEventListener('keydown', onDocumentEscPress);
      popupOverlay.removeEventListener('click', onPopupOverlayClick);
      loginPopupCloseBtn.removeEventListener('click', onCartPopupCloseBtnClick);
      loginPopupCloseBtn.removeEventListener('keydown', onCartPopupCloseBtnEnterPress);
    }
  };

  var initLoginPopup = function () {
    userBtn.addEventListener('click', onUserBtnClick);
    userBtn.addEventListener('keydown', onUserBtnEnterPress);
  };

  var onUserBtnClick = function (evt) {
    evt.preventDefault();
    toggleLoginPopup();
  };

  var onUserBtnEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      toggleLoginPopup();
    }
  };

  var onDocumentEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      toggleLoginPopup();
    }
  };

  var onPopupOverlayClick = function () {
    toggleLoginPopup();
  };

  var onCartPopupCloseBtnClick = function (evt) {
    evt.preventDefault();
    toggleLoginPopup();
  };

  var onCartPopupCloseBtnEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      toggleLoginPopup();
    }
  };

  window.loginPopup = {
    elem: loginPopup,
    init: initLoginPopup
  };
})();
