
import {defineConfig} from "vite"

export default defineConfig({
  plugins: [
    {
      config (option) {
        console.log("在组装配置阶段执行")
      },
      configureServer(server) {
        console.log("运行时，服务代理阶段执行")
      },
      transformIndexHtml(html){
        console.log("代码生成之前，控制 html 页面的生成")
      },
      configResolved(options) {
        // 整个配置文件的解析流程完全完毕之后会执行
        // vite 在内部会有一个默认的配置文件
      },
      // universal hooks  => vite 和 rollup 都会关注的
      options(rullupOption) {
        console.log("rollupOptions", rullupOption);
      },
      buildStart() {
        // 服务启动时执行一次, 兼容 rollup
      }
    }
  ]

})


