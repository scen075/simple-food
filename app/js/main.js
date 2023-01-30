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

  $('.promo__slider').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000
  });

});

var mixer = mixitup('.popular-criteria__content');