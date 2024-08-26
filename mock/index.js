import Mock from "mockjs";

// 传入数据模板
const userList = Mock.mock({
  "data|100": [
    {
      name: "@cname", // 表示生成不同的中文名
      ename: "@name", // 不同的英文名称
      "id|+1": 1, // 递增的数字序列
      email: "@email",
      time: "@time",
      avatar: Mock.Random.image()
    }
  ]
})

// console.log(userList)

// 借助 mockjs 创建模拟数据

export default [
  {
    method: "post",
    url: "/api/users",
    response: ({body}) => {
      // body 请求体
      // page pageSize body
      return {
        code: 200,
        msg: "success",
        data: userList
      };
    }
  },
]
