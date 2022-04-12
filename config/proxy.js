/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    // '/api/': {
    //   // 要代理的地址
    //   target: 'http://pokeapi.co',
    //   // 配置了这个可以从 http 代理到 https
    //   // 依赖 origin 的功能可能需要这个，比如 cookie
    //   changeOrigin: true,
    //   secure: false,
    // },
    '/api/': {
      // 要代理的地址
      target: 'http://127.0.0.1:5000',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      secure: false,
    },
    //图片上传接口
    '/v2': {
      target: 'https://www.mocky.io',
      changeOrigin: true,
      secure: true,
    },
    //图片分类接口
    '/rest': {
      target: 'https://aip.baidubce.com',
      changeOrigin: true,
      secure: true,
    },
    '/api/to/': {
      target: 'http://pokeapi.co',
      changeOrigin: true,
      secure: false,
    },
  },
  test: {
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
