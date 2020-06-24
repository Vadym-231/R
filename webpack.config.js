const path = require('path')
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        filename: "bundle.js"
    },    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel-loader'],

            },  {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options:
                            {
                            plugins: () => [require('autoprefixer')]
                            }
                    }]
            }
        ]
    }
}
