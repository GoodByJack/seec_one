<template>
  <div>
    <h3>数据的增删改查</h3>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" prop="date" width="150px" align="center"> </el-table-column>
      <el-table-column label="姓名" prop="name" width="150px" align="center"> </el-table-column>
      <el-table-column prop="address" label="地址" width="400px" align="center"> </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <el-table-column label="修改" width="200px" align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <!-- 增加的弹窗 -->
    <AddDialog
      :addForm="addForm"
      :label-width="formLabelWidth"
      :incrementForm="incrementForm"
      @my_addConfirm="addConfirmFn"
      @my_addCancel="addCancelFn"
    ></AddDialog>
    <div>
      <el-button @click="addFn">增加新用户</el-button>
    </div>

    <!-- 表单 -->
    <MyDialog
      :form="form"
      :dialogFormVisible="dialogFormVisible"
      :formLabelWidth="formLabelWidth"
      @confirmFn_my="confirmFn"
      @my_cancel="cancelFn"
    ></MyDialog>
  </div>
</template>

<script>
import instance from "@/api/api"
import dayjs from "dayjs"
import MyDialog from "@/components/MyDialog"
import AddDialog from "@/components/AddDialog"
export default {
  name: "index",
  data() {
    return {
      search: "",
      tableData: [],
      dialogFormVisible: false, //表单的显示隐藏
      form: {
        index: 0,
        date: null,
        name: "",
        address: "",
      }, //表单的内容
      formLabelWidth: "120px",
      incrementForm: false, //增加表单的显示隐藏
      addForm: {
        //增加表单绑定的数据
        date: null,
        name: "",
        address: "",
      },
    }
  },
  components: {
    MyDialog,
    AddDialog,
  },
  created() {
    this.getAll()
  },
  methods: {
    addCancelFn() {
      this.incrementForm = false
    },
    addConfirmFn() {
      this.incrementFn()
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功",
            duration: 1000,
            onClose: () => {
              this.incrementForm = false
              this.getAll()
            },
          })
        })
        .catch(() => {})
    },
    addFn() {
      this.incrementForm = true
    },
    handleEdit(scope) {
      this.form = scope.row
      this.form.index = scope.$index
      this.dialogFormVisible = true
      console.log(scope)
    },
    handleDelete(scope) {
      console.log(scope)
      this.$confirm("确定删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteFn(scope.$index).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            })
          }) //异步
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          })
        })
    },

    confirmFn() {
      this.form.date = dayjs(new Date(this.form.date)).format("YYYY-MM-DD")
      this.dialogFormVisible = false
      this.updateFn()
    },

    cancelFn() {
      this.dialogFormVisible = false
    },

    // 业务函数 ----------------------------

    // 增加业务
    async incrementFn() {
      let { date, name, address } = this.addForm
      let { data } = await instance.post("/add", { date, name, address })
      console.log(data)
    },

    //修改业务
    // 要安装 npm i dayjs 插件    
    async updateFn() {
      let { date, name, address, index } = this.form

      let { data } = await instance.put("/update", { date, name, address, index })
    },

    // 删除业务
    async deleteFn(index) {
      let { data } = await instance.delete("/delete", { params: { index } })
      this.getAll()
    },

    // 请求数据的业务
    async getAll() {
      let { data } = await instance.get("/all")
      // console.log(data)
      this.tableData = data.data
    },
  },
}
</script>

<style lang="scss" scoped></style>
