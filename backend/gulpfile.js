const gulp = require('gulp');
const sass = require('gulp-sass');
const run = require('gulp-run');
const { exec, spawn } = require('child_process');

gulp.task('sass', () => {
  return gulp.src('src/css/scss/main.scss')
    .pipe(
      sass()
        .on('error', sass.logError)
    )
    .pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', ['sass'], () => {
  gulp.watch('src/css/scss/**/*.scss', ['sass']);
});

gulp.task('build-react', (cb) => {
  exec('npm run build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('move-to-server', ['sass', 'build-react'], () => {
  return gulp.src(['build/*.css', 'build/*.js', 'build/*.map'])
    .pipe(gulp.dest('../server/app/public/static'));
});

gulp.task('react-debug-server', () => {
  const npm = spawn('npm', ['start']);

  npm.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  npm.stderr.on('data', (data) => {
    console.log(`Error: ${data}`);
  });

  npm.on('close', (code) => {
    console.log(`Npm start exited with code ${code}`);
  });
});


gulp.task('production', ['sass', 'build-react', 'move-to-server'], () => {});
gulp.task('dev', ['sass:watch', 'react-debug-server'], () => {});
