const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry : './src/index.js',
    output: {
        clean: true,
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target : ['web', 'es5'], // IE에서 사용하기 위함
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                // exclude: /node_modules/,
                // use: {
                //   loader: 'babel-loader',
                //   options: {
                //     presets: ['@babel/preset-env']
                //   }
                // },
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[name][ext]?[hash]',
                },
            },
            {
                test: /\.jpe?g$/,
                type: 'asset/inline',
            },
            {
                test: /\.gif$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024, // 4kb
                    },
                },
            },
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false, /* 실행 시 분석창을 열지 않음 */
            generateStatsFile: true,
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'common.css',
        }),
    ],
    devServer: {
        hot: true,
        // client: {
        //     progress: true,
        // },
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 8989,
    }
}