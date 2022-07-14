let Mock = require("mockjs")
let dayjs = require("dayjs")

// /aa 拦截
let arr = [
  {
    date: "2016-05-02",
    name: "James",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "Andy",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "Jack",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "Angela",
    address: "上海市普陀区金沙江路 1516 弄",
  },
]

// 请求
Mock.mock("/api/all", "get", (options) => {
  console.log(options)
  return {
    status: 200,
    message: "success",
    data: arr,
  }
})

// 增加数据
Mock.mock("/api/add", "post", (options) => {
  console.log(10, options.body)
  let body = JSON.parse(options.body)
  body.date = dayjs(new Date(body.date)).format("YYYY-MM-DD")
  arr.push(body)
  // let { date, name, address } = body
  return {
    status: 200,
    message: "success",
    data: arr,
  }
})

//删除数据
// "/api/delete?"
Mock.mock(/\/api\/delete\?index=\d/, "delete", (options) => {
  console.log(10, options)
  let url = options.url
  let index = url.split("=")[1]
  console.log(index)
  let newArr = arr.splice(index, 1)
  console.log(newArr) //删除后的数组

  return {
    status: 200,
    message: "删除成功",
    data: arr,
  }
})

// 修改
Mock.mock("/api/update", "put", (options) => {
  console.log(10, options)
  let body = JSON.parse(options.body)
  let { date, name, address, index } = body
  arr[index].date = date
  arr[index].name = name
  arr[index].address = address
  return {
    status: 200,
    message: "success",
    data: arr,
  }
})
