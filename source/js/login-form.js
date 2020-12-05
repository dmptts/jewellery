'use strict';

(function () {
  var isStorageSupport = true;

  var loginForm = document.querySelector('.login-popup__form');
  var emailField = document.querySelector('.login-popup input[name="email"]');
  var passwordField = document.querySelector('.login-popup input[type="password"');

  var checkLocalStorage = function () {
    try {
      localStorage.getItem('login');
    } catch (err) {
      isStorageSupport = false;
    }
  };

  var fillInputs = function () {
    if (isStorageSupport) {
      if (localStorage.getItem('email') !== null) {
        emailField.value = localStorage.getItem('email');
      }
    }
  };

  var saveToLocalStorage = function () {
    if (isStorageSupport) {
      localStorage.setItem('email', emailField.value);
    }
  };

  var placeFocus = function () {
    if (emailField.value) {
      passwordField.focus();
    } else {
      emailField.focus();
    }
  };

  var initForm = function () {
    checkLocalStorage();
    fillInputs();
    placeFocus();
    loginForm.addEventListener('submit', onFormSubmit);
  };

  var onFormSubmit = function () {
    saveToLocalStorage();
  };

  window.loginForm = {
    elem: loginForm,
    init: initForm
  };
})();
