const path                 = require( "path" );
const Webpack              = require( 'webpack' );
const Visualizer           = require( 'webpack-visualizer-plugin' );
const CleanWebpackPlugin   = require( 'clean-webpack-plugin' );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const DefinePlugin         = Webpack.DefinePlugin;

const NPM_RUN_BUILD  = 'build';
const NPM_RUN_DEV    = 'dev';
const NPM_RUN_SCRIPT = process.env.npm_lifecycle_event || NPM_RUN_DEV;

const IS_DEV = NPM_RUN_SCRIPT === NPM_RUN_BUILD ? false : true;

const config = {

    mode : IS_DEV ? 'development' : 'production',

    devtool : IS_DEV ? 'eval-source-map' : 'source-map',

    entry : {
        main : "./src/index.ts"
    },

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
                test   : /\.ts$/,
                loader : [
                    'babel-loader',
                    'ts-loader'
                ]
            },
            {
                test : /\.hbs/,
                use  : {
                    loader  : 'handlebars-loader',
                    options : {}
                }
            },
            {
                test : /\.(png|gif|jpg|jpeg|svg)$/,
                use  : {
                    loader  : 'url-loader',
                    options : {
                        name  : '[hash].[ext]',
                        limit : 5 * 1000 // files below 5kB will be included
                    }
                }
            },
            {
                test    : /\.scss$/,
                exclude : [],
                use     : [
                    MiniCssExtractPlugin.loader,
                    {
                        loader  : 'css-loader',
                        options : {
                            sourceMap      : true,
                            modules        : true,
                            importLoaders  : 1,
                            localIdentName : '[name]--[local]--[hash:base64:8]'
                        }
                    },
                    {
                        loader  : 'resolve-url-loader',
                        options : {
                            keepQuery : true,
                            sourceMap : true
                        }
                    },
                    {
                        loader  : 'postcss-loader',
                        options : {
                            sourceMap : true
                        }
                    },
                    {
                        loader  : 'sass-loader',
                        options : {
                            sourceMap         : true,
                            sourceMapContents : true,
                            outputStyle       : 'expanded',
                            includePaths      : []
                        }
                    }
                ]
            }
        ]
    },

    plugins : [
        new DefinePlugin( {
            __DEV__ : JSON.stringify( IS_DEV )
        } ),
        new MiniCssExtractPlugin( {
            filename      : '[name].css',
            chunkFilename : '[id].css'
        } )
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