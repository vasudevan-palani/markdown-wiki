// include dependency plugins
var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
//var watch = require('gulp-watch');
var rootpath = "src/";
var distpath = "dist/";

// components folder js files concat and minify into apps.js and apps.min.js
gulp.task('mainjs', function() {
    return gulp.src([
            rootpath + 'js/*.js',
            rootpath + 'js/**/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(jshint({
            "asi": true,
            "eqeqeq": false,
            "expr": true,
            "undef": false,
            "eqnull": true,
            "lastsemic": true,
            "laxcomma": true,
            "-W041": false,
            "sub": true,
            "-W018": false,
            "-W019": false,
            "boss": true
        }))
        .pipe(jshint.reporter('jshint-stylish'))
        //.pipe(jshint.reporter('default'))
        .pipe(minify().on('error', console.error.bind(console)))
        .pipe(gulp.dest(distpath));
});

// components and utils folder scss files compile and compress into main.css and main.min.css
gulp.task('sass', function() {
    gulp.src([
            rootpath + 'styles/*.scss'
        ])
        .pipe(concat('app.scss'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(distpath));
});

// components and utils folder scss files compile and compress into main.css and main.min.css
gulp.task('maincss', function() {
    gulp.src([
            rootpath + 'styles/*.css',
            distpath + '/app.css',
            'node_modules/codemirror/lib/codemirror.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/highlightjs/styles/github.css'
        ])
        .pipe(concat('main-min.css'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(distpath));
});


// Compiles and concat all the js & scss files and create the respective js & css files
gulp.task('default', ['mainjs', 'sass','maincss']);
