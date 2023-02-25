const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));  
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');
const fileInclude   = require('gulp-file-include');


function browsersync() {  //функция которая обновляет html
  browserSync.init({
    server: {
      baseDir: 'app/'  
    },
    notofy: false
  })
}

function styles() {  //функция для конвентирования cscc и css
  return src('app/scss/style.scss')    //выбиваем с каким файлом мы работаем
    .pipe(scss({outputStyle: 'compressed'}))  //выбираем в каком виде будет css
    .pipe(concat('style.min.css'))  //переименовываем файл
    .pipe(autoprefixer({   //делаем кросбраузерным сайт
       overrideBrowserslis: ['last 10 versions'],
       grid: true
    }))  
    .pipe(dest('app/css')) //выбираем куда выбрасыем результат
    .pipe(browserSync.stream())
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.min.js',
    'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'app/js/main.js'  //выбираем файлы js 
  ])
  .pipe(concat('main.min.js'))  //переименовываем
  .pipe(uglify())   //сжимаем
  .pipe(dest('app/js'))  //выкидываем
  .pipe(browserSync.stream())  //чтобы не обновляли страницу
}

const htmlInclude = () => {
  return src(['app/html/*.html']) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы													
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file',
  }))
  .pipe(dest('app')) // указываем, в какую папку поместить готовый файл html
  .pipe(browserSync.stream());
}

function images() {  //функция сжимает картинки
  return src('app/images/**/*.*')  //ищем картинки
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
	    imagemin.mozjpeg({quality: 75, progressive: true}),
	    imagemin.optipng({optimizationLevel: 5}),
	    imagemin.svgo({
		    plugins: [
			    {removeViewBox: true},
  			  {cleanupIDs: false}
	  	  ]
	    })
    ]))  //сжимаем
    .pipe(dest('dist/images'))  //выкидываем
}

function build() {
  return src([
    'app/**/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js'
  ], {base:'app'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function wathing() {  //функция которая автоматически обнавляет фацлы и сайт при изменениях
  watch(['app/scss/**/*.scss'], styles);  //выбираем за кем следить || ** - пересматриваем все папки , * все файлы
  watch(['app/**/*.js', '!app/js/main.min.js'], scripts)  //обновляем скрипты
  watch(['app/**/*.html']).on('change', browserSync.reload)  //обновляем html
  watch(['app/images/icons/*.svg'], svgSprites);
  watch(['app/html/**/*.html'], htmlInclude);
}

function svgSprites() {
  return src('app/images/icons/*.svg') 
  .pipe(cheerio({
        run: ($) => {
            $("[fill]").removeAttr("fill"); 
            $("[stroke]").removeAttr("stroke"); 
            $("[style]").removeAttr("style"); 
        },
        parserOptions: { xmlMode: true },
      })
  )
	.pipe(replace('&gt;','>')) // боремся с заменой символа 
	.pipe(
	      svgSprite({
	        mode: {
	          stack: {
	            sprite: '../sprite.svg', 
	          },
	        },
	      })
	    )
	.pipe(dest('app/images')); 
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.wathing = wathing;
exports.build = series(cleanDist, images, build);
exports.svgSprites = svgSprites;
exports.htmlInclude = htmlInclude;

exports.default = parallel(htmlInclude, svgSprites, styles, scripts, browsersync, wathing)
