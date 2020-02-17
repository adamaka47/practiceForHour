"use strict";

document.addEventListener('DOMContentLoaded', function (e) {
  var dots = document.querySelectorAll('.slider-dots__link');
  dots.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      dots.forEach(function (item) {
        return item.classList.remove('slider-dots__link_active');
      });
      item.classList.add('slider-dots__link_active');
      document.querySelectorAll('.slider-item').forEach(function (item) {
        return item.classList.remove('slider-item_active');
      });
      document.querySelector(".slider-item[data-dot=\"".concat(item.getAttribute('data-dot'), "\"]")).classList.add('slider-item_active');
    });
  });
});