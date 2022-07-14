let Mock = require("mockjs")

// /aa 拦截
let arr = ['Andy2', "James2", "Lucy2", "Jenny2"]
// /api/aa

/* Mock.mock("/api/aa", "get", (options) => {
    console.log(options); //{url:"/api/aa",type:"get",body:null}
    return arr;
}) */

// 正则 /api/aa
Mock.mock(/\/api\/acd/, "get", (options) => {
    console.log(options);
    return arr;
})

Mock.mock("/api/ab", "post", (options) => {
    console.log(10, options);
    return {
        status: 200,
        message: "success",
        data: arr
    }
})