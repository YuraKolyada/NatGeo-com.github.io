var gulp = require('gulp'),
	browser = require('browser-sync').create(),
	less = require('gulp-less'),
	spritesmith = require('gulp.spritesmith'),
	gulpif = require('gulp-if'),
	merge = require('merge-stream');


gulp.task('server', function(){
	browser.init({
		server: {
			baseDir: './'
		}
	});
    gulp.watch('./less/*.less', ['less']);
    gulp.watch('./index.html').on('change', browser.reload);
});

gulp.task('less', function(){
	gulp.src('./less/*.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'))
		.pipe(browser.stream());
});

gulp.task('sprite', function(){
	var spriteData = gulp.src('./images/icons/*.png')
		.pipe(spritesmith({
			imgName: 'icons.png',
			cssName: 'icons.css',
			padding: 15,
			algorithm: "top-down"
		}));
	return spriteData.pipe(gulp.dest('sprite/'));
});

gulp.task('default', ['server']);

