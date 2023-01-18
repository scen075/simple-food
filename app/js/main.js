$(function () {
  $('.reviews__slider').slick({
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 7000,
    prevArrow: '<button class="reviews__arrow slider__arrow--prev" type="button"><svg class="reviews__angle-arrow--prev" width="11" height="19" fill="none"><use xlink:href="images/sprite.svg#icon-angle-brackets" fill="#c2c2c2"></use></svg></button>',
    nextArrow: '<button class="reviews__arrow slider__arrow--next" type="button"><svg class="reviews__angle-arrow--next" width="11" height="19" fill="none"><use xlink:href="images/sprite.svg#icon-angle-brackets" fill="#c2c2c2"></use></svg></button>',
    appendArrows: '.reviews__btn-box',
    appendDots: '.reviews__btn-box'
  })
})

var mixer = mixitup('.popular-criteria__content');