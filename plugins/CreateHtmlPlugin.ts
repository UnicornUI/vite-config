import { IndexHtmlTransformContext,  } from "vite"

type CreateHtmlOption = {
  inject: {
    data: {
      title: string
    }
  }
}

export default (option: CreateHtmlOption) => {
  return {
    name: "create-html",
    transformIndexHtml: {
      // 将插件的执行时机强制调整到
      enforce: 'pre',
      // 这个对象的返回值就是最终的 html 
      // ctx 为当前整个请求的执行期上下文(请求的基本信息)，
      //    > url : api /index.html, /user/userlist 
      //    > type: json 
      //    > method: get/port
      //    > headers: ....
      transform: (html: string, ctx: IndexHtmlTransformContext) =>  {
        //console.log("html", html, ctx);
        return html.replace(/<%= title %>/g, option.inject.data.title);
      },
    } 
  }
}
