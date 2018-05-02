const path               = require( "path" );
const Webpack            = require( 'webpack' );
const Visualizer         = require( 'webpack-visualizer-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const DefinePlugin       = Webpack.DefinePlugin;

const NPM_RUN_BUILD  = 'build';
const NPM_RUN_DEV    = 'dev';
const NPM_RUN_SCRIPT = process.env.npm_lifecycle_event || NPM_RUN_DEV;

const IS_DEV = NPM_RUN_SCRIPT === NPM_RUN_BUILD ? false : true;

const config = {

    mode: IS_DEV ? 'development' : 'production',

    devtool : IS_DEV ? 'eval-source-map' : 'source-map',

    entry : "./src/index.ts",

    output : {
        path          : path.join( __dirname, "dist" ),
        filename      : "[name].bundle.js",
        chunkFilename : "[name].chunk.js"
    },

    resolve : {
        extensions : [ ".js", ".ts" ]
    },

    module : {
        rules : [
            {
                test    : /\.ts$/,
                loader  : [
                    'babel-loader',
                    'ts-loader'
                ]
            }
        ]
    },

    plugins : [
        new DefinePlugin(
            {
                __DEV__ : JSON.stringify( IS_DEV )
            }
        )
    ],

    devServer : {
        contentBase : path.join( __dirname, "dist" ),
        port        : 1234
    }
};

switch( NPM_RUN_SCRIPT ) {

    case NPM_RUN_BUILD:

        config.plugins.unshift(
            new CleanWebpackPlugin( [ './dist' ], {
                exclude : [ 'index.html' ]
            } )
        );

        config.plugins.push( ... [
            new Visualizer( { filename : './bundleSizes.html' } )
        ] );

        break;

    case NPM_RUN_DEV :

        break;

    default:

        break;
}

module.exports = config;