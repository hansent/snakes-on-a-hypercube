var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');


var file_path = _.partial(path.resolve, __dirname);


module.exports = {

    entry: [
        './src/main.js'
    ],

    output: {
        filename: 'bundle.js',
        path: file_path('public')
    },

    cache: true,

    debug: true,

    devtool: 'source-map',

    devServer: devServerConfig(),
    
    module: {
        loaders: [
            loader_js(),
            loader_json(),
            loader_glsl(),
            loader_less(),
            loader_css(),
            
        ]
    },
};

console.log( file_path('public'))


function devServerConfig(){
    return {
        "host": "0.0.0.0", // host / IP adddress o serve on
        "port": 3000,
        "contentBase": file_path('public'), // the directory to serve index.html from
        "quiet": false,  // dont print anything
        "noInfo": true, // hide boring information
        "colors": true, // colors on console output
        "inline": true, // automatically inline the dev server script to reload
        "hot": false,   // hot module loading
        "lazy": false,   // no watching, compiles on request (cannot be combined with hot=true)
        "open": true    // opens url in browser when started
    }
}


function loader_js(){
    return {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: [
                'es2016'
            ],
            plugins: [
                'transform-function-bind',
                'transform-inline-environment-variables',
                ['transform-async-to-module-method',{
                    "module": "bluebird",
                    "method": "coroutine"
                }]
            ]
        }
    }
}


function loader_json(){
    return { 
        test: /\.json$/,
        loader: 'json-loader',
    }
}


function loader_glsl(){
    return {
        test: /\.glsl$/,
        loader: 'webpack-glsl',
        exclude: /node_modules/,
    }
}


function loader_less(){
    return {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
    }
}


function loader_css(){
    return {
        test: /\.css$/,
        loaders: ['style', 'css']
    }
}
