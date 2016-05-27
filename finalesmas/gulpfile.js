'use strict';


/**
 * [require modules npm necessary]
 * @param  {[type]} 'gulp' [String]
 * @return {[type]}        [String]
 */
var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    path = require('path'),
    glob = require('glob'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    foreach = require('gulp-foreach'),
    php2html = require("gulp-php2html"),
    replace = require('gulp-replace'),
    autoprefixer = require('gulp-autoprefixer'),
    insert = require('gulp-insert'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    merge = require('utils-merge'),
    fileExists = require('file-exists'),
    deletefile = require('gulp-delete-file'),
    gulpsync = require('gulp-sync')(gulp);


/**
 * [necessary variables]
 */
var args = process.argv.slice(2);
var compress = (args.indexOf("--c") !== -1) ? true : false;
var comproject = (args.indexOf("--p") !== -1) ? true : false;
var dist = (args.indexOf("--dist") !== -1) ? true : false;
var condcss = (args.indexOf("--c") !== -1 || dist) ? 'compressed' : 'expanded';
var types = (comproject) ? 'project' : (dist) ? 'distribucion' : 'interface';
var project = (args.length === 1) ? args[0].replace('--', '') : (args.length === 2) ? args[1].replace('--', '') : (args.length === 3) ? args[2].replace('--', '') : (args.length === 4) ? args[3].replace('--', '') : '';
var interfas = (args.length === 3) ? args[1] : (args.length === 4) ? args[2] : (args.length === 5) ? args[3] : (args.length === 6) ? args[4] : '';
compress = (dist) ? true : compress;
var huella = '/*! UI-PRIME [' + Math.floor(Date.now() / 1000) + '] */';


/**
 * [swallowError Error description in the console]
 * @param  {[type]} error [Object]
 * @return {[type]}       [Object]
 */
function swallowError(error) {
    console.log("<<<<START  REPORTER>>>");
    console.log(error.toString());
    console.log("<<<<END  REPORTER>>>");
    this.emit('end');
}


/**
 * [task Compiles global css]
 * @param  {[type]} 'css_global_interface' [String]
 * @param  {[type]} function(              [Function]
 * @return {[type]}                        [Object]
 */
gulp.task('css_global_interface', function() {
    return gulp.src('interface/' + interfas + '/sass/skeleton.scss')
        .pipe(sass({
            outputStyle: condcss
        }).on('error', swallowError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(insert.prepend(huella))
        // begin: Hack compresor yui 2.4.8 adobe AEM
        .pipe(gulpif(compress, replace(' + ', ' - -')))
        .pipe(gulpif(compress, replace(' 0s', ' 00s')))
        .pipe(gulpif(compress, replace('{0%{', '{0.00%{')))
        // End: Hack compresor yui 2.4.8 adobe AEM
        .pipe(rename({
            suffix: '.' + interfas.replace("ui-", "")
        }))
        .pipe(gulpif(!dist, gulp.dest('interface/' + interfas + '/assets/css')))
        .pipe(gulpif(dist, gulp.dest('project/' + interfas + '/' + project + '/dist/assets/css')))
});


/**
 * [task Compiles the theme]
 * @param  {[type]} 'css_default_interface' [String]
 * @param  {[type]} function(               [Function]
 * @return {[type]}                         [Object]
 */
gulp.task('css_default_interface', function() {
    return gulp.src('interface/' + interfas + '/sass/theme.scss')
        .pipe(sass({
            outputStyle: condcss
        }).on('error', swallowError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulpif(compress, rename({
            suffix: '.default'
        })))
        .pipe(gulpif(!compress, rename({
            suffix: '.default'
        })))
        // begin: Hack compresor yui 2.4.8 adobe AEM
        .pipe(gulpif(compress, replace(' + ', ' - -')))
        .pipe(gulpif(compress, replace(' 0s', ' 00s')))
        .pipe(gulpif(compress, replace('{0%{', '{0.00%{')))
        // End: Hack compresor yui 2.4.8 adobe AEM
        .pipe(gulp.dest('interface/' + interfas + '/assets/css'))
});


/**
 * [task compile the theme CSS]
 * @param  {[type]} 'css_project_theme' [String]
 * @param  {[type]} function(           [Function]
 * @return {[type]}                     [Object]
 */
gulp.task('css_project_theme', function() {
    return gulp.src('project/' + interfas + '/' + project + '/sass/theme.scss')
        .pipe(sass({
            outputStyle: condcss
        }).on('error', swallowError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(insert.prepend(huella))
        .pipe(gulpif(compress, rename({
            suffix: '.' + project
        })))
        .pipe(gulpif(!compress, rename({
            suffix: '.' + project
        })))
        // begin: Hack compresor yui 2.4.8 adobe AEM
        .pipe(gulpif(compress, replace(' + ', ' - -')))
        .pipe(gulpif(compress, replace(' 0s', ' 00s')))
        .pipe(gulpif(compress, replace('{0%{', '{0.00%{')))
        // End: Hack compresor yui 2.4.8 adobe AEM
        .pipe(gulpif(!dist, gulp.dest('project/' + interfas + '/' + project + '/assets/css')))
        .pipe(gulpif(dist, gulp.dest('project/' + interfas + '/' + project + '/dist/assets/css')))
});


/**
 * [task CSS compiles the components]
 * @param  {[type]} 'css_component_interface' [String]
 * @param  {[type]} function(                 [Function]
 * @return {[type]}                           [Object]
 */
gulp.task('css_component_interface', function() {
    return gulp.src('interface/' + interfas + '/components/*/')
        .pipe(foreach(function(stream, file) {
            var name = path.basename(file.path);
            return gulp.src('interface/' + interfas + '/components/' + name + '/styles.scss')
                .pipe(sass({
                    outputStyle: condcss
                }).on('error', swallowError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions']
                }))
                .pipe(rename({
                    dirname: '',
                    prefix: name + '-'
                }))
                // begin: Hack compresor yui 2.4.8 adobe AEM
                .pipe(gulpif(compress, replace(' + ', ' - -')))
                .pipe(gulpif(compress, replace(' 0s', ' 00s')))
                .pipe(gulpif(compress, replace('{0%{', '{0.00%{')))
                // End: Hack compresor yui 2.4.8 adobe AEM
                .pipe(gulp.dest('interface/' + interfas + '/assets/css'))
                .pipe(gulpif(dist, gulp.dest('project/' + interfas + '/' + project + '/dist/assets/css')))
        }));
});


/**
 * [task JS compiles the components]
 * @param  {[type]} 'js_components_interface' [String]
 * @param  {[type]} function(                 [Function]
 * @return {[type]}                           [Object]
 */
gulp.task('js_components_interface', function() {
    return gulp.src('interface/' + interfas + '/components/*/')
        .pipe(foreach(function(stream, file) {
            var name = path.basename(file.path);
            return gulp.src('interface/' + interfas + '/components/' + name + '/functions.js')
                .pipe(jshint())
                .pipe(jshint.reporter('default'))
                .pipe(gulpif(compress, uglify()))
                .pipe(rename({
                    dirname: '',
                    prefix: name + '-',
                    sufix: '-primitive'
                }))
                .pipe(gulp.dest('interface/' + interfas + '/assets/js'))
        }));
});


/**
 * [task JSX / JS compiles the components]
 * @param  {[type]} 'js_components_interface_jsx' [String]
 * @param  {[type]} function(                     [Function]
 * @return {[type]}                               [Object]
 */
gulp.task('js_components_interface_jsx', function() {
    return gulp.src('interface/' + interfas + '/components/*/')
        .pipe(foreach(function(stream, file) {
            var name = path.basename(file.path),
                tmp = 'interface/' + interfas + '/components/' + name + '/functions.jsx',
                route = (fileExists(tmp)) ? (tmp) : false;
            var boo = (fileExists(tmp)) ? true : false;
            return browserify({
                    entries: route,
                    extensions: ['.jsx'],
                    debug: false
                })
                .transform(babelify, {
                    presets: ["es2015", 'react']
                })
                .bundle()
                .on('error', function(err) {
                    console.log(err.message);
                })
                .pipe(source(name + '-jsx.js'))
                .pipe(gulpif(boo, gulp.dest('interface/' + interfas + '/assets/js')))
        }));
});


/**
 * [task Merge two files (JS / JSX)]
 * @param  {[type]} 'js_jsx_merge' [String]
 * @param  {[type]} function(      [function]
 * @return {[type]}                [Object]
 */
gulp.task('js_jsx_merge', function() {
    return gulp.src('interface/' + interfas + '/components/*/')
        .pipe(foreach(function(stream, file) {
            var name = path.basename(file.path),
                files = ['interface/' + interfas + '/assets/js/' + name.replace(/\//g, '') + '-functions.js', 'interface/' + interfas + '/assets/js/' + name.replace(/\//g, '') + '-jsx.js'];
            return gulp.src(files)
                .pipe(concat('functions.js'))
                .pipe(gulpif(compress, uglify()))
                .pipe(rename({
                    dirname: '',
                    prefix: name + '-'
                }))
                .pipe(gulp.dest('interface/' + interfas + '/assets/js'))
                .pipe(gulpif(dist, gulp.dest('project/' + interfas + '/' + project + '/dist/assets/js/')))
        }));
});


/**
 * [task remove unnecesary files]
 * @param  {[type]} 'delete_js_jsx' [String]
 * @param  {[type]} function(       [Function]
 * @return {[type]}                 [Object]
 */
gulp.task('delete_js_jsx', function() {
    var regexp = /.+-functions-primitive.js|.+-jsx.js/g;
    gulp.src(['interface/' + interfas + '/assets/js/*.js'])
        .pipe(deletefile({
            reg: regexp,
            deleteMatch: true,
            console: false
        }));
});


/**
 * [task remove unnecesary files (JS)]
 * @param  {[type]} 'clean_js' [String]
 * @param  {[type]} function(  [Function]
 * @return {[type]}            [Object]
 */
gulp.task('clean_js', function() {
    var regexp = /.+js/g;
    gulp.src(['interface/' + interfas + '/assets/js/*.js'])
        .pipe(deletefile({
            reg: regexp,
            deleteMatch: true,
            console: false
        }));
});


/**
 * [task remove files js]
 * @param  {[type]} 'delete_js_skeleton' [String]
 * @param  {[type]} function(            [Function]
 * @return {[type]}                      [Object]
 */
gulp.task('delete_js_skeleton', function() {
    var regexp = /skeleton.+/g;
    gulp.src(['interface/' + interfas + '/assets/js/*.js'])
        .pipe(deletefile({
            reg: regexp,
            deleteMatch: true,
            console: false
        }));
});


/**
 * [task compiles the css project]
 * @param  {[type]} 'js_project_global' [String]
 * @param  {[type]} function(           [Function]
 * @return {[type]}                     [Object]
 */
gulp.task('js_project_global', function() {
    setTimeout(function() {
        return gulp.src('interface/' + interfas + '/assets/js/*.js')
            .pipe(gulpif(compress, uglify()))
            .pipe(concat('skeleton.' + interfas.replace("ui-", "") + '.js'))
            .pipe(gulpif(compress, rename({
                suffix: ''
            })))
            .pipe(insert.prepend(huella))
            .pipe(gulpif(!dist, gulp.dest('interface/' + interfas + '/assets/js')))
            .pipe(gulpif(dist, gulp.dest('project/' + interfas + '/' + project + '/dist/assets/js')))
    }, 2000)
});


/**
 * [task creates static files html files]
 * @param  {[type]} 'php_project' [String]
 * @param  {[type]} function(     [Function]
 * @return {[type]}               [Object]
 */
gulp.task('php_project', function() {
    if (project !== '') {
        return gulp.src('project/' + interfas + '/' + project)
            .pipe(foreach(function(stream, file) {
                var name = path.basename(file.path);
                return gulp.src('project/' + interfas + '/' + project + '/*.php')
                    .pipe(php2html())
                    .pipe(replace('../' + interfas + '/' + project + '/dist/', ''))
                    .pipe(replace('../../interface/' + interfas + '/dist/', ''))
                    .pipe(replace('../../project/' + interfas + '/' + project + '/dist/', ''))
                    .pipe(replace('/elements/interface/' + interfas + '/assets/css/theme.default.css', '/elements/interface/' + interfas + '/assets/css/theme.' + project + '.css'))
                    .pipe(replace('/elements/interface/' + interfas + '/', ''))
                    .pipe(replace('/elements/project/' + interfas + '/' + project + '/', ''))
                    .pipe(rename({
                        dirname: '',
                        prefix: ''
                    }))
                    .pipe(gulp.dest('project/' + interfas + '/' + project + '/dist/'));
            }));
    }
});


/**
 * [task generate CSS files]
 * @param  {[type]} 'sass_dist' [String]
 * @param  {[type]} function(   [Function]
 * @return {[type]}             [Object]
 */
gulp.task('sass_dist', function() {
    gulp.src('project/' + interfas + '/' + project + "/dist/assets/css/**/*")
        .pipe(replace('../../../ui-prime/assets/fonts/', '../../../dist/assets/fonts/'))
});


/**
 * [task copy fonts (dist)]
 * @param  {[type]} 'copyfonts_dist' [String]
 * @param  {[type]} function(        [Function]
 * @return {[type]}                  [Object]
 */
gulp.task('copyfonts_dist', function() {
    gulp.src('interface/' + interfas + '/assets/fonts/**/*')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/dist/assets/fonts'));
});


/**
 * [task copy images of the project]
 * @param  {[type]} 'copyimages_dist' [String]
 * @param  {[type]} function(         [function]
 * @return {[type]}                   [Object]
 */
gulp.task('copyimages_dist', function() {
    gulp.src('interface/' + interfas + '/assets/img/*')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/dist/assets/img'));
});


/**
 * [task copy images of the project(dist) ]
 * @param  {[type]} 'copyimages_project_dist' [String]
 * @param  {[type]} function(                 [Function]
 * @return {[type]}                           [Object]
 */
gulp.task('copyimages_project_dist', function() {
    gulp.src('project/' + interfas + '/' + project + '/assets/img/*')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/dist/assets/img'));
});
/**
 * [task copy fonts]
 * @param  {[type]} 'copyfonts' [String]
 * @param  {[type]} function(   [Function]
 * @return {[type]}             [Object]
 */
gulp.task('copyfonts', function() {
    gulp.src('interface/' + interfas + '/assets/fonts/**/*')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/assets/fonts'));
});


/**
 * [task copy images of the interfaz]
 * @param  {[type]} 'copyimages' [String]
 * @param  {[type]} function(    [Function]
 * @return {[type]}              [Object]
 */
gulp.task('copyimages', function() {
    gulp.src('interface/' + interfas + '/assets/img/*')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/assets/img'));
});


/**
 * [task copy images of the project]
 * @param  {[type]} 'copyimages_project' [String]
 * @param  {[type]} function(            [Function]
 * @return {[type]}                      [Object]
 */
gulp.task('copyimages_project', function() {
    gulp.src('project/' + interfas + '/' + project + '/assets/img/*')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/assets/img'));
});


/**
 * [task copy css skeleton]
 * @param  {[type]} 'copyskeleton_css' [String]
 * @param  {[type]} function(          [Function]
 * @return {[type]}                    [Object]
 */
gulp.task('copyskeleton_css', function() {
    gulp.src('interface/' + interfas + '/assets/css/skeleton.' + interfas.replace("ui-", "") + '.min.css')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/assets/css/'));
});


/**
 * [task copy js skeleton]
 * @param  {[type]} 'copyskeleton_js' [String]
 * @param  {[type]} function(         [function]
 * @return {[type]}                   [Object]
 */
gulp.task('copyskeleton_js', function() {
    gulp.src('interface/' + interfas + '/assets/js/skeleton.' + interfas.replace("ui-", "") + '.min.js')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/dist/assets/js/'));
});


/**
 * [task copy the theme]
 * @param  {[type]} 'copytheme' [String]
 * @param  {[type]} function(   [Function]
 * @return {[type]}             [Object]
 */
gulp.task('copytheme', function() {
    gulp.src('./project/' + interfas + '/' + project + '/assets/css/theme.' + project + '.min.css')
        .pipe(gulp.dest('./project/' + interfas + '/' + project + '/dist/assets/css/'));
});


/**
 * [task replace fonts]
 * @param  {[type]} 'lasttak' [String]
 * @param  {[type]} function( [Function]
 * @return {[type]}           [Object]
 */
gulp.task('lasttak', function() {
    gulp.src('project/' + interfas + '/' + project + "/dist/assets/css/**/*")
        .pipe(replace('../../../ui-prime/assets/fonts/', '../../../dist/assets/fonts/'))
        .pipe(replace('../../../assets/ui-prime/fonts/', '../../../dist/assets/fonts/'))
        .pipe(gulp.dest('project/' + interfas + '/' + project + '/dist/assets/css/'));
});

/**
 * [task watching files]
 * @param  {[type]} 'watch'   [String]
 * @param  {[type]} function( [Function]
 * @return {[type]}           [Object]
 */
gulp.task('watch', function() {
    gulp.watch('./interface/' + interfas + '/components/*/*.*', gulpsync.sync(['clean_js', 'js_components_interface', 'js_components_interface_jsx', 'js_jsx_merge', 'delete_js_jsx', 'delete_js_skeleton', 'js_project_global']));
    gulp.watch('./interface/' + interfas + '/sass/skeleton.scss', ['css_global_interface']);
    gulp.watch('./interface/' + interfas + '/sass/theme.scss', ['css_default_interface']);
    gulp.watch('./interface/' + interfas + '/components/*/colors.scss', ['css_default_interface']);
    gulp.watch('./interface/' + interfas + '/components/*/styles.scss', ['css_global_interface']);
});


/**
 * [task compiles the interface]
 * @param  {[type]} 'interface'                [String]
 * @param  {[type]} gulpsync.sync(['clean_js', 'css_global_interface', 'css_default_interface', 'css_component_interface', 'js_components_interface', 'js_components_interface_jsx', 'js_jsx_merge', 'delete_js_jsx', 'delete_js_skeleton', 'copyfonts', 'copyimages', 'copyimages_project', 'js_project_global', 'watch'] [Function]
 * @return {[type]}                            [Object]
 */
gulp.task('interface', gulpsync.sync(['clean_js', 'css_global_interface', 'css_default_interface', 'css_component_interface', 'js_components_interface', 'js_components_interface_jsx', 'js_jsx_merge', 'delete_js_jsx', 'delete_js_skeleton', 'copyfonts', 'copyimages', 'copyimages_project', 'js_project_global', 'watch']));

/**
 * [task CSS compiles the interface]
 * @param  {[type]} 'project'             [String]
 * @param  {[type]} ['css_project_theme'] [Function]
 * @return {[type]}                       [Object]
 */
gulp.task('project', ['css_project_theme']);


/**
 * [task compiles distribution]
 * @param  {[type]} 'distribucion'             [String]
 * @param  {[type]} gulpsync.sync(['clean_js', 'css_global_interface', 'js_components_interface', 'js_components_interface_jsx', 'js_jsx_merge', 'delete_js_jsx', 'delete_js_skeleton', 'css_project_theme', 'php_project', 'js_project_global', 'copyfonts_dist', 'copyimages_dist', 'copyimages_project_dist', 'copyskeleton_css', 'copyskeleton_js', 'copytheme', 'css_component_interface', 'lasttak'] [Function]
 * @return {[Object]}                            [description]
 */
gulp.task('distribucion', gulpsync.sync(['clean_js', 'css_global_interface', 'js_components_interface', 'js_components_interface_jsx', 'js_jsx_merge', 'delete_js_jsx', 'delete_js_skeleton', 'css_project_theme', 'php_project', 'js_project_global', 'copyfonts_dist', 'copyimages_dist', 'copyimages_project_dist', 'copyskeleton_css', 'copyskeleton_js', 'copytheme', 'css_component_interface', 'lasttak']));

/**
 * [check if there is the task]
 * @param  {[type]} project.indexOf('--' [Method]
 * @return {[type]}                      [Object]
 */
if (project.indexOf('--') == -1) {
  gulp.task('default', [types]);
} else {
  console.log("No existe el proyecto o la interfaz compilada !!!");
}
