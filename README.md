# multi-page-demo

> vue不止可以做单页面，它还可以做多页面，如果要做多页面的话需要对他的依赖，webpack需重新配置才可以。
### 配置过程如下：

``` bash
# 1.新建了一个one.html和two.html，及其与之对应的vue文件和js文件
# 2.打开\build\webpack.base.conf.js文件，在module.exports属性中，找到entry，配置多个入口
  entry: {
    app: './src/main.js',
    admin: './src/admin.js',
    test: './src/test.js'
  }
# 3.打开\build\webpack.dev.conf.js文件，在module.exports属性中，找到plugins，添加
  new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      template: 'admin.html',
      inject: true,
      chunks: ['admin']
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: 'test.html',
      inject: true,
      chunks: ['test']
    })
# 4.打开\config\index.js文件，在build属性中添加
    index: path.resolve(__dirname, '../dist/index.html'),
    admin: path.resolve(__dirname, '../dist/admin.html'),
    test: path.resolve(__dirname, '../dist/test.html'),
# 5.打开/build/webpack.prod.conf.js文件，在plugins属性中找到HTMLWebpackPlugin，添加如下代码
     new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', 'app']
    }),
    new HtmlWebpackPlugin({
      filename: config.build.admin,
      template: 'admin.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', 'admin']
    }),
    new HtmlWebpackPlugin({
      filename: config.build.test,
      template: 'test.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      chunks: ['manifest', 'vendor', 'test']
    }),
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
