'use strict';

(function () {
  var pageBody = document.querySelector('body');
  var cartBtn = document.querySelector('a[href="cart-popup.html"');
  var cartPopup = document.querySelector('.cart-popup');
  var cartPopupCloseBtn = document.querySelector('.cart-popup__close-btn');
  var cartPopupReturnBtn = document.querySelector('.cart-popup__return-btn');
  var cartPopupCheckoutBtn = document.querySelector('.cart-popup__checkout-btn');
  var popupOverlay = document.querySelector('.popup-overlay');

  var toggleCartPopup = function () {
    cartPopup.classList.toggle('cart-popup--opened');
    popupOverlay.classList.toggle('popup-overlay--opened');
    pageBody.classList.toggle('no-scroll');

    if (cartPopup.classList.contains('cart-popup--opened')) {
      cartBtn.removeEventListener('click', onCartBtnClick);
      cartBtn.removeEventListener('keydown', onCartBtnEnterPress);
      document.addEventListener('keydown', onDocumentEscPress);
      popupOverlay.addEventListener('click', onPopupOverlayClick);
      cartPopupCloseBtn.addEventListener('click', onCartPopupCloseBtnClick);
      cartPopupCloseBtn.addEventListener('keydown', onCartPopupCloseBtnEnterPress);
      cartPopupReturnBtn.addEventListener('click', onReturnBtnClick);
      cartPopupReturnBtn.addEventListener('keydown', onReturnBtnEnterPress);
      cartPopupCheckoutBtn.focus();
    } else {
      cartBtn.addEventListener('click', onCartBtnClick);
      cartBtn.addEventListener('keydown', onCartBtnEnterPress);
      document.removeEventListener('keydown', onDocumentEscPress);
      popupOverlay.removeEventListener('click', onPopupOverlayClick);
      cartPopupCloseBtn.removeEventListener('click', onCartPopupCloseBtnClick);
      cartPopupCloseBtn.removeEventListener('keydown', onCartPopupCloseBtnEnterPress);
      cartPopupReturnBtn.removeEventListener('click', onReturnBtnClick);
      cartPopupReturnBtn.removeEventListener('keydown', onReturnBtnEnterPress);
    }
  };

  var initCartPopup = function () {
    if (cartBtn && cartPopup) {
      cartBtn.addEventListener('click', onCartBtnClick);
      cartBtn.addEventListener('keydown', onCartBtnEnterPress);
    }
  };

  var onCartBtnClick = function (evt) {
    evt.preventDefault();
    toggleCartPopup();
  };

  var onCartBtnEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      toggleCartPopup();
    }
  };

  var onDocumentEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      toggleCartPopup();
    }
  };

  var onCartPopupCloseBtnClick = function (evt) {
    evt.preventDefault();
    toggleCartPopup();
  };

  var onCartPopupCloseBtnEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      toggleCartPopup();
    }
  };

  var onReturnBtnClick = function (evt) {
    evt.preventDefault();
    toggleCartPopup();
  };

  var onReturnBtnEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      toggleCartPopup();
    }
  };

  var onPopupOverlayClick = function () {
    toggleCartPopup();
  };

  window.cartPopup = {
    elem: cartPopup,
    init: initCartPopup
  };
})();

