const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
// 这个插件用于在运行时调试切换颜色
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const packageName = require('./package.json').name

function resolve(dir) {
  return path.join(__dirname, dir)
}

// check Git
function getGitHash() {
  try {
    return GitRevision.version()
  } catch (e) {}
  return 'unknown'
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
  ]
}

// vue.config.js
const vueConfig = {
  outputDir: 'dist/playmini/',
  publicPath: '/playmini/',
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate
      })
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {},
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap((args) => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#0057F0',
          'success-color': '#2BCF2B',
          'error-color': '#F23C3C',
          'warning-color': '#F7B500'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/api': {
        target: 'http://gateway.qa.lyplus.cn',
        // target:'http://10.101.124.25:8010',
        // target: 'http://lyplus.nat300.top/',
        // target:'http://10.99.29.141:8080',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //重写接口
        }
      }
    },
    // qiankun相关配置
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
