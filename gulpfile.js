const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));  
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();



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
    'app/js/main.js'  //выбираем файлы js 
  ])
  .pipe(concat('main.min.js'))  //переименовываем
  .pipe(uglify())   //сжимаем
  .pipe(dest('app/js'))  //выкидываем
  .pipe(browserSync.stream())  //чтобы не обновляли страницу
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
}


exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.browsersync = browsersync;
exports.cleanDist = cleanDist;
exports.wathing = wathing;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, wathing)
