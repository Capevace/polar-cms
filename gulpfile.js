const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

gulp.task('views', () => {
  return gulp.src(['server/**/*.hbs'])
    .pipe(gulp.dest('server-build'));
});

gulp.task('build', () => {
  return gulp.src([
    'server/**/*.js',
    '!server/app/public/**/*'])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('server-build'));
});

gulp.task('public', () => {
  return gulp.src([
    'server/app/public/**/*'])
    .pipe(gulp.dest('server-build/app/public'));
});

gulp.task('watch', ['build', 'views', 'public'], () => {
  gulp.watch('server/**/*.hbs', { interval: 500 }, ['views']);
  gulp.watch('server/**/*.js', { interval: 500 }, ['build']);
  gulp.watch('server/app/public/**/*', { interval: 500 }, ['public']);
});
