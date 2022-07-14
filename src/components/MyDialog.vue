<template>
  <div>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input> </el-form-item
        ><el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyDialog",
  props: ["form", "formLabelWidth", "dialogFormVisible"],
  methods: {
    cancelFn() {
      this.$emit("my_cancel")
    },
    confirmFn() {
      this.$emit("confirmFn_my") //confirmFn_my 事件名 click mousedown
    },
  },
}
</script>

<style lang="scss" scoped></style>
