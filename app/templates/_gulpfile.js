var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var extend = require('gulp-extend');
var wrap = require('gulp-wrap');
var angularTemplates = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cssBase64 = require('gulp-css-base64');
var inlineimg = require('gulp-inline-image-html');
var lib = require('bower-files')();
var fs = require('fs');
var dformat = require('dateformat');
var pinfo = require('./package.json');

/* perfomance txt files */
gulp.task('perf', function() {
    return gulp.src(['node_modules/egov-pep-frontend/framework/angular/misc/*.txt'])
    .pipe(gulp.dest("build/perf/"));
});

/* favicon */
gulp.task('favicon', function() {
    return gulp.src(['node_modules/egov-pep-frontend/favicon.ico'])
    .pipe(gulp.dest("./"));
});

/* fonts */
gulp.task('fonts', function() {
    return gulp.src(['node_modules/egov-pep-frontend/kit/_styles/fonts.css', 'node_modules/egov-pep-frontend/kit/_styles/fonts/*.woff']).pipe(gulp.dest("build/fonts"));
});

// templates cache
gulp.task('dhtml', function () {
    return gulp.src('node_modules/egov-pep-frontend/kit/directives/**/*.html')
        .pipe(inlineimg('node_modules/egov-pep-frontend/'))
        .pipe(angularTemplates({
            module: 'app',
            root: 'kit/directives',
            filename: 'dhtml.js'
        }))
        .pipe(gulp.dest('node_modules/egov-pep-frontend/build/'));
});

gulp.task('html', function () {
    return gulp.src([
            'node_modules/egov-pep-frontend/app/declarations/**/*.html',
            'app/declarations/**/*.html'
        ])
        .pipe(inlineimg('node_modules/egov-pep-frontend/'))
        .pipe(angularTemplates({
            module: 'app',
            root: 'app/declarations/',
            filename: 'html.js'
        }))
        .pipe(gulp.dest('node_modules/egov-pep-frontend/build/'));
});

// all-in apps
gulp.task('declaration', function() {
    return gulp.src([
            'node_modules/egov-pep-frontend/app/declarations/**/*.js',
            'app/declarations/**/*.js'
        ])
        .pipe(sourcemaps.init())
            .pipe(concat('declaration.js'))
            .pipe(uglify({mangle: false})) 
        .pipe(sourcemaps.write())              
        .pipe(gulp.dest('node_modules/egov-pep-frontend/build/'));
});

/* locale constants */
gulp.task('locale-en', function() {
    return gulp.src([
            'node_modules/egov-pep-frontend/kit/**/en.json',
            'node_modules/egov-pep-frontend/app/**/en.json',
            'app/**/en.json',
            'node_modules/egov-pep-frontend/i18n/**/en.json'
        ])
        .pipe(extend('i18n.en.js'))
        .pipe(wrap('app.constant(\'i18n_en\',<%= contents %>);'))
        .pipe(gulp.dest("node_modules/egov-pep-frontend/kit/vars/"));
});

gulp.task('locale-ru', function() {
    return  gulp.src([
            'node_modules/egov-pep-frontend/kit/**/ru.json',
            'node_modules/egov-pep-frontend/app/declarations/**/ru.json',
            'app/declarations/**/ru.json',
            'node_modules/egov-pep-frontend/i18n/**/ru.json'
        ])
        .pipe(extend('i18n.ru.js'))
        .pipe(wrap('app.constant(\'i18n_ru\',<%= contents %>);'))
        .pipe(gulp.dest("node_modules/egov-pep-frontend/kit/vars/"));
});

gulp.task('locale-kk', function() {
    return gulp.src([
        'node_modules/egov-pep-frontend/kit/**/kz.json',
        'node_modules/egov-pep-frontend/app/declarations/**/kz.json',
        'app/declarations/**/kz.json',
        'node_modules/egov-pep-frontend/i18n/**/kz.json'
        ])
        .pipe(extend('i18n.kz.js'))
        .pipe(wrap('app.constant(\'i18n_kz\',<%= contents %>);'))
        .pipe(gulp.dest("node_modules/egov-pep-frontend/kit/vars/"));
});

// all-in main modules
gulp.task('app', function() {
    return gulp.src('node_modules/egov-pep-frontend/framework/angular/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify({mangle: false}))    
        .pipe(gulp.dest('node_modules/egov-pep-frontend/build/'));
});

// all-in directives and services
gulp.task('components', ['locale-en', 'locale-ru', 'locale-kk'], function() {
    return gulp.src('node_modules/egov-pep-frontend/kit/**/*.js')
        .pipe(concat('components.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('node_modules/egov-pep-frontend/build/'));
});

// all-in libs
gulp.task('vendors', function(){
    var bowerfiles = lib.ext('js').files;
    var libs = [
            "node_modules/egov-pep-frontend/framework/lib/ui-date-locale/jquery.ui.datepicker-ru.js",
            "node_modules/egov-pep-frontend/framework/lib/ui-date-locale/jquery.ui.datepicker-kz.js",
            "node_modules/egov-pep-frontend/framework/lib/ui-date-locale/jquery.ui.datepicker-en.js",
            "node_modules/egov-pep-frontend/framework/lib/angular/i18n/angular-locale_en.js",
            "node_modules/egov-pep-frontend/framework/lib/angular/i18n/angular-locale_ru.js",
            "node_modules/egov-pep-frontend/framework/lib/angular/i18n/angular-locale_kk-cyrl-kz.js",
            "node_modules/egov-pep-frontend/framework/lib/angular/i18n/angular-locale_ru-kz.js",
            "node_modules/egov-pep-frontend/framework/lib/angular/i18n/angular-locale_ru-ru.js",
            "node_modules/egov-pep-frontend/framework/lib/angular/i18n/angular-locale_en.js",
            "node_modules/egov-pep-frontend/framework/lib/angular/i18n/angular-locale_en.js",
            "node_modules/egov-pep-frontend/framework/lib/angular-ui/angular-ui-ieshiv.js",
            "node_modules/egov-pep-frontend/framework/lib/angular-ui/angular-ui.js",
            "node_modules/egov-pep-frontend/framework/lib/angular-file-upload/angular-file-upload-html5-shim.js",
            "node_modules/egov-pep-frontend/framework/lib/angular-file-upload/angular-file-upload-shim.js",
            "node_modules/egov-pep-frontend/framework/lib/angular-file-upload/angular-file-upload.js",
            "node_modules/egov-pep-frontend/framework/lib/angular-file-upload/FileAPI.min.js"
        ];
    libs = bowerfiles.concat(libs);    
    return gulp.src(libs)
            .pipe(concat('vendors.js'))
            .pipe(uglify({mangle: false}))    
        .pipe(gulp.dest('node_modules/egov-pep-frontend/build/'));
});

// all-in main modules
gulp.task('build-js', [ 'vendors', 'app', 'declaration', 'components', 'html', 'dhtml' ],function() {
    return gulp.src([
            'node_modules/egov-pep-frontend/build/vendors.js',
            'node_modules/egov-pep-frontend/build/app.js',
            'node_modules/egov-pep-frontend/build/html.js',
            'node_modules/egov-pep-frontend/build/dhtml.js',
            'node_modules/egov-pep-frontend/build/components.js',
            'node_modules/egov-pep-frontend/build/declaration.js'
        ])
        .pipe(concat('build.js'))   
        .pipe(gulp.dest('build/'));
});

// all-in css
gulp.task('build-less', function() {
    return  gulp.src([
        'node_modules/egov-pep-frontend/kit/_styles/mixins.less',
        'node_modules/egov-pep-frontend/kit/_styles/variables.less',
        'node_modules/egov-pep-frontend/kit/_styles/pod/pod_variables.less',
        'node_modules/egov-pep-frontend/kit/_styles/pep/pep_variables.less',
        'node_modules/egov-pep-frontend/kit/_styles/core.less',
        'node_modules/egov-pep-frontend/kit/_styles/controls.less',
        'node_modules/egov-pep-frontend/kit/_styles/pep/pep_controls.less',
        'node_modules/egov-pep-frontend/kit/_styles/datepicker.less',
        'node_modules/egov-pep-frontend/kit/_styles/components.less',
        'node_modules/egov-pep-frontend/kit/_styles/main.less',
        'node_modules/egov-pep-frontend/kit/_styles/_page-overrides.less',
        'node_modules/egov-pep-frontend/kit/_styles/adaptivity.less',
        'node_modules/egov-pep-frontend/kit/_styles/contrast-view.less',
        'node_modules/egov-pep-frontend/kit/_styles/pod/pod.less',
        'node_modules/egov-pep-frontend/kit/_styles/pep/pep.less',
        'node_modules/egov-pep-frontend/framework/**/*.less',
        'node_modules/egov-pep-frontend/kit/directives/**/*.less',
        'node_modules/egov-pep-frontend/app/**/*.less',
        'app/**/*.less'
    ])
    .pipe(concat('build.less'))
    .pipe(less())
    .pipe(gulp.dest('node_modules/egov-pep-frontend/kit/_styles/'));
});

gulp.task('build-css', ['build-less'], function(){
    return gulp.src([
        "node_modules/egov-pep-frontend/kit/_styles/build.css",
        "node_modules/egov-pep-frontend/framework/lib/angular-ui/angular-ui.css",
        "node_modules/egov-pep-frontend/framework/lib/angular/angular-csp.css"
    ])
    .pipe(cssBase64())
    .pipe(concat('build.css'))
    .pipe(autoprefixer('last 10 versions', 'ie 9'))
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['build-js', 'build-css', 'fonts', 'favicon', 'perf'], function(){
    var d = new Date();
    var builat = dformat(d, "dd.mm HH:MM");
    var prefix = "?v=" + d.getTime();
    var css = [ "build" ];
    var js = [ "build" ];

    return fs.readFile('./node_modules/egov-pep-frontend/kit/index.tpl', 'utf8', function (err,data) {
        if (err) return console.log(err); var cssTpl = '', jsTpl = '';
        for(var file in css) cssTpl += '<link rel="stylesheet" type="text/css" href="build/'+ css[file] +'.css' + prefix + '">';
        for(var file in js) jsTpl += '<script src="build/'+ js[file] +'.js' + prefix + '"></script>';

        var result = data.replace("<build info/>",  pinfo.name + ' v' + pinfo.version + ' @ '+ builat)
            .replace("<css assets/>", cssTpl)
            .replace("<js assets/>", jsTpl);

        fs.writeFile('./index.html', result, 'utf8', function (err) {
            if (err) return console.log(err)
            else console.log("build success " + builat);    
        });
    });
});