module.exports = {
    entry: {
        index: './demo/index.coffee'
    }
,   output: {
        filename: '[name].js'
    ,   path: './demo'
    }
,   module: {
        loaders: [
            { test: /\.coffee$/, loader: "coffee-loader" }
        ,   { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" }
        ]
    }
};

