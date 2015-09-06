'use strict';

var
    // Gulp and Gulp-related
    gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    eslint      = require('gulp-eslint'),
    gif         = require('gulp-if'),
    karma       = require('gulp-karma'),
    less        = require('gulp-less'),
    livereload  = require('gulp-livereload'),
    minifyCss   = require('gulp-minify-css'),
    shell       = require('gulp-shell'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),

    // non-Gulps
    browserify  = require('browserify'),
    buffer      = require('vinyl-buffer'),
    del         = require('del'),
    source      = require('vinyl-source-stream'),

    config = {

        styles: {
            sources: [
                './src/styles/**/*.less'
            ],
            dest: './static/css/',
            output: 'styles-bundle.less'
        },
        scripts: {
            sources: [
                './src/scripts/**/*.jsx'
            ],
            dest: './static/js/',
            entry: './src/scripts/index.js',
            output: 'scripts-bundle.js',
            libs: {
                modules: [
                    'react'
                ],
                output: 'libs-bundle.js'
            }
        },
        specs: {
            sources: [
                './src/specs/**/*.spec.js'
            ],
            dependencies: [
                './node_modules/phantomjs-polyfill/bind-polyfill.js',
                './static/js/libs-bundle.js'
            ]
        }
    };


// our error handler; a standard error-object-to-text logger; expand this as
// needed with fancy logging, etc.
function handleError(err) {
    console.log('---> Error:' + err.toString());
    this.emit('end');
}


//
// ============================================================================
// LESS/CSS processing
//
function lessTask(isProduction) {
    var lessFilePath = config.styles.dest + config.styles.output;

    return gulp.src(lessFilePath)
        // if not production, create some source maps (importing from concat)
        .pipe(gif(!isProduction, 
            sourcemaps.init({
                loadMaps: true
            })
        ))
        .pipe(less()).on('error', handleError)
        // write our sourcemaps, again ... if not prod
        .pipe(gif(!isProduction,
            sourcemaps.write('./')
        ))
        // minify if prod
        .pipe(gif(isProduction,
            minifyCss()
        ))
        .pipe(gulp.dest(config.styles.dest))
        // trigger a reload in dev mode
        .pipe(gif(!isProduction,
            livereload()
        ));
}

// a task that concatenates (and maps) our LESS files; it's called as a pre-
// processing task during both our development and production gulp tasks for 
// building LESS files
gulp.task('less:concat', function() {
    return gulp.src(config.styles.sources)
        .pipe(sourcemaps.init())
            .pipe(concat(config.styles.output))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.styles.dest));
});

// simple abstracted task that calls our less compilation in DEV mode
gulp.task('styles:dev', ['less:concat'], function() {
    return lessTask();
});

// simple abstracted task that calls our less compilation in PROD mode
gulp.task('styles:prod', ['less:concat'], function() {
    return lessTask(true);
});


//
// ============================================================================
// Browserify'ication/Javascript processing
//
function browserifyTask(options) {
    var 
        setup = {},
        b;

    // if this is a libs-bundle build, setup is short and sweet
    if (options.isLibs) {
        b = browserify({
            require: options.require
        });

    } else {
        setup.entries = options.entry;
        setup.debug = options.debug;
        // all incoming tasks are Reactified, so we take the liberty ...
        setup.transform = ['reactify'];

        // start our browserification
        b = browserify(setup);
        b.external(config.scripts.libs.modules);
    }

    return b.bundle()
        .on('error', handleError)
        .pipe(source(options.output))
        .pipe(buffer())
        // create sourcemaps in dev mode, using debug as our dev hook
        .pipe(gif(options.debug, sourcemaps.init({
            loadMaps: true
        })))
        .pipe(gif(options.debug, sourcemaps.write('./')))
        .pipe(gif(options.debug !== true, uglify()))
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(gif(options.debug, livereload()));
}

gulp.task('scripts:dev', ['lint'], function() {
    return browserifyTask({
        entry: config.scripts.entry,
        output: config.scripts.output,
        debug: true
    });
});

gulp.task('scripts:prod', ['lint'], function() {
    return browserifyTask({
        entry: config.scripts.entry,
        output: config.scripts.output
    });
});

// packaging for our vendor/lib files like React; these are always minified,
// have no sourcemaps and are updated rarely. in essence, trust the library!
gulp.task('scripts:libs', [], function() {
    return browserifyTask({
        isLibs: true,
        require: config.scripts.libs.modules,
        output: config.scripts.libs.output
    });
});


//
// ============================================================================
// Testing/Sanity tasks
//
gulp.task('lint', function() {
    return gulp.src(config.scripts.sources)
        .pipe(eslint({
            plugins: ['react']
        }))
            .on('error', handleError)
        .pipe(eslint.format());
});

gulp.task('test', function() {
    var files = config.specs.dependencies.concat(config.specs.sources);

    return gulp.src(files)
        .pipe(karma({
            configFile: './karma.conf.js'
        }));
});

gulp.task('clean:styles', function() {
    var lessFiles = config.styles.dest + config.styles.output;
    return del([
        lessFiles + '*'
    ]);
});


//
// ============================================================================
// Watching/Server Tasks
//
gulp.task('watch', function() {
    gulp.watch(config.styles.sources, [
        'styles:dev'
    ]);
    gulp.watch(config.scripts.sources, [
        'scripts:dev'
    ]);
    gulp.watch(config.specs.sources, [
        'test'
    ]);

    livereload.listen();
});

gulp.task('build:dev', [
    'styles:dev',
    'scripts:dev',
    'scripts:libs'
]);

gulp.task('server', ['build:dev', 'watch'], shell.task([
    'node server.js'
]));
