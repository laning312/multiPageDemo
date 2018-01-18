# multi-page-demo

> vue不止可以做单页面，它还可以做多页面，如果要做多页面的话需要对他的依赖，webpack需重新配置才可以。这是一个已经配置多页面的示例。
### 项目准备
``` bash
# 使用vue-cli创建项目
  vue init webpack multiPageDemo
# 安装项目依赖包
  cnpm install
# 运行测试
  npm run dev
```
### 具体配置过程如下：

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
 # 6. admin.js的内容如下
    import Vue from 'vue'
    import Admin from './Admin.vue'

    Vue.config.productionTip = false

    /* eslint-disable no-new */
    new Vue({
      el: '#admin',
      components: { Admin },
      template: '<Admin/>'
    })
 # 7. test.js的内容如下
    import Vue from 'vue'
    import Test from './Test.vue'

    Vue.config.productionTip = false

    /* eslint-disable no-new */
    new Vue({
      el: '#test',
      components: { Test },
      template: '<Test/>'
    })
 # 8. Test.vue的内容如下
        <template>
          <div id="test">
            <h3>{{msg}}</h3>
            <a href="index.html">回到index</a>
          </div>
        </template>

        <script>
          export default {
            name: 'test',
            data() {
              return {
                msg: 'test page'
              }
            }
          }
        </script>

        <style>
        </style>
 # 9. Admin.vue的内容如下
      <template>
        <div id="admin">
          <h3>{{msg}}</h3>
          <a href="index.html">回到index</a>
        </div>
      </template>

      <script>
        export default {
          name: 'admin',
          data() {
            return {
              msg: 'admin page'
            }
          }
        }
      </script>

      <style>
      </style>
 # 10. admin.html的内容如下
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Title</title>
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
      </head>
      <body>
      <div id="admin"></div>
      </body>
      </html>
 # 11. test.html的内容如下
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Title</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
      </head>
      <body>
        <div id="test"></div>
      </body>
      </html>
 # 12. App.vue中添加
      <a href="admin.html">admin</a>  |
      <a href="test.html">test</a> <br>
      <h3>app page</h3>
 # 13. npm run dev运行

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
