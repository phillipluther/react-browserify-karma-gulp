'use strict';

module.exports = function(karma) {
    karma.set({
        frameworks: [
            'jasmine',
            'browserify'
        ],

        reporters: [
            'dots'
        ],

        preprocessors: {
            './src/specs/**/*.spec.js': ['browserify']
        },

        browsers: [
            'PhantomJS'
        ],

        singleRun: true,
        autoWatch: false,

        browserify: {
            debug: true,
            transform: [
                'reactify'
            ]
        }
    });
};