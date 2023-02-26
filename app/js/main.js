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
        fade: true
      }
    }]
  })

  $('.recent__items').slick({
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="recent__arrow slider__arrow--prev" type="button"><svg class="recent__angle-arrow--prev" width="11" height="19" fill="none"><use xlink:href="images/sprite.svg#icon-angle-brackets" fill="#c2c2c2"></use></svg></button>',
    nextArrow: '<button class="recent__arrow slider__arrow--next" type="button"><svg class="recent__angle-arrow--next" width="11" height="19" fill="none"><use xlink:href="images/sprite.svg#icon-angle-brackets" fill="#c2c2c2"></use></svg></button>',
    appendArrows: '.recent__btn-box',
    appendDots: '.recent__dots-box',
    dots: false,

    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      }
    }],

    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      }
    }],

    responsive: [{
      breakpoint: 768,
      settings: {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false
      }
    }]
  })

  $('.restorant__slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000
  });

  $('.burger-open').on('click', function () {
    $('.menu-mob').addClass('menu-mob--active');
    $('body').addClass('lock');
  });

  $('.burger-close').on('click', function () {
    $('.menu-mob').removeClass('menu-mob--active');
    $('body').removeClass('lock');
  });

  $(document).mouseup(function (e) { // событие клика по веб-документу
    const div = $(".menu-mob--active"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
      &&
      div.has(e.target).length === 0) { // и не по его дочерним элементам
      $('.menu-mob').removeClass('menu-mob--active');
      $('body').removeClass('lock');
    }
  });

  $('.catalog__filter-sort').styler();

  $('.product__form-num').styler();

  var $range = $(".filter-price__slider"),
    $inputFrom = $(".filter-price__from"),
    $inputTo = $(".filter-price__to"),
    instance,
    min = 100,
    max = 1000,
    from = 200,
    to = 800;

  $range.ionRangeSlider({
    skin: "round",
    type: "double",
    min: min,
    max: max,
    from: 200,
    to: 800,
    onStart: updateInputs,
    onChange: updateInputs
  });
  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val
    });
  });

  $inputTo.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val
    });
  });

  $('.catalog__filter-open').on('click', function () {
    $('.filter-mob').addClass('filter-mob--active');
    $('body').addClass('lock');
  });

  $('.filter-mob__filter-close').on('click', function () {
    $('.filter-mob').removeClass('filter-mob--active');
    $('body').removeClass('lock');
  });

  $(document).mouseup(function (e) { // событие клика по веб-документу
    const div = $(".filter-mob--active"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
      &&
      div.has(e.target).length === 0) { // и не по его дочерним элементам
      $('.filter-mob').removeClass('filter-mob--active');
      $('body').removeClass('lock');
    }
  });

  $('.product__gallery-list').slick({
    responsive: [{
      breakpoint: 576,
      settings: {
        arrows: false
      }
    }]
  })

  $('.promo__slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000
  });

  $('[data-fancybox="gallery"]').fancybox({
    infobar: false,
    smallBtn: "auto",
    loop: true,
    slideShow: false,
    buttons: [
      "close"
    ],
    btnTpl: {
      arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
        '<div><svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.9641 14.9851L2.95082 0.392105C2.42535 -0.130702 1.57314 -0.130702 1.04767 0.392105C0.522196 0.914872 0.522196 1.76312 1.04767 2.28593L16.0954 16L1.049 29.7141C0.523529 30.2369 0.523529 31.0852 1.049 31.6079C1.57448 32.1307 2.42668 32.1307 2.95212 31.6079L18.9654 17.0149C19.2455 16.7362 19.3656 16.3668 19.3469 16.0014C19.3643 15.6346 19.2443 15.2652 18.9641 14.9851Z" fill="#505050"/></svg></div>' +
        "</button>",

      arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
        '<div><svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.03833 17.0149L17.0516 31.6079C17.5771 32.1307 18.4293 32.1307 18.9548 31.6079C19.4802 31.0851 19.4802 30.2369 18.9548 29.7141L3.90702 16L18.9534 2.2859C19.4789 1.76309 19.4789 0.914839 18.9534 0.392073C18.428 -0.130695 17.5758 -0.130695 17.0503 0.392072L1.037 14.9851C0.756927 15.2638 0.636852 15.6332 0.655559 15.9986C0.638145 16.3654 0.758182 16.7348 1.03833 17.0149Z" fill="#505050"/></svg></div>' +
        "</button>",
    }
  });

  $('.star').rateYo({
    starWidth: "16px",
    normalFill: " rgba(193, 193, 193, 0.3)",
    ratedFill: "#FFB800",
    readOnly: true,
    fullStar: true,
    spacing: "6px",
    "starSvg": "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
      "<g clip-path='url(#clip0_3197_363)'>" +
      "<path d='M0.0229731 6.16432C0.0780973 5.9946 0.224753 5.87091 0.401315 5.84529L5.36139 5.12451L7.57966 0.629933C7.6586 0.469933 7.82157 0.368652 7.99997 0.368652C8.17841 0.368652 8.34135 0.469933 8.42032 0.629933L10.6387 5.12451L15.5987 5.84529C15.7752 5.87091 15.9219 5.9946 15.977 6.16429C16.0322 6.334 15.9862 6.52028 15.8584 6.64481L12.2694 10.1434L13.1165 15.0834C13.1467 15.2593 13.0744 15.437 12.9301 15.5419C12.8484 15.6012 12.7517 15.6314 12.6545 15.6314C12.5799 15.6314 12.505 15.6136 12.4365 15.5776L8 13.2451L3.56374 15.5775C3.40577 15.6606 3.21443 15.6467 3.07009 15.5419C2.92574 15.437 2.8534 15.2593 2.88356 15.0834L3.73096 10.1434L0.141566 6.64478C0.0138168 6.52028 -0.0322151 6.334 0.0229731 6.16432Z'/>" +
      "</g>" +
      "</svg>"
  })

  $('.review__star').rateYo({
    starWidth: "16px",
    normalFill: " rgba(193, 193, 193, 0.3)",
    ratedFill: "#FFB800",
    fullStar: true,
    spacing: "6px",
    "starSvg": "<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>" +
      "<g clip-path='url(#clip0_3197_363)'>" +
      "<path d='M0.0229731 6.16432C0.0780973 5.9946 0.224753 5.87091 0.401315 5.84529L5.36139 5.12451L7.57966 0.629933C7.6586 0.469933 7.82157 0.368652 7.99997 0.368652C8.17841 0.368652 8.34135 0.469933 8.42032 0.629933L10.6387 5.12451L15.5987 5.84529C15.7752 5.87091 15.9219 5.9946 15.977 6.16429C16.0322 6.334 15.9862 6.52028 15.8584 6.64481L12.2694 10.1434L13.1165 15.0834C13.1467 15.2593 13.0744 15.437 12.9301 15.5419C12.8484 15.6012 12.7517 15.6314 12.6545 15.6314C12.5799 15.6314 12.505 15.6136 12.4365 15.5776L8 13.2451L3.56374 15.5775C3.40577 15.6606 3.21443 15.6467 3.07009 15.5419C2.92574 15.437 2.8534 15.2593 2.88356 15.0834L3.73096 10.1434L0.141566 6.64478C0.0138168 6.52028 -0.0322151 6.334 0.0229731 6.16432Z'/>" +
      "</g>" +
      "</svg>"
  })

  $('.product__tabs-link').on('click', function (e) {
    e.preventDefault();
    $('.product__tabs-link').removeClass('product__tabs-link--active')
    $(this).addClass('product__tabs-link--active')
    $('.product__tabs-item').removeClass('product__tabs-item--active')
    $($(this).attr('href')).addClass('product__tabs-item--active')
  })

});

var mixer = mixitup('.popular-criteria__content');