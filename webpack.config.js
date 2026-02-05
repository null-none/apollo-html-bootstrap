const path = require('path');
const webpack = require('webpack');
const HandlebarsPlugin = require('handlebars-webpack-plugin');
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const mergeJSON = require('handlebars-webpack-plugin/utils/mergeJSON');

const projectData = mergeJSON(path.join(__dirname, '/src/data/**/*.json'));

const paths = {
    src: {
        imgs: './src/assets/images',
        scss: './src/assets/scss',
        fonts: './src/assets/fonts',
        js: './src/assets/js',
        favicon: './src/assets/favicon',
    },
    dist: {
        imgs: './assets/images',
        css: './assets/css',
        fonts: './assets/fonts',
        js: './assets/js',
        favicon: './assets/favicon',
        flags: './assets/flags'
    }
}

const wPackConfig = {
    // В Webpack 5 для JS точек входа указываем только JS файлы. 
    // Стили импортируем ВНУТРИ JS (см. Шаг 2 ниже)
    entry: {
        'libs':   paths.src.scss + '/libs.scss',
        'theme':  paths.src.js + '/theme.js' 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: paths.dist.js + '/[name].bundle.js',
        clean: false // del-cli это делает за нас
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.(sass|scss|css)$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                { 
                    loader: 'css-loader', 
                    options: { url: false } 
                },
                { loader: 'postcss-loader' },
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            quietDeps: true, // Скрывает предупреждения из node_modules
                        },
                    },
                },
            ],
        }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/].+\.js$/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new CssMinimizerPlugin(), // Замена OptimizeCssAssetsPlugin
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: { comments: false }
                },
            }),
        ],
    },
    plugins: [
    new webpack.ProgressPlugin(),
    new RemoveEmptyScriptsPlugin(), // Вместо FixStyleOnlyEntriesPlugin()
    new MiniCssExtractPlugin({
        filename: paths.dist.css + '/[name].bundle.css',
    }),
        new CopyPlugin({
            patterns: [
                { from: paths.src.fonts, to: paths.dist.fonts, noErrorOnMissing: true },
                { from: paths.src.imgs, to: paths.dist.imgs, noErrorOnMissing: true },
                { from: paths.src.favicon, to: paths.dist.favicon, noErrorOnMissing: true },
                { 
                    from: path.resolve(__dirname, 'node_modules/flag-icon-css/flags'), 
                    to: paths.dist.flags, 
                    noErrorOnMissing: true 
                }
            ],
        }),
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), 'src', 'html', '**', '*.html'),
            output: path.join(process.cwd(), 'dist', '[path]', '[name].html'),
            partials: [path.join(process.cwd(), 'src', 'partials', '**', '*.{html,svg}')],
            data: projectData,
            helpers: {
                webRoot: () => '{{webRoot}}',
                config: (data) => data,
                ifEquals: function(arg1, arg2, options) {
                    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
                },
                log: (data) => console.log(data),
                limit: (arr, limit) => Array.isArray(arr) ? arr.slice(0, limit) : []
            },
            onBeforeSave: function(Handlebars, res, file) {
                const elem = file.split('//').pop().split('/').length;
                return res.split('{{webRoot}}').join('.'.repeat(elem));
            },
        }),
    ]
};

module.exports = wPackConfig;