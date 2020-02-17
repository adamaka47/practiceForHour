const gulp = require('gulp')
const autoprefix = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const bs = require('browser-sync')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const gulpinc = require('gulp-file-include')
const watch = require('gulp-watch')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')


gulp.task('html', function(cb) {

	return gulp.src('docs/htmls/*.html')
		.pipe(gulpinc({
			prefix: '@@'
		}))
		.pipe(gulp.dest('docs/'))
		.pipe(bs.stream())

	cb();

})

gulp.task('jsConvert', function(cb) {

	return gulp.src('docs/js/script.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('docs/js/'))
		.pipe(bs.stream())


})




gulp.task('sass', function() {

	return gulp.src('docs/sass/main.sass')
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'sass',
					sound: true,
					message: err.message
				}
				})
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefix({
			overrideBrowserslist: ['last 4 versions']
		}))
		.pipe(sourcemaps.write())

		.pipe(gulp.dest('./docs/css'))

		.pipe(bs.stream())


})

gulp.task('serv', function(cb) {

	bs.init({
		server: {
			baseDir: './docs/'
		}
	})

	cb()

})

gulp.task('watch', function(cb) {

	watch('docs/js/script.js').on('change', bs.reload)
	watch('docs/htmls/**/*.html', gulp.parallel('html'))
	watch('docs/sass/**/*.*', gulp.parallel('sass'))

	cb()

})


gulp.task('default', gulp.parallel('sass', 'html', 'serv', 'watch'))