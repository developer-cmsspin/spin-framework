/// <binding AfterBuild='default' Clean='clean' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

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
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const amdOptimize = require('gulp-amd-optimizer');
const concat = require('gulp-concat');
const through = require('through2');
const path = require('path');
const rjs = require("requirejs");
const insert = require('gulp-insert');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('tsconfig.json');

/*LESS*/
const less = require('gulp-less');
const uglifycss = require('gulp-uglifycss');
const lessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new lessAutoprefix({ browsers: ['last 2 versions'] });

/* GET CONFING */
const pathFiles = require("../pathsConfiguration.json");
pathFiles.requireConfig.baseUrl = __dirname;




/**
 * TASK LIST
 */
gulp.task('clean_js', function () {
    del([pathFiles.copyPathToJS + "/**/*.js", pathFiles.copyPathToJS + "/**/*.js.map"]);
    return del(pathFiles.filesJS);
});

gulp.task("copy_files_js", () => {
    return gulp.src(pathFiles.filesJS)
        .pipe(gulp.dest(pathFiles.copyPathToJS));
});

gulp.task('transpilar', function () {
    return gulp.src(pathFiles.filesForTranspilar, { base: "./" })
        //.pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        //.pipe(uglify())
        .pipe(rename(function (path) {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".js"
            };
        })).
        //pipe(sourcemaps.write('.')).
        pipe(gulp.dest("."))
});


/* OPTIMIZER*/
gulp.task('optimizer_js', function () {
    return gulp.src([pathFiles.copyPathToJS + "/**/*.js"])
        .pipe(through.obj(function (file, enc, cb) {
            let last_path = file.history.reverse()[0];
            let name_file = path.basename(last_path, path.extname(last_path));
            let base_url = path.dirname(last_path);

            let config = {
                baseUrl: base_url,
                name: name_file,
                out: `${base_url}/${name_file}.js`,
                generateSourceMaps: true
            };

            rjs.optimize(config, (file_2) => {

                return cb(null, file_2)
            });

        }));
});

gulp.task("one_file_compiled", () => {

    return gulp.src([pathFiles.copyPathToJS + "/**/*.js"])
        .pipe(insert.transform(function (contents, file) {
            let last_path = file.history.reverse()[0];
            let name_file = path.basename(last_path, path.extname(last_path)).replace(".min", "");
            let initiaDefault = `\n require(["${name_file}"]);`;
            return contents + initiaDefault;
        }))
        .pipe(uglify())
        .pipe(gulp.dest(pathFiles.copyPathToJS));

});

/* Less Compile Taks */
gulp.task('clean_css', function () {
    del([pathFiles.copyPathToCSS + "/**/*.css"]);
    return del(pathFiles.filesCSS);
});

gulp.task("copy_files_css", () => {
    return gulp.src(pathFiles.filesCSS)
        .pipe(gulp.dest(pathFiles.copyPathToCSS));
});

gulp.task('less', () => {
    return gulp.src(pathFiles.filesForLess, { base: "./" })
        .pipe(less({ plugins: [autoprefix] }))
        .pipe(uglifycss())
        .pipe(rename(function (path) {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".css"
            };
        }))
        .pipe(gulp.dest("."))
});


gulp.task('default', gulp.series("clean_js", "transpilar", "copy_files_js", "optimizer_js", "one_file_compiled", "clean_css", "less", "copy_files_css"));

gulp.task('clean_all', gulp.series("clean_js", "clean_css"));
