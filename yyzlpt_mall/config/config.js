// https://umijs.org/config/
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import path from 'path';
import pageRoutes from './router.config';
import theme from '../src/theme';
import { env } from './env';

function resolve(p) {
  return path.resolve(__dirname, '../', p);
}
export default {
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
          webpackChunkName: true,
        },
        title: {
          defaultTitle: '商城',
        },
        dll: false,
        pwa: {
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        },
        hd: true,
        routes: {
          exclude: [],
        },
        hardSource: false,
      },
    ],
  ],
  chainWebpack(config) {
    // 设置 alias
    // if (process.env.API_ENV === 'test') {
    //   config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
    // }
  },
  proxy: {
    '/api': {
      // target: 'http://www.zhejiangjiankang.com:9901/mall-api/',
      target: 'http://36.155.127.23:46103/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  //   exportStatic: {},
  // 路由配置
  routes: pageRoutes,
  // Theme for antd-mobile
  // https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less
  theme: {
    'brand-primary': theme.primaryColor,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
    'process.env': {},
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.API_ENV': process.env.API_ENV,
  },
  //   ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  cssnano: {
    mergeRules: false,
  },
  targets: {
    android: 5,
    ios: 7,
    chrome: 58,
    ie: 9,
  },
  outputPath: './dist',
  hash: true,
  alias: {
    '@': resolve('src'),
    components: resolve('src/components'),
    utils: resolve('src/utils'),
    assets:resolve('src/assets')
  },
  base: '/mall/',
  publicPath: env.PUBLIC_PATH,
};
