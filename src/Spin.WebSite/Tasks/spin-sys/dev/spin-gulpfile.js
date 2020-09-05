/// <binding AfterBuild='default' Clean='clean' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

/*TYPESCRIPT */
const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
/*LESS*/
const less = require('gulp-less');
const lessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new lessAutoprefix({ browsers: ['last 2 versions'] });

const pathFiles = require("../pathsConfiguration.json");


/**
 * TASK LIST
 */
gulp.task('clean_js', function () {
    return del(pathFiles.filesJS);
});

gulp.task('transpilar', function () {
    return gulp.src(pathFiles.filesForTranspilar, { base: "./" })
        .pipe(tsProject())
        .pipe(gulp.dest("."))
});

/* Less Compile Taks */
gulp.task('clean_css', function () {
    return del(pathFiles.filesCSS);
});

gulp.task('less', () => {
    return gulp.src(pathFiles.filesForLess, { base: "./" })
        .pipe(less({ plugins: [autoprefix] }))
        .pipe(gulp.dest("."))
});


gulp.task('default', gulp.series("clean_js", "transpilar", "clean_css", "less"));
gulp.task('clean_all', gulp.series("clean_js","clean_css"));

/* WATCHER */
var watch = gulp.series('default', function () { /*'browser-sync*/
    console.log("watching .......");
    gulp.watch(pathFiles.filesForTranspilar, gulp.parallel('transpilar'));    
    gulp.watch(pathFiles.filesForLess, gulp.parallel('less'));    
});
gulp.task('w', watch);


