/// <reference types="vite/client" />

// 当我们自定义的一些内容，需要进行语法提示，需要编写声明文件
// 这个声明文件的编写主要是在 `*.d.ts` 中进行.

interface ImportMetaEnv {
  // 这是我们注册到环境变量中的内容, 在这里声明他的类型
  readonly VITE_PROXY_TARGET: string;
}


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
