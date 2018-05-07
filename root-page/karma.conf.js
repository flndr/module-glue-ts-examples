var webpackConfig = require( "./webpack.config.js" );
delete webpackConfig.entry;

module.exports = function( config ) {

    const karmaConfig = {

        frameworks : [ 'jasmine' ],

        files : [
            'test/helpers/*.helper.ts',
            '**/*.spec.ts'
        ],

        preprocessors : {
            '**/*.helper.ts' : [ 'webpack' ],
            '**/*.spec.ts'   : [ 'webpack', 'sourcemap' ],
            '**/(!.spec).ts' : [ 'coverage' ]
        },

        exclude : [
            'coverage',
            'node_modules',
            'dist'
        ],

        // add both "karma-coverage" and "karma-remap-coverage" reporters
        reporters : [ 'progress', 'coverage', 'remap-coverage' ],

        // save interim raw coverage report in memory
        coverageReporter : { type : 'in-memory' },

        remapOptions: { exclude: /.spec\.(js|ts)$/ },

        // define where to save final remaped coverage reports
        remapCoverageReporter : {
            'text-summary' : null,
            html           : './coverage/html',
            cobertura      : './coverage/cobertura.xml'
        },

        webpack : webpackConfig,

        // make sure both reporter plugins are loaded
        plugins : [
            'karma-coverage',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-remap-coverage',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-chrome-launcher'
        ],

        mime : {
            'text/x-typescript' : [ 'ts', 'tsx' ]
            // wtf, karma? see https://github.com/webpack-contrib/karma-webpack/issues/188
        }

    };

    config.set( karmaConfig );
};