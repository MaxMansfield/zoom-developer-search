let pkg = require("./package.json");

process.env.VUE_APP_NAME = pkg.name;
process.env.VUE_APP_VERSION = pkg.version;
process.env.VUE_APP_STORE = `com.${pkg.name}-${pkg.version}`;
process.env.VUE_APP_BUILD_TIME = new Date().toString();

process.env.VUE_APP_API_KEY = process.env.ZDS_API_KEY;
process.env.VUE_APP_CX = process.env.ZDS_CX_TOKEN;

module.exports = {
  productionSourceMap: false,
  pluginOptions: {
    compression: {
      brotli: {
        filename: "[path].br[query]",
        algorithm: "brotliCompress",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          level: 11
        },
        minRatio: 0.8
      },
      gzip: {
        filename: "[path].gz[query]",
        algorithm: "gzip",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8
      }
    }
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js"
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
