import { ViteDevServer } from "vite";
import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";


type MockOption = {}

const mockState = fs.statSync("mock")
const isDir = mockState.isDirectory()
let mockResult = [];
if (isDir) {
  import(path.resolve(process.cwd() , "mock/index.js")).then(res => {
    mockResult = res.default
  });
}
export default (options?: MockOption) => {
  // 主要的实现原理就是拦截 http 请求
  // 当使用 fetch 或者 axios 去请求的时候，需要经过 vite 的本地代理服务
  // 此时插件作用
  return {
    name: "vite-mock-plugin",
    configureServer(server: ViteDevServer) {

      // 服务器的相关配置，
      //   > req: 请求对象，用户的请求，请求头，请求体, url, cookie 等
      //   > res: 响应对象，响应体，响应头等
      //   > next: 请求是否交给下一个中间件继续处理，调用next会将数据继续交给下一个中间件处理
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next?: Function) => {
        console.log("req", req.url);
        const matchItem = mockResult.find(mockDescripor => mockDescripor.url == req.url);
        // console.log("match", matchItem)
        if (matchItem) {
          console.log("拦截到目标请求", req.url)
          const  responseData = matchItem.response(req);
          // 请求终止，自动设置请求头(这是一个异步的操作)
          res.end(JSON.stringify(responseData)); 
        }else {
          next()
        }
      }) 
    }
  }
}
