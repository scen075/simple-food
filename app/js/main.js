$(function () {
  $('.reviews__slider').slick({
    dots: true,
    arrows: true,
    autoplay: true,
    infinite: false,
    autoplaySpeed: 7000,
    prevArrow: '<button class="reviews__arrow slider__arrow--prev" type="button"><svg class="reviews__angle-arrow--prev" width="11" height="19" fill="none"><use xlink:href="images/sprite.svg#icon-angle-brackets" fill="#c2c2c2"></use></svg></button>',
    nextArrow: '<button class="reviews__arrow slider__arrow--next" type="button"><svg class="reviews__angle-arrow--next" width="11" height="19" fill="none"><use xlink:href="images/sprite.svg#icon-angle-brackets" fill="#c2c2c2"></use></svg></button>',
    appendArrows: '.reviews__btn-box',
    appendDots: '.reviews__btn-box',
    responsive: [{
      breakpoint: 576,
      settings: {
        dots: false,
        fade:true
      }
    }]
  })

  $('.burger-open').on('click', function () {
    $('.menu-mob').addClass('menu-mob--active');
    $('body').addClass('lock');
  });

  $('.burger-close').on('click', function () {
    $('.menu-mob').removeClass('menu-mob--active');
    $('body').removeClass('lock');
  });

  $(window).on('resize', function (e) {
    // Переменная, по которой узнаем запущен слайдер или нет.
    var initLib = $('.library-slider').data('init-slider');

    if (window.innerWidth < 576) {
      // Если слайдер не запущен
      if (initLib != 1) {
        // Запускаем слайдер и записываем в data init-slider = 1
        $('.restorant__inner').slick({
          dots: true,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 7000
        });
      }
    }
    // Если десктоп
    else {
      // Если слайдер запущен
      if (initLib == 1) {
        // Разрушаем слайдер и записываем в data init-slider = 0
        $('.library-slider').slick('unslick').data({
          'init-slider': 0
        });
      }
    }
  }).trigger('resize')

});

var mixer = mixitup('.popular-criteria__content');