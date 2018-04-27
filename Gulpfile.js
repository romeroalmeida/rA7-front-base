var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var bs = require('browser-sync').create();

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

var input = './scss/**/*.scss';
var output = './css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
    return gulp.src(input)
                .pipe(sourcemaps.init())
                .pipe(sass(sassOptions).on('error', sass.logError))
                .pipe(autoprefixer(autoprefixerOptions))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(output))
                .pipe(bs.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("./scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', bs.reload);
    gulp.watch("./js/*.js").on('change', bs.reload);
});