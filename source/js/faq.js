'use strict';

(function () {
  var faqList = document.querySelector('.faq__list');

  var toggleFaqItem = function (item) {
    item.classList.toggle('faq__item--opened');
  };

  if (faqList) {
    faqList.addEventListener('click', function (evt) {
      var faqItem = evt.target.closest('li');
      toggleFaqItem(faqItem);
    });
  }
})();
