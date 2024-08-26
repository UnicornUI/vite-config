import { createApp } from "vue";
import App from "./App.vue";
import "./cssComponents/componentA.css";
import "./cssComponents/css/css-new.css";
import { forEach } from "lodash";

// 观察者模式
// 检测页面主题颜色的变化
const themechange = (callback: (isDark: boolean) => void) => { 
const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains("datk")
    callback(isDark);
  });
  observer.observe(document.documentElement, {attributes: true});
}

// 测试分包
let a = [];
forEach(a, (ele) => {console.log(ele)});

// 当在声明文件中书写对应的内容，
// 即可进行语法提示
console.log(import.meta.env.VITE_PROXY_TARGET)

fetch("/api/users", { method: "post"})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => {
    console.log(err)
  });

createApp(App).mount("#app");

