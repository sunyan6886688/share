const configs = {
    // 本地
    local: {
        HTTP_SERVER: '/api/',
        debug:true,
     },
    // 开发
    develop: {
      // esay mock本地模拟数据
      // HTTP_SERVER: 'https://easy-mock.com/mock/5cad560353832974ac9f201f/web/web/',
      // PUBLIC_PATH: 'http://36.155.127.23:8078/web/',
      HTTP_SERVER: 'http://36.155.127.23:36103/',
      PUBLIC_PATH: 'http://36.155.127.23:8078/mall/',
      debug:true,
    },
    // 测试
    test: {
      HTTP_SERVER: 'http://36.155.127.23:46103/',
      PUBLIC_PATH: 'http://36.155.127.23:48078/mall/',
      debug:true,
    },
    // 沙箱环境
    preProd: {
      HTTP_SERVER: 'http://36.155.127.23:8080',
    },
  
    // 生产环境
    prod: {
      HTTP_SERVER: 'http://www.zhejiangjiankang.com:9901/mall-api/',
      PUBLIC_PATH: 'http://www.zhejiangjiankang.com:9901/mall/',
      debug:false,
    },
  };
  
  const API_ENV = process.env.API_ENV ? process.env.API_ENV : 'local';
  
  export const env = configs[API_ENV];
  