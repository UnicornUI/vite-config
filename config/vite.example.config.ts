import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import postcssPresetEnv from "postcss-preset-env";

export default defineConfig ({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/assets": path.resolve(__dirname, "./src/assets/")
    }
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    rollupOptions: {  // 配置 rollup 的一些构策略
      input: {
        // 配置多个入口
        main: path.resolve(__dirname, "./index.html"),
        product: path.resolve(__dirname, "./product.html"),
      },
      output: { // 控制输出
        // 配置打包资源文件的名称规则
        // rollup 中的 hash 表示文件内容和文件名称组合计算得到的结果
        assetFileNames: "[hash].[name].[ext]",
        manualChunks: (id: string) => {
          console.log("id", id);
          if (id.includes("node_modules")){
            return "verdor"
          }
        }
      }
    },
    // 资源文件大小控制，在限定的范围内直接使用 base64 进行编码放在js文件中
    // 超过限定值的资源，会以独立的图片资源文件存在
    assetsInlineLimit: 4094, // 4kb
    // 最终整个打包内容以什么文件夹名称包裹
    // 默认是 `dist`
    outDir: "dist",
    // 最终输出的静态资源文件以什么文件夹名称包裹，
    // 默认是 assets
    assetsDir: "static",
  },
  // 挂载的插件
  plugins: [vue()],
  envPrefix: "ENV_",
  css: {
    // 对 css 模块化的默认配置的覆盖
    modules: {
      // 默认就是 camelCaseOnly
      localsConvention: "camelCaseOnly",
      // global(关闭模块化，不进行类名映射变更) | local (开启模块化)
      scopeBehaviour: "local",
      // 可以定义成一个函数(使用返回值), 或者直接返回字符串, 
      // generalScopeName: `[name]_[local]_[hash:5]`
      generateScopedName: (name, filename, css) => {
        // name 代表此刻 css 中的类名
        // filename 当前 css 文件的绝对路径
        // css 当前类中的样式
        //
        // 返回类名生成的规则
        // 这个拼接名称的规则可以参考 
        // https://github.com/webpack/loader-utils?tab=readme-ov-file#interpolatename
        return `$(name)_$(Math.random().toString(36).substring(3,8))}`
      },
      // hash 算法会根据 类名，文件名和内部的一些随机字符串一起生成
      // 配置的 hash 前缀作为种子，参与 hash 算法, 减少 hash 冲突
      hashPrefix: "hello",
      // 不参与 css 模块化的全局路径列表
      globalModulePaths: [],
    },
    // 对于 css 预处理器的设置，请参考 https://vitejs.dev/css/
    // less, sass
    preprocessorOptions: {
      // 基于 key + config 这种形式的设置
      // 整个配置对象最终都会作为 less 编译的执行参数(全局参数）
      less: {
        // 
        // 数学运算是否总是有效，默认情况下只会解析那种括号包裹的运算
        // .footer {
        //    margin: (100 / 2)px;
        //    padding: 100 / 2px;
        // }
        // lessc --math=always 
        math: "always",
        // 定义一些全局变量，通常在程序文件中会有一些与主题相关的变量，例如：
        // 一般的做法会在程序中定义一个全局变量的文件，然后再需要使用的地方使用
        // @import url(../xxxx/variables.less);
        // 但是频繁的引入会造成性能问题，定义再这里会在最终编译的时候再命令行加入，
        // 使得需要使用的地方都可以使用到这些变量
        globalVars: {
          // 相当于定义了一个全局文件，里面写了
          // @mainColor: #ff0000;
          //
          mainColor: "#ff0000",
        },
      },
      sass: {},
    },
    // 生成编译文件与源文件的映射关系，方便调试
    // 可以在开发的时候，出现问题的时候，可以追踪到源文件的位置
    devSourcemap: true,
    postcss: {
      plugins: [postcssPresetEnv()]
    }
  }
});

