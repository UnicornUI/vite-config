// 编写一个 vite  插件
//
import fs from "fs";
import path from "path";
import { ConfigEnv, UserConfig } from "vite";

const diffDirAndFile = (dirFileArr = [], basePath="") => {
  const result = {
    dirs: [],
    files: [],
  };
  dirFileArr.forEach( name => {
    const currentFileState = fs.statSync(path.resolve(__dirname, basePath + "/" + name));
    const isDir = currentFileState.isDirectory()
    if (isDir){
      result.dirs.push(name);
    }else {
      result.files.push(name);
    }
  });
  return result;
}

const getTotalSrcDir = () => {
  // 这里文件操作都使用的是同步操作，主要是为了可读性
  // 代码理解起来比较方便
  const result = fs.readdirSync(path.resolve(__dirname, "../src"));
  const diffResult = diffDirAndFile(result, "../src");
  console.log("diffResult", diffResult);
  const resolveAliases = {};
  diffResult.dirs.forEach(dirName => {
    const key = `@${dirName}`;
    const absPath = path.resolve(__dirname, "../src" + "/" + dirName)
    resolveAliases[key] = absPath; 
  });
  return resolveAliases;
}

export default () => {

  // @type: PluginOption
  return {
     name: "Vite-alias",
    // config 的返回值会合并到最终的 UserConfig 配置中
    // 这里只需要返回你想要修改的部分，不想改的部分不用返回，会自动进行深度合并
    config(config: UserConfig, env: ConfigEnv) {
      // config 表示当前的配置对象，vite.{development|production}.config.ts
      // env 表示使用配置传入的当前构建环境 mode: string
      // command: 表示执行的指令 command: string
      // 这是在项目编译之前执行，所有在后端 node 终端执行
      // console.log("ViteAlias 组装配置", config, env);
      const resolveAliases = getTotalSrcDir();
      return {
        resolve: {
          alias: resolveAliases
        }
      };
    }
  }
} 
