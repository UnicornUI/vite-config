import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  plugins: [vue()],
  envPrefix: "ENV_",
  css: {
    // 对 css 模块化的默认配置的覆盖
    modules: {
      // 默认就是 camelCaseOnly
      localsConvention: "camelCaseOnly",
    },
    // 对于 css 预处理器的设置，请参考 https://vitejs.dev/css/
    // less, sass
    preprocessorOptions: {
      // 基于 key + config 这种形式的设置
      // 整个配置对象最终都会作为 less 编译的执行参数(全局参数）
      less: {
        // 数学运算是否总是有效，默认情况下只会解析那种括号包裹的运算
        math: "always",
        // 定义一些全局变量，通常在程序文件中会有一些与主题相关的变量，例如：
        // 一般的做法会在程序中定义一个全局变量的文件，然后再需要使用的地方使用
        // @import url(../xxxx/variables.less);
        // 但是频繁的引入会造成性能问题，定义再这里会在最终编译的时候再命令行加入，
        // 使得需要使用的地方都可以使用到这些变量
        globalVars: {
          mainColor: "#ff0000",
        },
        SVGComponentTransferFunctionElement,
      },
      sass: {},
    },
    // 生成编译文件与源文件的映射关系，方便调试
    // 可以在开发的时候，出现问题的时候，可以追踪到源文件的位置
    devSourcemap: true,
  },
});
