var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('scripts', function() {
	gulp.src('public/js/src/*.js')
		.pipe(uglify())
	    .pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
	gulp.watch('public/js/dev/*.js', ['scripts']);
});